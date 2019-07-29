import React from 'react';
import { List, Avatar } from 'antd';
import {
  Upload, message,Modal, Input, Button, Layout, Menu, Breadcrumb, Icon,
} from 'antd';
import {
  createDoc,
} from '../services/docapi';

class UploadModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
      uploading: false,
    };
  }

  handleOk = async e => {
    const { fileList } = this.state;
    const formData = new FormData();
    fileList.forEach(file => {
      formData.append('files', file);
    });

    this.setState({
      uploading: true,
    });

    try {
      const result = await createDoc(formData);
      if (result.data.success == "true") {
        this.props.close();
        message.success(result.data.message);
      } else {
        message.error("上传失败。" + result.data.message);
      }
    } catch (error) {
      message.error("上传失败。" + error);
    }

    this.setState({
      fileList: []
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      fileList: []
    });
    this.props.close();
  };

  render() {
    const { uploading, fileList } = this.state;
    const { visible } = this.props;
    const props = {
      multiple: true,
      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: file => {
        this.setState(state => ({
          fileList: [...state.fileList, file],
        }));
        return false;
      },
      fileList,
    };

    return (
      <div>
        <Modal
          title="上传文件"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Upload {...props}>
            <Button>
              <Icon type="upload" /> 选择文件
          </Button>
          </Upload>
        </Modal>
      </div>
    );
  }
}

export default UploadModal;