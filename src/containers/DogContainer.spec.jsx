import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { formatBreedName } from '../utils/breeds';

import BREEDS_MOCK from '../mocks/Breeds';
import normalizeBreeds from '../normalizers/breeds';

import ConnectDogContainer, { DogContainer } from './DogContainer';

const NORMALIZED_BREEDS = normalizeBreeds(BREEDS_MOCK);

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('<DogContainer />', () => {
  let component;
  let wrapper;

  beforeEach(() => {
    component = <DogContainer />;
    wrapper = shallow(component);
  });

  it('should render correctly', () => {
    const container = renderer.create().toJSON();
    expect(container).toMatchSnapshot();
  });

  describe('given selected breed', () => {
    let store;
    let currentBreed;

    beforeEach(() => {
      // eslint-disable-next-line
      currentBreed = NORMALIZED_BREEDS[1];
      store = mockStore({
        breeds: NORMALIZED_BREEDS,
        selectedBreed: currentBreed.id,
      });
      wrapper = shallow(<ConnectDogContainer store={store} />);
    });

    it('should inject correct title', () => {
      expect(wrapper.props().title).toEqual(formatBreedName(currentBreed));
    });
  });

  it('should set default title when store is not provided', () => {
    expect(wrapper.find('.title').text())
      .toBe(DogContainer.defaultProps.title);
  });
});
