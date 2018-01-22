import React from 'react';

import WarningIcon from 'react-icons/lib/ti/warning';

import styles from './ImageNotFound.css';

const ImageNotFound = () => (
  <div className={styles.container}>
    <WarningIcon className={styles.icon} />
    <div className={styles.text}>Image not<br />found</div>
  </div>
);

export default ImageNotFound;
