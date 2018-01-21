import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './BreedItem.css';

const BreedItem = ({
  className,
  name,
  selected,
  ...other
}) => (
  <div
    {...other}
    className={
      cx(
        styles.container,
        className,
        { [styles.selected]: selected },
      )
    }
  >
    <div>{name}</div>
  </div>
);

BreedItem.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  selected: PropTypes.bool,
};

BreedItem.defaultProps = {
  className: '',
  name: '',
  selected: false,
};

export default BreedItem;
