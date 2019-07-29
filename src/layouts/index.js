import React from 'react';
import styles from './index.css';
import MainPage from './MainPage';
import withRouter from 'umi/withRouter';

class totalLayout extends React.Component{
  render() {
    return (
      <div className={styles.normal}>
      <MainPage/>
      </div>
    );

  }
}

export default withRouter(totalLayout);
