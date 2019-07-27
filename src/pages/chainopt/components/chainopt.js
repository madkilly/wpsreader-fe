import { connect } from 'dva';
import { Table,Input,Pagination, Popconfirm, Button } from 'antd';
import styles from './chainopt.css';
import React from 'react';

const Search = Input.Search;


class ChainOpt extends React.Component {
  columns = [
    {
      title: 'chainID',
      dataIndex: 'chainUuid',
      key: 'chainUuid',
      render: text => <a href="">{text}</a>,
    },
    {
      title: 'chainName',
      dataIndex: 'chainName',
      key: 'chainName',
    },
    {
      title: 'channelID',
      dataIndex: 'channelID',
      key: 'channelID',
    },
    {
      title: 'Operation',
      key: 'operation',
      render :(text, record,index) =>(
          <span className={styles.operation}>
            <Button type="primary" onClick={() => this.startHandler(record.chainUuid)}>Start</Button>
            <Button type="primary" onClick={() => this.initHandler(record.chainUuid)}>Init</Button>
            <Button type="primary" onClick={() => this.stopHandler(record.chainUuid)}>Stop</Button>
            <Popconfirm title="确定删除？" onConfirm={() => this.delHandler(record.chainUuid,index)}>
              <Button type="primary">Delete</Button>
            </Popconfirm>
            {/* <a href="#" onClick={() => this.startHandler(record.chainUuid)}>Start</a>
            <a href="#" onClick={() => this.initHandler(record.chainUuid)}>Init</a>
            <a href="#" onClick={() => this.stopHandler(record.chainUuid)}>Stop</a> */}
          </span>
      )
    },
  ];

  constructor(props) {
    super(props)
  }


  queryidHandler(chainid) {
    this.props.dispatch({
      type: 'chainopt/querybyid',
      payload: {chainid},
    });
  }

  queryHandler(id, index, pagesize) {
    this.props.dispatch({
      type: 'chainopt/query',
      payload: { id, index, pagesize },
    });
  }

  stopHandler(chainid) {
    this.props.dispatch({
      type: 'chainopt/stopchain',
      payload: { chainid },
    });
  }

  delHandler(chainid,index) {
    this.props.dispatch({
      type: 'chainopt/delchain',
      payload: { chainid,index},
    });
    //this.setState(this.props);
  }

  initHandler(chainid) {
    this.props.dispatch({
      type: 'chainopt/initchain',
      payload: { chainid },
    });
  }

  startHandler(chainid) {
    this.props.dispatch({
      type: 'chainopt/startchain',
      payload: { chainid },
    });
  }

  pageChangeHandler(id, index, pagesize) {
    this.props.dispatch({
      type: 'chainopt/query',
      payload: { id, index, pagesize },
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
            rowKey={record => record.chainUuid}
            pagination={false}
          />
          <Pagination
            className="ant-table-pagination"
            total={this.props.total}
            current={this.props.index+1}
            pageSize={10}
            onChange={(page, pageSize) => this.pageChangeHandler("",page-1,pageSize)}
          />
        </div>
      </div>
    );
  }
}



function mapStateToProps(state) {
  const { list, total, index } = state.chainopt;
  return {
    list,
    total,
    index,
  };
}

export default connect(mapStateToProps)(ChainOpt);