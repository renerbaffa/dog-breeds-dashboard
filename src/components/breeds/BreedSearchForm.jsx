import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SearchIcon from 'react-icons/lib/md/search';

import Input from '../shared/Input';
import Button from '../shared/Button';

import styles from './BreedSearchForm.css';

class BreedSearchForm extends Component {
  static propTypes = {
    onFilter: PropTypes.func,
  };

  static defaultProps = {
    onFilter: () => {},
  };

  state = {
    searchText: '',
  }

  handleSearchTextChange = event =>
    this.setState({ searchText: event.target.value });

  handleFilter = (event) => {
    event.preventDefault();
    this.props.onFilter(this.state.searchText);
  }

  render() {
    const { searchText } = this.state;

    return (
      <div className={styles.container}>
        <form onSubmit={this.handleFilter} className={styles.form}>
          <Input
            className={styles.input}
            onChange={this.handleSearchTextChange}
            placeholder="Search..."
            type="text"
            value={searchText}
          />
          <Button className={styles.button}>
            <SearchIcon />
          </Button>
        </form>
      </div>
    );
  }
}

export default BreedSearchForm;
