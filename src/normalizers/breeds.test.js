import BREEDS from '../mocks/Breeds';

import normalizeBreeds from './breeds';

describe('productsNormalizer', () => {
  let normalizedData;

  describe('given no data as parameter', () => {
    beforeEach(() => {
      normalizedData = normalizeBreeds();
    });

    it('should return empty array', () => {
      expect(normalizedData).toEqual([]);
    });
  });

  describe('given breeds array as parameter', () => {
    beforeEach(() => {
      normalizedData = normalizeBreeds(BREEDS);
    });

    it('should add all ids in ids property', () => {
      expect(normalizedData).toHaveLength(22);
    });
  });
});
