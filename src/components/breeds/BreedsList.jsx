import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchBreeds, setSelectedBreed } from '../../actions/breedsActions';

import {
  filterByFormattedName,
  sortBreedsByFormattedName,
} from '../../utils/breeds';
import { BREEDS, RETRIEVING } from '../../constants/communication';

import BreedItem from './BreedItem';
import Loader from '../template/Loader';

import styles from './BreedsList.css';

export class BreedsList extends Component {
  static propTypes = {
    breeds: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      parentBreed: PropTypes.string,
    })),
    isLoading: PropTypes.bool,
    onFetchBreeds: PropTypes.func,
    onSetSelectedBreed: PropTypes.func,
    searchText: PropTypes.string, // eslint-disable-line
    selectedBreed: PropTypes.string,
  };

  static defaultProps = {
    breeds: [],
    isLoading: false,
    onFetchBreeds: () => {},
    onSetSelectedBreed: () => {},
    searchText: '',
    selectedBreed: '',
  };

  componentDidMount() {
    this.props.onFetchBreeds();
  }

  render() {
    const {
      breeds,
      isLoading,
      onSetSelectedBreed,
      selectedBreed,
    } = this.props;

    return (
      <div className={styles.container}>
        <Loader show={isLoading} />
        {breeds.map(breed => (
          <BreedItem
            breed={breed}
            key={`breed-${breed.id}`}
            selected={selectedBreed === breed.id}
            onClick={() => onSetSelectedBreed(breed.id)}
          />
        ))}
      </div>
    );
  }
}

function mapStateToProps(
  { breeds, communication, selectedBreed },
  { searchText },
) {
  return {
    isLoading: communication[BREEDS] === RETRIEVING,
    breeds:
      sortBreedsByFormattedName(filterByFormattedName(breeds, searchText)),
    selectedBreed,
  };
}

export default connect(
  mapStateToProps,
  {
    onFetchBreeds: fetchBreeds,
    onSetSelectedBreed: setSelectedBreed,
  },
)(BreedsList);
