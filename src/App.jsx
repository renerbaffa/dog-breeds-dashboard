import React from 'react';
import { Provider } from 'react-redux';

import store from './store';

import styles from './App.css';

const App = () => (
  <Provider store={store}>
    <div className={styles.wrapper}>
      <div className={styles.app}>
        <div className={styles.container}>
          <div className={styles.leftPanel} />
          <div className={styles.rightPanel} />
        </div>
      </div>
    </div>
  </Provider>
);

export default App;
