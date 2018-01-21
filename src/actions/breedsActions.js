import { BREEDS, FAILED, RETRIEVED, RETRIEVING } from '../constants/communication';

import { fetchBreeds as sourceFetchBreeds } from '../sources/BreedsSource';

export const SET_BREEDS_RETRIEVING = 'SET_BREEDS_RETRIEVING';
export const UPDATE_BREEDS = 'UPDATE_BREEDS';

export function setBreedsRetrieving(status) {
  return {
    type: SET_BREEDS_RETRIEVING,
    meta: {
      [BREEDS]: status,
    },
  };
}

export function updateBreeds(breeds) {
  return {
    type: UPDATE_BREEDS,
    meta: {
      [BREEDS]: RETRIEVED,
    },
    payload: {
      breeds,
    },
  };
}

export function fetchBreeds() {
  return async (dispatch) => {
    dispatch(setBreedsRetrieving(RETRIEVING));
    const response = await sourceFetchBreeds();
    if (!response.hasError) {
      dispatch(updateBreeds(response.breeds));
    } else {
      dispatch(setBreedsRetrieving(FAILED));
    }
  };
}
