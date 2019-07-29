import React from 'react';
import styles from './index.css';
import MainPage from './MainPage';
import withRouter from 'umi/withRouter';
import {
  Layout
} from 'antd';

const {
  Content
} = Layout;

class totalLayout extends React.Component{
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className={styles.normal}>
      <MainPage/>
      </div>
    );

  }
}

export default withRouter(totalLayout);
