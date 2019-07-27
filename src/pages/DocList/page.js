import DocList from './components/DocList';
import React from 'react';


class DocListPage extends React.Component {

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

render(){
  return (
       <DocList 
       str={this.props.str}
       />
  )
}
}
export default DocListPage;
