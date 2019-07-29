import React from 'react';
import { List, Avatar } from 'antd';
import {
  Upload, message, Table, Modal, Spin, Input, Button, Layout, Menu, Breadcrumb, Icon,
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
      data: []
    };
  }

  handleCancel = e => {
    this.props.close();
  };

  render() {
    const { visible, sourceData, loading } = this.props;
    return (
      <div>
        <Modal
          title="系统状态"
          visible={visible}
          onOk={this.handleCancel}
          onCancel={this.handleCancel}
        >
          <Spin spinning={loading} delay={100}>
            <Table columns={columns} dataSource={sourceData} />
          </Spin>
        </Modal>
      </div>
    );
  }
}

export default StateModal;