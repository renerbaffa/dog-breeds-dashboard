import React, { Component } from 'react';

import BreedsList from '../components/breeds/BreedsList'; // eslint-disable-line
import BreedSearchForm from '../components/breeds/BreedSearchForm';

import styles from './BreedsListContainer.css';

class BreedsListContainer extends Component {
  state = {
    searchText: '',
  }

  handleSearchTextChange = event =>
    this.setState({ searchText: event.target.value });

  render() {
    const { searchText } = this.state;

    return (
      <div className={styles.container}>
        <BreedSearchForm searchText={searchText} />
        <BreedsList searchText={searchText} />
      </div>
    );
  }
}

export default BreedsListContainer;
