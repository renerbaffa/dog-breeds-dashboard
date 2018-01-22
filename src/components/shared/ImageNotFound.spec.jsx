import React from 'react';
import renderer from 'react-test-renderer';

import ImageNotFound from './ImageNotFound';

describe('<Image />', () => {
  it('should render correctly', () => {
    const buttonSnapshot = renderer.create(<ImageNotFound />).toJSON();
    expect(buttonSnapshot).toMatchSnapshot();
  });
});
