import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchBreeds } from '../../actions/breedsActions';

import { sortBreedsByFormattedName } from '../../utils/breeds';

import BreedItem from './BreedItem';

import styles from './BreedsList.css';

export class BreedsList extends Component {
  static propTypes = {
    breeds: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      parentBreed: PropTypes.string,
    })),
    onFetchBreeds: PropTypes.func,
  };

  static defaultProps = {
    breeds: [],
    onFetchBreeds: () => {},
  };

  componentDidMount() {
    this.props.onFetchBreeds();
  }

  render() {
    const { breeds } = this.props;

    return (
      <div className={styles.container}>
        {breeds.map(breed => (
          <BreedItem
            breed={breed}
            key={`breed-${breed.id}`}
          />
        ))}
      </div>
    );
  }
}

export default connect(
  ({ breeds }) => ({ breeds: sortBreedsByFormattedName(breeds) }),
  {
    onFetchBreeds: fetchBreeds,
  },
)(BreedsList);
