import React from 'react';
import { List, Avatar } from 'antd';
import {
  Upload, message,Table,Modal, Input, Button, Layout, Menu, Breadcrumb, Icon,
} from 'antd';
import {
  systemstate,
} from '../services/docapi';

const columns = [
  {
    title: '工作任务',
    dataIndex: 'jobType',
    key: 'jobType',
    render: text => <a href="javascript:;">{text}</a>,
  },
  {
    title: '工作状态',
    dataIndex: 'message',
    key: 'message',
  },

];


class StateModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      uploading: false,
    };
  }

  handleCancel = e => {
    this.setState({
      fileList: []
    });
    this.props.close();
  };

  render() {
    const { uploading, fileList } = this.state;
    const { visible ,sourceData} = this.props;
    return (
      <div>
        <Modal
          title="系统状态"
          visible={visible}
          onOk={this.handleCancel}
          onCancel={this.handleCancel}
        >
        <Table columns={columns} dataSource={sourceData} />
        </Modal>
      </div>
    );
  }
}

export default StateModal;