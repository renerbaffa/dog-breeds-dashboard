import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import normalizeBreeds from '../normalizers/breeds';
import BREEDS from '../mocks/Breeds';

import { FETCH_BREEDS, fetchBreeds } from './BreedsSource';

const NORMALIZED_BREEDS = normalizeBreeds(BREEDS);

describe('fetchBreeds', () => {
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  describe('when backend returns success', () => {
    beforeEach(() => {
      mock.onGet(FETCH_BREEDS)
        .reply(200, { status: 'success', message: BREEDS });
    });

    it('should return normalized data', () => {
      const breeds = fetchBreeds();

      breeds.then((normalizedBreeds) => {
        const newBreeds =
          normalizedBreeds.breeds.map((breed, index) => ({
            ...breed,
            id: NORMALIZED_BREEDS[index].id,
          }));
        expect(newBreeds).toEqual(NORMALIZED_BREEDS);
        expect(normalizedBreeds.hasError).toBeFalsy();
      });
    });
  });

  describe('when backend return error', () => {
    beforeEach(() => {
      mock.onGet(FETCH_BREEDS)
        .reply(500, { error: 'error' });
    });

    it('should return error', () =>
      fetchBreeds().then(data =>
        expect(data.hasError).toBeTruthy()));
  });

  describe('when backend response has error', () => {
    beforeEach(() => {
      mock.onGet(FETCH_BREEDS)
        .reply(200, { status: 'error' });
    });

    it('should return error', () =>
      fetchBreeds().then(data =>
        expect(data.hasError).toBeTruthy()));
  });
});
