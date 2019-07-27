import React from 'react';
import styles from './index.css';
import Sider from './Sider';
import Doc from './Doc';

import {
    qureyDoc,
    createDoc,
    listDbDoc
} from '../services/docapi';

import {
    Layout
} from 'antd';

class MainPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            docList: [],
            // 搜索内容
            query: '',
            field: 'all',

            //数据
            index: 0,
            pageSize: 10,
            total: 1,

            showCreatDocModal: false, // 创建文件
            showBatchUploadModal: false, // 批量上传
            showDeleteDocfirm: false // 删除提示框

        };
    }

    componentDidMount() {
        //this.handleQuery();
    }

    // query框点击
    handleQuery = (query, field) => {
        const queryInput = query;
        this.setState(
            {
                query: queryInput,
                loading: true
            },
            () => {
                console.log(query);
                this.getDocList(queryInput, 'all', 1);
                // this.getDocDbList(queryInput, field, 1);
            }
        );
    };

    // 获取文档列表
    getDocDbList = async (query, field, activePage, pageSize = 10) => {
        this.setState({
            loading: true
        });
        let param = {
            index: activePage,
            size: pageSize
        }
        const result = await listDbDoc(param);
        console.log(result);
        if (result.data.success === 'true') {
            let data = [];
            data = result.data;
            this.setState({
                docList: data.data.data,
                index: data.data.index,
                pageSize: data.data.size,
                total: data.data.total,
                query,
                field
            });
        }
    }

    // 获取文档查询列表
    getDocList = async (query, field, activePage, pageSize = 10) => {
        this.setState({
            loading: true
        });
        let param = {
            query: query,
            field: field,
            index: activePage,
            size: pageSize
        }
        const result = await qureyDoc(param);

        if (result.data.success === 'true') {
            let data = [];
            data = result.data;
            this.setState({
                docList: data.data.data,
                index: data.data.index,
                pageSize: data.data.size,
                total: data.data.total,
                query,
                field
            });
        }

    }

    //  页码变换
    onPageChange = (page) => {
        const {query} = this.state;
        this.getDocList(query, 'all', page);
    }


    render() {
        const {
            docList,
            query,
            field,
            index,
            pageSize,
            total
        } = this.state;
        return (
            <div className={styles.normal}>
                <Layout>
                    <Sider
                        onQuery={this.handleQuery}
                    />
                    <Layout>
                        <div className={styles.container}>
                            <Doc
                                doclist={docList}
                                index={index}
                                pageSize={pageSize}
                                total={total}
                                onPageChange={this.onPageChange}
                            />
                        </div>
                    </Layout>
                </Layout>
            </div>
        );
    }

}

export default MainPage;