import { connect } from 'dva';
import { Table,Input,Pagination, Popconfirm, Button } from 'antd';
import styles from './cert.css';
import React from 'react';

const Search = Input.Search;


class cert extends React.Component {
  columns = [
    {
      title: 'Service',
      dataIndex: 'Service',
      key: 'Service',
      render: text => <a href="">{text}</a>,
    },
    {
      title: 'Port',
      dataIndex: 'Port',
      key: 'Port',
    },
  ];

  constructor(props) {
    super(props)
  }


  DownloadHandler(chainid) {
    this.downloadFile(chainid)
  }

  downloadFile(chainid) {
    var form = document.createElement('form')
    var oInput = document.createElement('input');
    oInput.name="userId";
    oInput.value=chainid;
    form.setAttribute('action', '/api/cert/download')
    form.setAttribute('method', 'get')
    form.setAttribute('target', '_blank')
    form.setAttribute('style', 'display:none')
    form.appendChild(oInput)
    document.body.appendChild(form);
    form.action='/api/cert/download?userId='+{chainid};
    form.submit();
    document.body.removeChild(form)
}

  render() {
    return (
      <div className={styles.normal}>
        <div>
          <Search
            placeholder="input chain uuid"
            enterButton="DownLoad Cert"
            size="large"
            onSearch={value => this.DownloadHandler(value)}
          />
          </div>
      </div>
    );
  }
}



function mapStateToProps(state) {
  const { list } = state.cert;
  return {
    list,
  };
}

export default connect(mapStateToProps)(cert);