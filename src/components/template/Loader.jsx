import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Spinner from 'react-loader-spinner';

import styles from './Loader.css';

const MyLoader = ({ className, show, ...other }) => {
  if (!show) {
    return null;
  }

  return (
    <div className={cx(styles.container, className)}>
      <Spinner
        {...other}
        type="TailSpin"
        color="gray"
      />
    </div>
  );
};

MyLoader.propTypes = {
  className: PropTypes.string,
  show: PropTypes.bool,
};

MyLoader.defaultProps = {
  className: '',
  show: false,
};

export default MyLoader;
