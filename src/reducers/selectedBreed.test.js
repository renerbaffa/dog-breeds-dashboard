import selectedBreed, { INITIAL_STATE } from './selectedBreed';

import { UPDATE_SELECTED_BREED } from '../actions/breedsActions';

describe('selectedBreed reducer', () => {
  it('should set undefined as intial state', () => {
    expect(selectedBreed()).toBeNull();
  });

  describe('given action', () => {
    let action;
    const SELECTED_BREED = 2;

    beforeEach(() => {
      action = {
        type: UPDATE_SELECTED_BREED,
        payload: {
          selectedBreed: SELECTED_BREED,
        },
      };
    });

    it('should return correct selected breed when provided', () => {
      expect(selectedBreed(INITIAL_STATE, action)).toBe(SELECTED_BREED);
    });
  });
});
