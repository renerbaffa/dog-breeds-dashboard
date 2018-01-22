import React from 'react';
import renderer from 'react-test-renderer';

import DogContainer from './DogContainer';

describe('<DogContainer />', () => {
  it('should render correctly', () => {
    const container = renderer.create(<DogContainer />).toJSON();
    expect(container).toMatchSnapshot();
  });
});
