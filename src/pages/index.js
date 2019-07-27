import React from 'react';
import { connect } from 'dva';
import styles from './index.css';

function IndexPage() {
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>Block Chain Deployment</h1>
      <div className={styles.welcome} />
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
