import React from 'react';
import { Link } from 'dva/router';
import {
    Modal,message, Button, Input, Layout, Menu, Breadcrumb, Icon,
} from 'antd';
import { all } from '_redux-saga@0.16.2@redux-saga/effects';

import UploadModal from '../components/UploadModal'
import UploadDir from '../components/UploadDir'
import WatchDir from '../components/WatchDir'
import ResetSystem from '../components/ResetSystem'
import StateModal from '../components/StateModal'


import {
    getSystemState,
    truncate,
  } from '../services/docapi';


const {
    Header, Content, Footer, Sider,
} = Layout;
const Search = Input.Search;
const SubMenu = Menu.SubMenu;



class SiderBLock extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            SystemStateData:[],
            UploadModalVisible: false,
            UploadDirModalVisible: false,
            WatchDirModalVisible:false,
            ResetSystemModalVisible:false,
            TruncateModalVisible:false,
            StateModalVisible:false
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

    showWatchDirModal = () => {
        this.setState({
            WatchDirModalVisible: true,
        });
    };

    showResetModal = () => {
        this.setState({
            ResetSystemModalVisible: true,
        });
    };

    showTruncateModal = () => {
        this.setState({
            TruncateModalVisible: true,
        });
    };

    showStateModal = async() => {
        this.handleState();
        this.setState({
            StateModalVisible: true,
        });
    };

    handleState = async () =>{
        try {
            const result = await getSystemState();
            if (result.data.success == "true") {
              this.setState({
                SystemStateData:result.data.data
              });
            } else {
                message.error("获取状态失败" + result.data.message);
            }
        } catch (error) {
            message.error("获取状态失败" + error);
        }
    }
    

    handleQuery = (value) => {
        try {
            this.props.onQuery(value, 'all');
        } catch (error) {
            message.error("查询失败" + error);
        }

    }

    handleTruncate = async () =>{
        try {
            const result = await truncate();
            if (result.data.success == "true") {
                    message.success(result.data.message);
            } else {
                message.error("清空数据失败" + result.data.message);
            }
        } catch (error) {
            message.error("清空数据失败" + error);
        }
        this.handleChangeModal("TruncateModalVisible",false)
    }

    render() {
        const {SystemStateData, query } = this.state;
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
                        <Menu.Item key="/watch">
                            <Link to="/watch" onClick={this.showWatchDirModal}>监视文件夹</Link>
                            <WatchDir
                                visible={this.state.WatchDirModalVisible}
                                close={this.handleChangeModal("WatchDirModalVisible", false)}
                            />
                        </Menu.Item>
                        <Menu.Item key="/reset">
                            <Link to="/reset" onClick={this.showResetModal}>复位系统</Link>
                            <ResetSystem
                                visible={this.state.ResetSystemModalVisible}
                                close={this.handleChangeModal("ResetSystemModalVisible", false)}
                            />
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="data"
                        title={<span><Icon type="pie-chart" /><span>数据</span></span>}
                    >
                        <Menu.Item key="/truncate">
                            <Link to="/truncate" onClick={this.showTruncateModal}>清空数据</Link>
                                <Modal
                                title="清空数据"
                                visible={this.state.TruncateModalVisible}
                                onOk={this.handleTruncate}
                                onCancel={this.handleChangeModal("TruncateModalVisible",false)}
                                >
                                确定要清空数据吗！
                                </Modal>
                        </Menu.Item>
                        <Menu.Item key="/state">
                            <Link to="/state" onClick={this.showStateModal}>系统状态</Link>
                                <StateModal
                                title="系统状态"
                                sourceData = {SystemStateData}
                                visible={this.state.StateModalVisible}
                                close={this.handleChangeModal("StateModalVisible",false)}
                                onread = {this.handleState}
                                >
                                确定要清空数据吗！
                                </StateModal>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
        );
    }
}

export default SiderBLock;
