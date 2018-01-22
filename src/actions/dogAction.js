import { fetchRandomDogImage } from '../sources/DogSource';

import { DOG, FAILED, RETRIEVED, RETRIEVING } from '../constants/communication';

export const SET_DOG_RETRIEVING = 'SET_DOG_RETRIEVING';

export function setDogImageRetrieving(status) {
  return {
    type: SET_DOG_RETRIEVING,
    meta: {
      [DOG]: status,
    },
  };
}


export function fetchDogImage() {
  return async (dispatch, getState) => {
    const currentBreed =
      getState().breeds.find(breed => breed.id === getState().selectedBreed);

    dispatch(setDogImageRetrieving(RETRIEVING));
    const dogResponse = await fetchRandomDogImage(currentBreed);
    dispatch(setDogImageRetrieving(RETRIEVED));
    if (!dogResponse.hasError) {
      return dogResponse.dogImage;
    }

    dispatch(setDogImageRetrieving(FAILED));
    return '';
  };
}
