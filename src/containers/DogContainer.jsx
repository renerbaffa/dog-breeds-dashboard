import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { connect } from 'react-redux';

import PlusButton from 'react-icons/lib/fa/plus';

import Button from '../components/shared/Button';
import Image from '../components/shared/Image';

import { formatBreedName } from '../utils/breeds';

import { fetchDogImage } from '../actions/dogAction';

import styles from './DogContainer.css';

export class DogContainer extends Component {
  static propTypes = {
    className: PropTypes.string,
    currentBreed: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      parentBreed: PropTypes.string,
    }),
    onFetchDogImage: PropTypes.func,
    title: PropTypes.string,
  };

  static defaultProps = {
    className: '',
    currentBreed: undefined,
    onFetchDogImage: () => {},
    title: 'Please select a breed',
  };

  state = {
    dogImage: undefined,
  };

  componentWillReceiveProps(nextProps) {
    const { currentBreed } = nextProps;
    if (currentBreed && this.props.currentBreed !== currentBreed) {
      this.updateDogImage(currentBreed);
    }
  }

  updateDogImage = async (currentBreed) => {
    const dogImage = await this.props.onFetchDogImage(currentBreed);
    this.setState({ dogImage });
  }

  render() {
    const { className, currentBreed, title } = this.props;
    const { dogImage } = this.state;

    const content = [];

    if (currentBreed) {
      content.push((
        <div
          className={styles.imageContainer}
          key="dog-container-image"
        >
          <Image
            className={styles.image}
            src={dogImage}
          />
        </div>
      ));
      content.push((
        <div
          className={styles.buttonContainer}
          key="dog-container-button"
        >
          <Button className={styles.button}>
            <PlusButton className={styles.buttonIcon} />
            Load other image
          </Button>
        </div>
      ));
    }

    return (
      <div className={cx(className, styles.container)}>
        <div className={styles.title}>{title}</div>
        {content}
      </div>
    );
  }
}

export function mapStateToProps({ breeds, selectedBreed }) {
  const currentBreed = breeds.find(breed => breed.id === selectedBreed);

  return ({
    title: currentBreed && formatBreedName(currentBreed),
    currentBreed,
  });
}

export default connect(
  mapStateToProps,
  {
    onFetchDogImage: fetchDogImage,
  },
)(DogContainer);
