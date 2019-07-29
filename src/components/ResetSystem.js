import React from 'react';
import { List, Avatar } from 'antd';
import {
  Upload, message,Modal, Input, Button, Layout, Menu, Breadcrumb, Icon,
} from 'antd';
import {
  reset,
} from '../services/docapi';

class ResetSystem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      uploading: false,
    };
  }

  handleOk = async e => {

    this.setState({
      uploading: true,
    });

    try {
      const result = await reset();
      if (result.data.success == "true") {
        this.props.close();
        message.success(result.data.message);
      } else {
        message.error("系统复位失败。" + result.data.message);
      }
    } catch (error) {
      message.error("系统复位失败。" + error);
    }
    this.props.close();
  };

  handleCancel = e => {
    this.props.close();
  };

  render() {
    const { visible } = this.props;
    return (
      <div>
        <Modal
          title="复位系统"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
        确认复位系统，终止所有监视及上传任务吗？
        </Modal>
      </div>
    );
  }
}

export default ResetSystem;