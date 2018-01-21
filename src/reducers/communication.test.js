import communication, {
  INITIAL_STATE,
} from './communication';

import { BREEDS, RETRIEVED, RETRIEVING } from '../constants/communication';
// import normalizeBreeds from '../normalizers/breeds';
// import BREEDS_MOCK from '../mocks/Breeds';

// const NORMALIZED_BREEDS = normalizeBreeds(BREEDS_MOCK);

describe('communication reducer', () => {
  let action;
  let state;

  beforeEach(() => {
    state = { [BREEDS]: RETRIEVING };
    action = {
      meta: {
        [BREEDS]: RETRIEVED,
      },
    };
  });

  describe('given no state', () => {
    it('should return INITIAL_STATE', () => {
      expect(communication()).toEqual(INITIAL_STATE);
    });
  });

  describe('given no action', () => {
    it('should return current state', () => {
      expect(communication(state)).toEqual(state);
    });
  });

  describe('given action with meta data', () => {
    it('should update state according to meta data', () => {
      expect(communication(state, action)).toEqual({
        [BREEDS]: RETRIEVED,
      });
    });
  });
});
