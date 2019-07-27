import { connect } from 'dva';
import { Table,Button } from 'antd';
import styles from './msp.css';
import React from 'react';
import LeagueModal from './LeagueModal';

// const Search = Input.Search;


class Msp extends React.Component {
  columns = [
    {//联盟ID
      title: '联盟编号',
      dataIndex: 'mspID',
      key: 'mspID',
      render: text => <a href="">{text}</a>,
    },
    {//联盟名称
      title: '联盟名称',
      dataIndex: 'mspName',
      key: 'mspName',
      render: text => <a href="">{text}</a>,
    },
     {//创建人
      title: '创建人',
      dataIndex: 'createUser',
      key: '',
      render: text => <a href="">{text}</a>,
    },
     {//成员个数
      title: '成员个数',
      dataIndex: 'memberCount',
      key: '',
      render: text => <a href="">{text}</a>,
    },
     {//网络个数
      title: '网络个数',
      dataIndex: 'networkCount',
      key: '',
      render: text => <a href="">{text}</a>,
    },
    {//创建日期
      title: '创建日期',
      dataIndex: 'createDate',
      key: '',
      render: text => <a href="">{text}</a>,
    },
    {//加入日期
      title: '加入日期',
      dataIndex: 'joinDate',
      key: '',
      render: text => <a href="">{text}</a>,
    },
    {
      title: '操作',
      key: 'operation',
      render :(text, record) =>(
          <span className={styles.operation}>
            <Button type="primary" onClick={() => this.startHandler(record.chainUuid)}>创建网络</Button>
            <Button type="primary" onClick={() => this.initHandler(record.chainUuid)}>邀请成员</Button>
            {/* <a href="#" onClick={() => this.startHandler(record.chainUuid)}>Start</a>
            <a href="#" onClick={() => this.initHandler(record.chainUuid)}>Init</a>
            <a href="#" onClick={() => this.stopHandler(record.chainUuid)}>Stop</a> */}
          </span>
      )
    },
  ];

  constructor(props) {
    super(props)
    //this.state = props;
  }


  // queryidHandler(chainid) {
  //   this.props.dispatch({
  //     type: 'chainopt/querybyid',
  //     payload: {chainid},
  //   });
  // }

  // queryHandler(id, index, pagesize) {
  //   this.props.dispatch({
  //     type: 'chainopt/query',
  //     payload: { id, index, pagesize },
  //   });
  // }

  // stopHandler(chainid) {
  //   this.props.dispatch({
  //     type: 'chainopt/stopchain',
  //     payload: { chainid },
  //   });
  // }

  // initHandler(chainid) {
  //   this.props.dispatch({
  //     type: 'chainopt/initchain',
  //     payload: { chainid },
  //   });
  // }

  // startHandler(chainid) {
  //   this.props.dispatch({
  //     type: 'chainopt/startchain',
  //     payload: { chainid },
  //   });
  // }

  // pageChangeHandler(id, index, pagesize) {
  //   this.props.dispatch({
  //     type: 'chainopt/query',
  //     payload: { id, index, pagesize },
  //   });
  // }

  createLeague(values){
    this.props.dispatch({
      type: 'msp/league/create',
      payload: values,
    })
  }


  render() {
    return (
      <div className={styles.create}>
          <LeagueModal record={{}} onOK={this.props.createLeague}>
            <Button type="primary">
              新建联盟
            </Button>
          </LeagueModal>
      

        <div>
          <Table
            columns={this.columns}
            dataSource={this.props.list}
            loading={this.props.loading}
            rowKey={record => record.chainUuid}
            pagination={false}
          />

        </div>
      </div>
    );
  }
}



function mapStateToProps(state) {
  const { list, total, index } = state.msp;
  return {
    list,
    total,
    index,
  };
}

export default connect(mapStateToProps)(Msp);
// export default connect()(Msp);
