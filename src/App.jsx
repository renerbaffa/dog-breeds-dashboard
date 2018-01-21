import React from 'react';

import styles from './App.css';

const App = () => (
  <div className={styles.wrapper}>
    <div className={styles.app}>
      <div className={styles.container}>
        <div className={styles.leftPanel} />
        <div className={styles.rightPanel} />
      </div>
    </div>
  </div>
);

export default App;
