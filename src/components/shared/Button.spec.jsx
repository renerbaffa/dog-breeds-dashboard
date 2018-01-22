import React from 'react';
import renderer from 'react-test-renderer';

import Button from './Button';

describe('<Button />', () => {
  it('should render correctly', () => {
    const buttonSnapshot =
      renderer
        .create(<Button className="className">Grid</Button>)
        .toJSON();
    expect(buttonSnapshot).toMatchSnapshot();
  });

  it('should apply selected classname', () => {
    const selectedButtonSnapshot =
      renderer
        .create(<Button className="className" selected>Grid</Button>)
        .toJSON();
    expect(selectedButtonSnapshot).toMatchSnapshot();
  });
});
