import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import BreedItem from './BreedItem';

describe('<BreedItem />', () => {
  let component;
  let wrapper;

  beforeEach(() => {
    component = <BreedItem name="Lhasa Apso" />;
    wrapper = shallow(component);
  });

  it('should render correctly', () => {
    const breedItem = renderer.create(component).toJSON();
    expect(breedItem).toMatchSnapshot();
  });

  it('should apply selected className when selected prop is true', () => {
    wrapper.setProps({ selected: true });
    expect(wrapper.find('.selected')).toHaveLength(1);
  });

  it('should not apply selected className when selected prop is false', () => {
    expect(wrapper.find('.selected')).toHaveLength(0);
  });
});
