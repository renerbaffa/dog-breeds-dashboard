import React from 'react';
import renderer from 'react-test-renderer';

import Image from './Image';

describe('<Image />', () => {
  it('should render correctly', () => {
    const buttonSnapshot = renderer.create(<Image
      src="http://lorempixel.com/400/200/technics/"
      alt="alt"
    />).toJSON();
    expect(buttonSnapshot).toMatchSnapshot();
  });
});
