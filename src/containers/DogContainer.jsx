import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { connect } from 'react-redux';

import PlusButton from 'react-icons/lib/fa/plus';

import Button from '../components/shared/Button';
import Image from '../components/shared/Image';
import Loader from '../components/template/Loader';

import { formatBreedName } from '../utils/breeds';

import { fetchDogImage } from '../actions/dogAction';

import { DOG, RETRIEVING } from '../constants/communication';

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
    isLoading: PropTypes.bool,
    title: PropTypes.string,
  };

  static defaultProps = {
    className: '',
    currentBreed: undefined,
    onFetchDogImage: () => {},
    isLoading: false,
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

  updateDogImage = async currentBreed =>
    this.setState({ dogImage: undefined }, async () => {
      const dogImage = await this.props.onFetchDogImage(currentBreed);
      this.setState({ dogImage });
    });

  handleLoadMore = () => this.updateDogImage(this.props.currentBreed);

  render() {
    const {
      className,
      currentBreed,
      isLoading,
      title,
    } = this.props;
    const { dogImage } = this.state;

    const content = [];

    if (isLoading) {
      content.push((
        <Loader
          className={styles.loader}
          key="dog-container-loader"
          show={isLoading}
        />
      ));
    }

    if (currentBreed && (dogImage || dogImage === '')) {
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
          <Button
            className={styles.button}
            onClick={this.handleLoadMore}
          >
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

export function mapStateToProps({ breeds, communication, selectedBreed }) {
  const currentBreed = breeds.find(breed => breed.id === selectedBreed);

  return ({
    title: currentBreed && formatBreedName(currentBreed),
    currentBreed,
    isLoading: communication[DOG] === RETRIEVING,
  });
}

export default connect(
  mapStateToProps,
  {
    onFetchDogImage: fetchDogImage,
  },
)(DogContainer);
