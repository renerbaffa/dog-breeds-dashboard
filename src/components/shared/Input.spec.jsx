import React from 'react';
import renderer from 'react-test-renderer';

import Input from './Input';

describe('<Input />', () => {
  it('should render correctly', () => {
    const tree = renderer
      .create(<Input className="className" value="value" placeholder="Search" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
