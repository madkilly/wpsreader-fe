import React from 'react';
import { List, Spin, Avatar, message, Modal } from 'antd';
import {Skeleton, Button, Icon } from 'antd';
import {
  deldoclist
} from '../services/docapi';

// const IconText = ({ type, text }) => (
//   <span>
//     <Icon type={type} style={{ marginRight: 8 }} />
//     {text}
//   </span>
// );

class Doc extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      doclist: this.props.doclist, //页面数据
      query: '', //查询字符串
      field: '', // 查询类别
      activePage: 1,
      pages: 1,
      showLoading: true,
      delLoading: false,
      delDocId: '',
      showDetail: false,
      showDelModel: false,
      detailTitle: '',
      detailContent: ''
    }
  }


  // // 更新组件状态
  // componentWillReceiveProps(nextProps) {
  //   let { query, field } = this.context;
  //   // console.log(query);
  //   if (query && field) {
  //     this.getList(query, field);
  //     this.setState({
  //       query,
  //       field,
  //     })

  //   }
  // }

  handelDelDoc = async () => {
    this.setState({
      delLoading: true
    });
    let param = {
      docList: []
    };
    param.docList = [this.state.delDocId];
    let delid = this.state.delDocId;
    try {
      const result = await deldoclist(param);
      if (result.data.success === "true") {
        console.log(this.state.doclist);
        this.props.onDelete(delid);
        message.success(result.data.message);
      } else {
        message.error("删除文件失败" + result.data.message);
      }
    } catch (error) {
      message.error("删除文件失败" + error);
    } finally {
      this.setState({
        delLoading: false,
        showDelModel: false,
        delDocId: ''
      });
    }
  }

  handelShowDelModel = (delid) => () => {
    this.setState({
      showDelModel: true,
      delDocId: delid
    });
  }

  closeshowDelHandler = () => {
    this.setState({
      showDelModel: false,
    });
  };

  render() {
    const {
      doclist,
      pageSize,
      total,
      onLoading,
      onPageChange,
      onDetailOpen
    } = this.props;

    return (
      <div>
        <Spin spinning={onLoading} delay={100}>
          <List
            itemLayout="vertical"
            // size="large"
            pagination={{
              onChange: onPageChange,
              defaultCurrent: 1,
              total: total,
              pageSize: pageSize,
            }}
            dataSource={doclist}
            footer={
              <div>
                <b>文件查询</b> 系统
                </div>
            }
            renderItem={item => (
              <List.Item
                key={item.title}
                actions={[
                  // <IconText type="star-o" text="156" />,
                  // <IconText type="like-o" text="156" />,
                  // <IconText type="message" text="2" />,
                  <Button type="primary" onClick={onDetailOpen(item)}>打开</Button>,
                  <Button type="danger" onClick={this.handelShowDelModel(item.id)}>删除</Button>
                ]}
              // extra={
              //   <img
              //     width={272}
              //     alt="logo"
              //     src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
              //   />
              // }
              >
              <Skeleton avatar title loading={false} active>
                <List.Item.Meta
                  avatar={<Avatar icon={"file"} />}
                  title={item.name}
                  description={item.ts}
                />
                <div>
                  {item.content}
                </div>
              </Skeleton>
              </List.Item>
            )}
          />
          <Modal
            visible={this.state.showDelModel}
            title={"删除文件"}
            onOk={this.handelDelDoc}
            onCancel={this.closeshowDelHandler}
          >
            <Spin spinning={this.state.delLoading} delay={100}>
              确认删除文件吗？
           </Spin>
          </Modal>
        </Spin>

      </div>
    );
  }
}

export default Doc;
