import React from 'react';
// import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import App from './App';

describe('<App />', () => {
  it('should render', () => {
    const renderedValue = renderer.create(<App />).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });
});
