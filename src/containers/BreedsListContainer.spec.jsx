import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import BreedsListContainer from './BreedsListContainer';

jest.mock('../components/breeds/BreedsList', () => 'BreedsList');

describe('<BreedsListContainer />', () => {
  let component;
  let wrapper;

  beforeEach(() => {
    component = <BreedsListContainer />;
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
});
