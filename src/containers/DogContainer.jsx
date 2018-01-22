import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { connect } from 'react-redux';

import PlusButton from 'react-icons/lib/fa/plus';

import Button from '../components/shared/Button';
import Image from '../components/shared/Image';

import { formatBreedName } from '../utils/breeds';

import styles from './DogContainer.css';

export const DogContainer = ({ className, title }) => (
  <div className={cx(className, styles.container)}>
    <div className={styles.title}>{title}</div>
    <div className={styles.imageContainer}>
      <Image
        className={styles.image}
        src="https://dog.ceo/api/img/shihtzu/n02086240_8108aaaa.jpg"
      />
    </div>
    <div className={styles.buttonContainer}>
      <Button className={styles.button}>
        <PlusButton className={styles.buttonIcon} />
        Load other image
      </Button>
    </div>
  </div>
);

DogContainer.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
};

DogContainer.defaultProps = {
  className: '',
  title: 'Please select a breed',
};

export default connect(({ breeds, selectedBreed }) => {
  const currentBreed = breeds.find(breed => breed.id === selectedBreed);

  return ({ title: currentBreed && formatBreedName(currentBreed) });
})(DogContainer);
