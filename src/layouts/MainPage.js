import React from 'react';
import styles from './index.css';
import Sider from './Sider';
import { Modal, message } from 'antd';
import Doc from './Doc';
import Highlighter from "react-highlight-words";

import {
    getDoc,
    qureyDoc,
    listDbDoc
} from '../services/docapi';

import {
    Layout
} from 'antd';

class MainPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading:false,
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
            showDeleteDocfirm: false, // 删除提示框
            showDetail: false,
            detailTitle: '',
            detailContent: ''

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
                query: queryInput
            },
            () => {
                console.log(query);
                this.getDocList(queryInput, 'all', 1);
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

        try {
            const result = await listDbDoc(param);
            if (result.data.success === "true") {
                if (result.data.data != null) {
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
                } else {
                    message.error("获取详细文件内容失败");
                }
            } else {
                message.error("获取详细文件内容失败" + result.data.message);
            }
        } catch (error) {
            message.error("获取详细文件内容失败" + error);
        }finally{
            this.endLoading();
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
        try {
            const result = await qureyDoc(param);
            if (result.data.success === "true") {
                if (result.data.data != null) {
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
                } else {
                    message.error("获取详细文件内容失败");
                }
            } else {
                message.error("获取详细文件内容失败" + result.data.message);
            }
        } catch (error) {
            message.error("获取详细文件内容失败" + error);
        }finally{
            this.endLoading();
        }
    }

    // 精确获取文档
    getDocById = async (rawid) => {
        this.setState({
            loading: true
        });
        let param = {
            id: rawid
        }
        try {
            const result = await getDoc(param);
            if (result.data.success === "true") {
                if (result.data.data != null) {
                    return result.data.data;
                } else {
                    message.error("获取详细文件内容失败");
                }
            } else {
                message.error("获取详细文件内容失败" + result.data.message);
            }
        } catch (error) {
            message.error("获取详细文件内容失败" + error);
        }finally{
            this.endLoading();
        }
    }

    //  页码变换
    onPageChange = (page) => {
        const { query } = this.state;
        this.getDocList(query, 'all', page);
    }

    /**
     * 更新弹框显示
     *
     */
    handleChangeModal = (params) => () => {
       // console.log(params)
        this.setState({
            params
        });
    };

    showDetailHandler = (params) => async () => {
        const content = await this.getDocById(params.id);
        if (content == null) {
            return;
        }
        this.setState({
            showDetail: true,
            detailTitle: content.name,
            detailContent: content.content
        });
    };

    delDocItem = (params) => async () => {
        const content = await this.getDocById(params.id);
        if (content == null) {
            return;
        }
        this.setState({
            showDetail: true,
            detailTitle: content.name,
            detailContent: content.content
        });
    };

    closeDetailHandler = () => {
        this.setState({
            showDetail: false,
        });
    };

    endLoading = () => {
        this.setState({
            loading: false,
        });
    };

    onDetailDel = (delid) => { 
        let cachelist =this.state.docList.splice(this.state.docList.findIndex(v => v.id === delid),1);    
        console.log(cachelist);
        this.setState({
            docList:this.state.docList
        });
    };

    render() {
        const {
            docList,
            index,
            pageSize,
            total,
            loading,
            showDetail
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
                                onDetailOpen={this.showDetailHandler}
                                onItemDel={this.delDocItem}
                                onLoading = {loading}
                                onDelete = {this.onDetailDel}
                            />
                            <Modal
                                visible={showDetail}
                                title={this.state.detailTitle}
                                onOk={this.closeDetailHandler}
                                onCancel={this.closeDetailHandler}
                            >
                                <Highlighter
                                    highlightClassName="highlight"
                                    searchWords={this.state.query.trim().split(/\s+/)}
                                    autoEscape={true}
                                    highlightStyle={{color: 'red'}}
                                    textToHighlight={this.state.detailContent}
                                />,
                                
                            </Modal>
                        </div>
                    </Layout>
                </Layout>
            </div>
        );
    }

}

export default MainPage;