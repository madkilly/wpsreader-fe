import React from 'react';
import { Form } from 'antd';
import {message, Modal, Input, Spin} from 'antd';
import {
  createDir,
} from '../services/docapi';

const UploadDirForm = Form.create({ name: 'UploadDirForm' })(
  class extends React.Component {
    render() {
      const { visible, onOk, onCancel, uploading } = this.props;
      const { getFieldDecorator } = this.props.form;
      return (
        <div>
          <Modal
            title="上传文件夹"
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
        </div>
      );
    }
  }
)


class UploadDir extends React.Component {

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
        const result = await createDir(param);
        if (result.data.success === "true") {
          this.props.close();
          message.success(result.data.message);
        } else {
          message.error("上传失败。" + result.data.message);
        }
      } catch (error) {
        message.error("上传失败。" + error);
      } finally {
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
      <UploadDirForm
        wrappedComponentRef={this.saveFormRef}
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        uploading={uploading}
      />
    )

  }
}

export default UploadDir;