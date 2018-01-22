import React from 'react';
import { Provider } from 'react-redux';

import BreedsListContainer from './containers/BreedsListContainer';

import store from './store';

import styles from './App.css';

const App = () => (
  <Provider store={store}>
    <div className={styles.wrapper}>
      <div className={styles.app}>
        <div className={styles.container}>
          <div className={styles.leftPanel}>
            <BreedsListContainer />
          </div>
          <div className={styles.rightPanel} />
        </div>
      </div>
    </div>
  </Provider>
);

export default App;
