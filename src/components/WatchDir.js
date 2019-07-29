import React from 'react';
import { List, Form, Avatar } from 'antd';
import {
  Upload, message, Modal, Input, Button, Layout, Menu, Breadcrumb, Icon,
} from 'antd';
import {
  watchDir,
} from '../services/docapi';

const WatchDirForm = Form.create({ name: 'WatchDirForm' })(
  class extends React.Component {
    render() {
      const { visible, onOk, onCancel } = this.props;
      const { getFieldDecorator } = this.props.form;
      return (
        <div>
          <Modal
            title="监视文件夹"
            visible={visible}
            onOk={onOk}
            onCancel={onCancel}
          >
            <Form layout="vertical">
              <Form.Item label="输入文件夹路径">
                {getFieldDecorator('path', {
                  rules: [{ required: true, message: '请输入文件夹路径' }],
                })(<Input />)}
              </Form.Item>
            </Form >
          </Modal>
        </div>
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
        const result = await watchDir(param);
        if (result.data.success == "true") {
          this.props.close();
          message.success(result.data.message);
        } else {
          message.error("监视失败。" + result.data.message);
        }
      } catch (error) {
        message.error("监视失败。" + error);
      }
      console.log('Received values of form: ', values);
      form.resetFields();
      this.props.close();
    });
  };


  handleCancel = e => {
    console.log(e);
    this.props.close();
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    const { visible } = this.props;
    return (
      <WatchDirForm
        wrappedComponentRef={this.saveFormRef}
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      />
    )

  }
}

export default WatchDir;