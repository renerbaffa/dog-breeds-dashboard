import React from 'react';
import renderer from 'react-test-renderer';

import Loader from './Loader';

describe('<Loader />', () => {
  let loader;

  it('should return null if show prop is false', () => {
    loader = renderer.create(<Loader />).toJSON();
    expect(loader).toMatchSnapshot();
  });

  it('should show spinner correctly', () => {
    loader = renderer.create(<Loader show />).toJSON();
    expect(loader).toMatchSnapshot();
  });
});
