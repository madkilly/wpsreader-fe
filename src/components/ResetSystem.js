import React from 'react';
import { Spin, message, Modal} from 'antd';
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
      this.setState({
        uploading: true,
      });
      const result = await reset();
      if (result.data.success === "true") {
        this.props.close();
        message.success(result.data.message);
      } else {
        message.error("系统复位失败。" + result.data.message);
      }
    } catch (error) {
      message.error("系统复位失败。" + error);
    } finally {
      this.setState({
        uploading: false
      });
      this.props.close();
    }
  };

  handleCancel = e => {
    this.props.close();
  };

  render() {
    const { visible } = this.props;
    const { uploading } = this.state;
    return (
      <div>
        <Modal
          title="复位系统"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Spin spinning={uploading} delay={100}>
            确认复位系统，终止所有监视及上传任务吗？
        </Spin>
        </Modal>
      </div>
    );
  }
}

export default ResetSystem;