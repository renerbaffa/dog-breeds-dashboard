import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { formatBreedName } from '../../utils/breeds';

import styles from './BreedItem.css';

const BreedItem = ({
  breed,
  className,
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
    <div>{formatBreedName(breed)}</div>
  </div>
);

BreedItem.propTypes = {
  className: PropTypes.string,
  breed: PropTypes.shape({
    name: PropTypes.string,
    parentBreed: PropTypes.oneOf(undefined, PropTypes.string),
  }),
  selected: PropTypes.bool,
};

BreedItem.defaultProps = {
  className: '',
  breed: {
    name: '',
    parentBreed: undefined,
  },
  selected: false,
};

export default BreedItem;
