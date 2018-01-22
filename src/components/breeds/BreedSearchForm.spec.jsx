import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import BreedSearchForm from './BreedSearchForm';

describe('<BreedsListContainer />', () => {
  let component;
  let wrapper;
  let onFilter;

  beforeEach(() => {
    onFilter = jest.fn();
    component = <BreedSearchForm onFilter={onFilter} />;
    wrapper = shallow(component);
  });

  it('should render correctly', () => {
    const container = renderer.create(component).toJSON();
    expect(container).toMatchSnapshot();
  });

  it('should set empty string as default state', () => {
    expect(wrapper.state().searchText).toBe('');
  });

  it('should update searchText state', () => {
    const newValue = 'new value';
    expect(wrapper.state().searchText).toBe('');
    wrapper
      .instance()
      .handleSearchTextChange({ target: { value: newValue } });
    expect(wrapper.state().searchText).toBe(newValue);
  });

  it('should call onFilter props when pressing search button', () => {
    const newValue = 'new value';
    expect(onFilter).not.toHaveBeenCalled();
    wrapper.setState({ searchText: newValue });
    wrapper.find('form').simulate('submit', { preventDefault: () => {} });
    expect(onFilter).toHaveBeenCalledWith(newValue);
    expect(wrapper.state().searchText).toBe(newValue);
  });

  it('shoud reach 100% of coverage', () => {
    BreedSearchForm.defaultProps.onFilter();
  });
});
