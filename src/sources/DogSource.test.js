import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { fetchRandomDogImage, getDogImageURL } from './DogSource';

import { BASE_URL } from '../constants/backend';

import BREEDS from '../mocks/Breeds';
import normalizeBreeds from '../normalizers/breeds';

const NORMALIZED_BREEDS = normalizeBreeds(BREEDS);
const DOG_IMAGE = 'https://dog.ceo/api/img/hound-afghan/n02088094_4230.jpg';

describe('fetchBreeds', () => {
  let breed;
  let mock;
  let url;

  beforeEach(() => {
    breed = {
      id: '951b751a-79ab-d2ab-8e4a-5372ec02d933',
      name: 'french',
      parentBreed: undefined,
    };
    mock = new MockAdapter(axios);
  });

  describe('getDogImageURL', () => {
    describe('Not providing breed', () => {
      it('should return correct URL', () => {
        breed.parentBreed = 'bulldog';
        const { name, parentBreed } = breed;
        expect(getDogImageURL(breed))
          .toBe(`${BASE_URL}/breed/${parentBreed}/${name}/images/random`);
      });
    });

    describe('given a breed', () => {
      it('should return correct URL', () => {
        expect(getDogImageURL(breed))
          .toBe(`${BASE_URL}/breed/${breed.name}/images/random`);
      });
    });
  });

  describe('when backend returns success', () => {
    beforeEach(() => {
      url = getDogImageURL(breed);
      mock.onGet(url)
        .reply(200, { status: 'success', message: DOG_IMAGE });
    });

    it('should return normalized data', () => {
      fetchRandomDogImage(breed).then((response) => {
        expect(response).toEqual({
          hasError: false,
          dogImage: DOG_IMAGE,
        });
      });
    });
  });

  describe('when backend return error', () => {
    beforeEach(() => {
      url = getDogImageURL(breed);
      mock.onGet(url)
        .reply(500, { error: 'error' });
    });

    it('should return error', () =>
      fetchRandomDogImage(breed).then(data =>
        expect(data.hasError).toBeTruthy()));
  });

  describe('when backend response has error', () => {
    beforeEach(() => {
      mock.onGet(url)
        .reply(200, { status: 'error' });
    });

    it('should return error', () =>
      fetchRandomDogImage(breed).then(data =>
        expect(data.hasError).toBeTruthy()));
  });
});
