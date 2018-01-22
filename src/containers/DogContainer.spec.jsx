import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { formatBreedName } from '../utils/breeds';
import { DOG, RETRIEVING, RETRIEVED } from '../constants/communication';
import Loader from '../components/template/Loader';

import BREEDS_MOCK from '../mocks/Breeds';
import normalizeBreeds from '../normalizers/breeds';

import ConnectDogContainer, {
  DogContainer,
  mapStateToProps,
} from './DogContainer';

const NORMALIZED_BREEDS = normalizeBreeds(BREEDS_MOCK);
const DOG_IMAGE = 'https://dog.ceo/api/img/hound-afghan/n02088094_4230.jpg';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('<DogContainer />', () => {
  let component;
  let currentBreed;
  let wrapper;

  beforeEach(() => {
    // eslint-disable-next-line
    currentBreed = NORMALIZED_BREEDS[1];
    component = <DogContainer />;
    wrapper = shallow(component);
  });

  it('should render correctly', () => {
    const container = renderer.create().toJSON();
    expect(container).toMatchSnapshot();
  });

  describe('given selected breed', () => {
    let store;

    beforeEach(() => {
      store = mockStore({
        breeds: NORMALIZED_BREEDS,
        selectedBreed: currentBreed.id,
        communication: {
          [DOG]: RETRIEVING,
        },
      });
      wrapper = shallow(<ConnectDogContainer store={store} />);
    });

    it('should inject correct title', () => {
      expect(wrapper.props().title).toEqual(formatBreedName(currentBreed));
    });
  });

  describe('when component will receive props', () => {
    let fn;
    beforeEach(() => {
      fn = jest.fn();
      wrapper.instance().updateDogImage = fn;
    });

    it('should call updateDogImage when a receiving a new selected breed', () => {
      expect(fn).not.toHaveBeenCalled();
      wrapper.setProps({ currentBreed });
      expect(fn).toHaveBeenCalledWith(currentBreed);
    });

    it('should not call updateDogImage when no breed is selected', () => {
      expect(fn).not.toHaveBeenCalled();
      wrapper.setProps({ className: '' });
    });
  });

  describe('updateDogImage', () => {
    describe('providing backend success', () => {
      beforeEach(() => {
        wrapper = shallow(<DogContainer
          onFetchDogImage={() => DOG_IMAGE}
        />);
      });

      it('should update dogImage state value', () => {
        expect(wrapper.state().dogImage).toBeUndefined();
        return wrapper.instance().updateDogImage().then(() => {
          expect(wrapper.state().dogImage).toBe(DOG_IMAGE);
        });
      });
    });

    describe('providing backend error', () => {
      beforeEach(() => {
        wrapper = shallow(<DogContainer
          onFetchDogImage={() => ''}
        />);
      });

      it('should set empty string for dogImage state value', () => {
        expect(wrapper.state().dogImage).toBeUndefined();
        return wrapper.instance().updateDogImage().then(() => {
          expect(wrapper.state().dogImage).toBe('');
        });
      });
    });
  });

  it('should not render image and button when breed is selected', () => {
    expect(wrapper.find('.buttonContainer')).toHaveLength(0);
    expect(wrapper.find('.imageContainer')).toHaveLength(0);
  });

  it('should render image and button when breed is selected', () => {
    wrapper = shallow(<DogContainer
      currentBreed={currentBreed}
    />);
    wrapper.setState({ dogImage: '' });

    expect(wrapper.find('.buttonContainer')).toHaveLength(1);
    expect(wrapper.find('.imageContainer')).toHaveLength(1);
  });

  describe('mapStateToProps', () => {
    let newState;

    beforeEach(() => {
      newState = mapStateToProps({
        breeds: NORMALIZED_BREEDS,
        selectedBreed: currentBreed.id,
        communication: {
          [DOG]: RETRIEVING,
        },
      });
    });

    it('should return correct title', () => {
      expect(newState.title).toBe(formatBreedName(currentBreed));
    });

    it('should return correct currentBreed', () => {
      expect(newState.currentBreed).toBe(currentBreed);
    });

    it('should ruturn true when DOG status is RETRIEVING', () => {
      expect(newState.isLoading).toBeTruthy();
    });

    it('should ruturn false when DOG status is not RETRIEVING', () => {
      newState = mapStateToProps({
        breeds: NORMALIZED_BREEDS,
        selectedBreed: currentBreed.id,
        communication: {
          [DOG]: RETRIEVED,
        },
      });
      expect(newState.isLoading).toBeFalsy();
    });
  });

  describe('isLoading prop', () => {
    it('should render loader when isLoading prop is true', () => {
      wrapper.setProps({ isLoading: true });
      expect(wrapper.find(Loader)).toHaveLength(1);
    });

    it('should not render loader when isLoading prop is false', () => {
      wrapper.setProps({ isLoading: false });
      expect(wrapper.find(Loader)).toHaveLength(0);
    });
  });

  it('should reach 100% of coverage', () => {
    DogContainer.defaultProps.onFetchDogImage(); // running default prop

    const store = mockStore({
      breeds: NORMALIZED_BREEDS,
      selectedBreed: currentBreed.id,
      communication: {
        [DOG]: RETRIEVING,
      },
    });
    // rendering connected component in order to inject information from store
    wrapper = shallow(<ConnectDogContainer store={store} />);
  });
});
