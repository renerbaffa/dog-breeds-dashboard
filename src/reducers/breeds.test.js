import breeds, {
  INITIAL_STATE,
} from './breeds';

import { UPDATE_BREEDS } from '../actions/breedsActions';

import BREEDS from '../mocks/Breeds';
import normalizeBreeds from '../normalizers/breeds';

const NORMALIZED_BREEDS = normalizeBreeds(BREEDS);

describe('breeds reducer', () => {
  let action;
  let state;

  beforeEach(() => {
    state = { breeds: ['item'] };
    action = {
      type: UPDATE_BREEDS,
      payload: {
        breeds: NORMALIZED_BREEDS,
      },
    };
  });

  describe('given no state', () => {
    it('should return INITIAL_STATE', () => {
      expect(breeds()).toEqual(INITIAL_STATE);
    });
  });

  describe('given no action', () => {
    it('should return current state', () => {
      expect(breeds(state)).toEqual(state);
    });
  });

  describe('given UPDATE_BREEDS action with breeds data on payload', () => {
    it('should update state according breeds data', () => {
      expect(breeds(state, action)).toEqual(NORMALIZED_BREEDS);
    });
  });
});
