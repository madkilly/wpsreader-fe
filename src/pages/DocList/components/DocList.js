import React from 'react';
import styles from './index.css';
import { List, Avatar } from 'antd';
import {
  Input, Layout, Menu, Breadcrumb, Icon,
} from 'antd';
import {
  qureyDoc,
  createDoc,
} from '../../../services/docapi';

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

class DocList extends React.Component {

  constructor(props) {
    super(props);
    console.log(this.props.str);
    this.state = {
      data: {}, //页面数据
      query: '', //查询字符串
      filed: '', // 查询类别
      activePage: 1,
      pages: 1,
      showLoading: true
    }
  }


  // 更新组件状态
  componentWillReceiveProps(nextProps) {

    let { query, filed } = this.context;

    if (query && filed) {
      this.getList(query, filed);
      this.setState({
        query,
        filed
      })

    }


  }

  // 获取新的查询列表
  getList = (query, filed) => {
    let param = {
      query: query,
      field: filed,
      index: 0,
      size: 10
    }
    qureyDoc(param).then((res) => {
      if (res.data.success === 'true') {
        let data = [];
        data = res.data.data;
        if (!this.context.doclist) {
          this.context.saveChange('doclist', data);
        }
        this.setState({
          data,
          query,
          filed,
        });
      }
    })
  }

  render() {
    const {
      doclist
    } = this.props;
    return (
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: page => {
            console.log(page);
          },
          defaultCurrent:1,
          total:50, 
          pageSize: 5,
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

export default DocList;
