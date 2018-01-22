import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  fetchBreeds,
  SET_BREEDS_RETRIEVING,
  setBreedsRetrieving,
  UPDATE_BREEDS,
  updateBreeds,
} from './breedsActions';

import { FETCH_BREEDS } from '../sources/BreedsSource';

import {
  BREEDS,
  FAILED,
  RETRIEVED,
  RETRIEVING,
} from '../constants/communication';

import BREEDS_MOCK from '../mocks/Breeds';
import normalizeBreeds from '../normalizers/breeds';

const NORMALIZED_BREEDS = normalizeBreeds(BREEDS_MOCK);

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('breed actions', () => {
  let action;

  beforeEach(() => {
    action = {
      type: SET_BREEDS_RETRIEVING,
      meta: {
        [BREEDS]: undefined,
      },
    };
  });

  describe('setBreedsRetrieving', () => {
    it('should return correct action when status is FAILED', () => {
      action.meta[BREEDS] = FAILED;
      expect(setBreedsRetrieving(FAILED)).toEqual(action);
    });

    it('should return correct action when setting loading as RETRIEVING', () => {
      action.meta[BREEDS] = RETRIEVING;
      expect(setBreedsRetrieving(RETRIEVING)).toEqual(action);
    });

    it('should return correct action when setting loading as RETRIEVED', () => {
      action.meta[BREEDS] = RETRIEVED;
      expect(setBreedsRetrieving(RETRIEVED)).toEqual(action);
    });
  });

  describe('updateBreeds', () => {
    it('should set meta information status for BREEDS as RETRIEVED', () => {
      const breedsAction = updateBreeds([]);
      expect(breedsAction.type).toEqual(UPDATE_BREEDS);
      expect(breedsAction.meta[BREEDS]).toBe(RETRIEVED);
    });

    it('should return breeds as payload data', () => {
      expect(updateBreeds(NORMALIZED_BREEDS).payload.breeds)
        .toEqual(NORMALIZED_BREEDS);
    });
  });

  describe('fetchBreeds', () => {
    let mock;
    let store;

    beforeEach(() => {
      mock = new MockAdapter(axios);
      store = mockStore({ breeds: [] });
    });

    describe('when backend return success', () => {
      beforeEach(() => {
        mock.onGet(FETCH_BREEDS)
          .reply(200, { status: 'success', message: BREEDS_MOCK });
      });

      it('should dispatch RETRIEVING action at the first moment', () =>
        store.dispatch(fetchBreeds()).then(() => {
          expect(store.getActions()[0].meta[BREEDS]).toEqual(RETRIEVING);
        }));

      it('should dispatch RETRIEVED action on fetch success', () =>
        store.dispatch(fetchBreeds()).then(() =>
          expect(store.getActions()[store.getActions().length - 1].meta[BREEDS])
            .toEqual(RETRIEVED)));

      it('should add breeds in payload', () => {
        action.type = UPDATE_BREEDS;
        action.meta[BREEDS] = RETRIEVED;
        action.payload = { breeds: NORMALIZED_BREEDS };
        return store.dispatch(fetchBreeds()).then(() =>
          expect(store.getActions()[store.getActions().length - 1].payload.breeds)
            .toHaveLength(NORMALIZED_BREEDS.length));
      });
    });

    it('should dispatch FAILED action on fetch error', () => {
      mock.onGet(FETCH_BREEDS)
        .reply(500, { error: 'error' });

      return store.dispatch(fetchBreeds()).then(() => {
        expect(store.getActions()[store.getActions().length - 1].meta[BREEDS])
          .toEqual(FAILED);
      });
    });
  });
});
