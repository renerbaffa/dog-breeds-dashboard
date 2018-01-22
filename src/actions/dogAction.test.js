import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  fetchDogImage,
  SET_DOG_RETRIEVING,
  setDogImageRetrieving,
} from './dogAction';

import { DOG, FAILED, RETRIEVED, RETRIEVING } from '../constants/communication';

import BREEDS from '../mocks/Breeds';
import normalizeBreeds from '../normalizers/breeds';

import { getDogImageURL } from '../sources/DogSource';

const NORMALIZED_BREEDS = normalizeBreeds(BREEDS);
const DOG_IMAGE = 'https://dog.ceo/api/img/hound-afghan/n02088094_4230.jpg';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('fetchDogImage', () => {
  let action;
  let breed;
  let mock;
  let store;
  let url;

  beforeEach(() => {
    breed = NORMALIZED_BREEDS[1]; // eslint-disable-line
    mock = new MockAdapter(axios);
    store = mockStore({ breeds: NORMALIZED_BREEDS, selectedBreed: breed.id });
  });

  describe('setDogImageRetrieving', () => {
    beforeEach(() => {
      action = {
        type: SET_DOG_RETRIEVING,
        meta: {
          [DOG]: undefined,
        },
      };
    });

    it('should return correct action when status is FAILED', () => {
      action.meta[DOG] = FAILED;
      expect(setDogImageRetrieving(FAILED)).toEqual(action);
    });

    it('should return correct action when setting loading as RETRIEVING', () => {
      action.meta[DOG] = RETRIEVING;
      expect(setDogImageRetrieving(RETRIEVING)).toEqual(action);
    });

    it('should return correct action when setting loading as RETRIEVED', () => {
      action.meta[DOG] = RETRIEVED;
      expect(setDogImageRetrieving(RETRIEVED)).toEqual(action);
    });
  });

  describe('when backend return success', () => {
    beforeEach(() => {
      url = getDogImageURL(breed);
      mock.onGet(url)
        .reply(200, { status: 'success', message: DOG_IMAGE });
    });

    it('should dispatch RETRIEVING action at the first moment', () =>
      store.dispatch(fetchDogImage()).then(() => {
        expect(store.getActions()[0].meta[DOG]).toEqual(RETRIEVING);
      }));

    it('should dispatch RETRIEVED action on fetch success', () =>
      store.dispatch(fetchDogImage()).then(() =>
        expect(store.getActions()[store.getActions().length - 1].meta[DOG])
          .toEqual(RETRIEVED)));

    it('return dogh image URL', () =>
      store.dispatch(fetchDogImage(breed)).then(dogResponse =>
        expect(dogResponse).toBe(DOG_IMAGE)));
  });

  describe('when backend return error', () => {
    beforeEach(() => {
      url = getDogImageURL(breed);
      mock.onGet(url)
        .reply(500, { error: 'error' });
    });

    it('should dispatch FAILED action on fetch error', () =>
      store.dispatch(fetchDogImage(breed)).then(() =>
        expect(store.getActions()[store.getActions().length - 1].meta[DOG])
          .toEqual(FAILED)));

    it('should return empty string', () =>
      store.dispatch(fetchDogImage(breed)).then(dogResponse =>
        expect(dogResponse).toBe('')));
  });
});
