import React from 'react';
import { Spin, message, Modal } from 'antd';
import {
  truncate,
} from '../services/docapi';

class TruncateData extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      uploading: false,
    };
  }

  handleOk = async e => {
    try {
      this.setState({
        uploading: true,
      });
      const result = await truncate();
      if (result.data.success === "true") {
        message.success(result.data.message);
      } else {
        message.error("清空数据失败!" + result.data.message);
      }
    } catch (error) {
      message.error("清空数据失败!" + error);
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
          title="清空数据"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Spin spinning={uploading} delay={100}>
            确定要清空数据吗?
          </Spin>
        </Modal>
      </div>
    );
  }
}

export default TruncateData;