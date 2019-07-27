import React from 'react';
import styles from './index.css';
import { List, Avatar } from 'antd';
import {
  Input,Button, Layout, Menu, Breadcrumb, Icon,
} from 'antd';
import {
  qureyDoc,
  createDoc,
} from '../services/docapi';

const {
  Header, Content, Footer, Sider,
} = Layout;
const Search = Input.Search;
const SubMenu = Menu.SubMenu;

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

class Doc extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      doclist: this.props.doclist, //页面数据
      query: '', //查询字符串
      field: '', // 查询类别
      activePage: 1,
      pages: 1,
      showLoading: true
    }
  }


  // 更新组件状态
  componentWillReceiveProps(nextProps) {

    let { query, field } = this.context;
    console.log(query);
    if (query && field) {
      this.getList(query, field);
      this.setState({
        query,
        field
      })

    }
  }


  onPageChange=(page) => {
    const doclist=[];
    this.setState(
      doclist
    )
    console.log(page);
  }

  render() {
    const {
      doclist,
      index,
      pageSize,
      total,
      onPageChange
    } = this.props;
    return (
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: onPageChange,
          defaultCurrent:1,
          total:total, 
          pageSize: pageSize,
        }}
        dataSource={doclist}
        footer={
          <div>
            <b>zhukai design</b> footer part
                </div>
        }
        renderItem={item => (
          <List.Item
            key={item.title}
            actions={[
              <IconText type="star-o" text="156" />,
              <IconText type="like-o" text="156" />,
              <IconText type="message" text="2" />,
              <Button type="primary">打开</Button>,
              <Button type="danger">删除</Button>
            ]}
            extra={
              <img
                width={272}
                alt="logo"
                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
              />
            }
          >
            <List.Item.Meta
              avatar={<Avatar src={'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'} />}
              title={item.name}
              description={item.ts}
            />
            {item.content}
          </List.Item>
        )}
      />);
  }
}

export default Doc;
