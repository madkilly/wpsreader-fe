import React from 'react';
import { Form } from 'antd';
import {Spin, message, Modal, Input} from 'antd';
import {
  watchDir,
} from '../services/docapi';

const WatchDirForm = Form.create({ name: 'WatchDirForm' })(
  class extends React.Component {
    render() {
      const { visible, onOk, onCancel,uploading } = this.props;
      const { getFieldDecorator } = this.props.form;
      return (
        <div>
          <Modal
            title="监视文件夹"
            visible={visible}
            onOk={onOk}
            onCancel={onCancel}
          >
            <Spin spinning={uploading} delay={100}>
            <Form layout="vertical">
              <Form.Item label="输入文件夹路径">
                {getFieldDecorator('path', {
                  rules: [{ required: true, message: '请输入文件夹路径' }],
                })(<Input />)}
              </Form.Item>
            </Form >
            </Spin>
          </Modal>
        </div >
      );
    }
  }
)


class WatchDir extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      uploading: false,
    };
  };

  handleOk = async e => {
    const { form } = this.formRef.props;
    form.validateFields(async (err, values) => {
      if (err) {
        return;
      }

      let param = {
        path: values.path
      }

      try {
        this.setState({
          uploading: true,
        });
        const result = await watchDir(param);
        if (result.data.success === "true") {
          this.props.close();
          message.success(result.data.message);
        } else {
          message.error("监视失败。" + result.data.message);
        }
      } catch (error) {
        message.error("监视失败。" + error);
      }finally{
        this.setState({
          uploading: false
        });
        form.resetFields();
        this.props.close();
      }
    });
  };


  handleCancel = e => {
    //console.log(e);
    this.props.close();
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    const { uploading } = this.state;
    const { visible } = this.props;
    return (
      <WatchDirForm
        wrappedComponentRef={this.saveFormRef}
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        uploading={uploading}
      />
    )

  }
}

export default WatchDir;