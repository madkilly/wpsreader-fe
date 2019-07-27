import { connect } from 'dva';
import { Table,Input,Pagination, Popconfirm, Button } from 'antd';
import styles from './service.css';
import React from 'react';

const Search = Input.Search;


class service extends React.Component {
  columns = [
    {
      title: 'service',
      dataIndex: 'service',
      key: 'service',
      render: text => <a href="">{text}</a>,
    },
    {
      title: 'port',
      dataIndex: 'port',
      key: 'port',
    },
  ];

  constructor(props) {
    super(props)
  }


  queryidHandler(chainid) {
    this.props.dispatch({
      type: 'service/querybyid',
      payload: {chainid},
    });
  }

  render() {
    return (
      <div className={styles.normal}>
        <div>
          <Search
            placeholder="input chain uuid"
            enterButton="Query"
            size="large"
            onSearch={value => this.queryidHandler(value)}
          />
          </div>
        <div>
          <Table
            columns={this.columns}
            dataSource={this.props.list}
            loading={this.props.loading}
            rowKey={record => record.service}
            pagination={false}
          />
        </div>
      </div>
    );
  }
}



function mapStateToProps(state) {
  const { list } = state.service;
  return {
    list,
  };
}

export default connect(mapStateToProps)(service);