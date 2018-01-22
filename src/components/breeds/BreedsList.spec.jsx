import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import ConnectedBreedsList, {
  BreedsList,
} from './BreedsList';

import BREEDS from '../../mocks/Breeds';
import normalizeBreeds from '../../normalizers/breeds';
import { sortBreedsByFormattedName } from '../../utils/breeds';

const NORMALIZED_BREEDS = normalizeBreeds(BREEDS);

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('<BreedsList />', () => {
  let component;
  let onFetchBreeds;
  let wrapper;

  beforeEach(() => {
    onFetchBreeds = jest.fn();
    component = (
      <BreedsList
        breeds={NORMALIZED_BREEDS}
        onFetchBreeds={onFetchBreeds}
      />
    );
    wrapper = shallow(component);
  });

  it('should render correctly', () => {
    const breedsList = renderer.create(component).toJSON();
    expect(breedsList).toMatchSnapshot();
  });

  it('should call onFetchBreeds on componentDidMount', () => {
    onFetchBreeds = jest.fn();
    wrapper.setProps({ onFetchBreeds });
    expect(onFetchBreeds).not.toHaveBeenCalled();
    wrapper.instance().componentDidMount();
    expect(onFetchBreeds).toHaveBeenCalled();
  });

  it('should inject breeds from store into component', () => {
    const store = mockStore({ breeds: NORMALIZED_BREEDS });
    wrapper = shallow(<ConnectedBreedsList
      onFetchBreeds={onFetchBreeds}
      store={store}
    />);
    expect(wrapper.props().breeds)
      .toEqual(sortBreedsByFormattedName(NORMALIZED_BREEDS));
  });

  it('should reach 100% of coverage', () => {
    BreedsList.defaultProps.onFetchBreeds();
  });
});
