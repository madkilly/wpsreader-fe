import React from 'react';
import { Link } from 'dva/router';
import {
    Modal, Button, Input, Layout, Menu, Breadcrumb, Icon,
} from 'antd';
import { all } from '_redux-saga@0.16.2@redux-saga/effects';

import UploadModal from '../components/UploadModal'
import UploadDir from '../components/UploadDir'

const {
    Header, Content, Footer, Sider,
} = Layout;
const Search = Input.Search;
const SubMenu = Menu.SubMenu;



class SiderBLock extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            UploadModalVisible: false,
            UploadDirModalVisible: false
        };
    }

    /**
     * 更新弹框显示
     *
     */
    handleChangeModal = (name, value) => () => {
        this.setState({
            [name]: value
        });
    };


    showUploadModal = () => {
        this.setState({
            UploadModalVisible: true,
        });
    };

    showUploadDirModal = () => {
        this.setState({
            UploadDirModalVisible: true,
        });
    };



    handleQuery = (value) => {
        try {
            this.props.onQuery(value, 'all');
        } catch (error) {

        }

    }

    render() {
        const { query } = this.state;
        return (
            <Sider style={{
                overflow: 'auto', height: '100vh', position: 'fixed', left: 0,
            }}
            >
                <div className="logo" />
                <div>
                    <Search
                        placeholder="输入搜索内容"
                        enterButton="Query"
                        size="large"
                        onSearch={value => this.handleQuery(value)}
                    />
                </div>
                <Menu theme="dark" defaultSelectedKeys={['opt']} mode="inline">
                    <SubMenu
                        key="opt"
                        title={<span><Icon type="pie-chart" /><span>操作</span></span>}
                    >
                        <Menu.Item key="/one">
                            <Link to="/one" onClick={this.showUploadModal}>上传文件</Link>
                            <UploadModal
                                visible={this.state.UploadModalVisible}
                                close={this.handleChangeModal("UploadModalVisible", false)}
                            />
                        </Menu.Item>
                        <Menu.Item key="/batch">
                            <Link to="/batch" onClick={this.showUploadDirModal}>上传文件夹</Link>
                            <UploadDir
                                visible={this.state.UploadDirModalVisible}
                                close={this.handleChangeModal("UploadDirModalVisible", false)}
                            />
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
        );
    }
}

export default SiderBLock;
