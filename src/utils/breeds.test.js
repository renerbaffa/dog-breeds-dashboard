import {
  camelCase,
  filterByFormattedName,
  formatBreedName,
  sortBreedsByFormattedName,
} from './breeds';

describe('formatBreedName util', () => {
  describe('camelCase', () => {
    it('should convert to camel case', () =>{
      expect(camelCase('frencH')).toBe('French');
    });
  });

  describe('formatBreedName', () => {
    describe('given no parent breed', () => {
      it('should return only the name', () => {
        expect(formatBreedName({ name: 'french' }))
          .toBe('French');
      });

      describe('when parent breed is given', () => {
        it('should concat parent breed', () => {
          expect(formatBreedName({ name: 'french', parentBreed: 'bulldog' }))
            .toBe('French (Bulldog)');
        });
      });
    });
  });

  describe('sortBreedsByFormattedName', () => {
    it('should sort breed by formatted name', () => {
      const breeds = [
        { name: 'boxer' },
        { name: 'french', parentBreed: 'bulldog' },
        { name: 'african' },
      ];
      expect(sortBreedsByFormattedName(breeds)).toEqual([
        { name: 'african' },
        { name: 'boxer' },
        { name: 'french', parentBreed: 'bulldog' },
      ]);
    });
  });

  describe('filterByFormattedName', () => {
    it('should filter breed by formatted name', () => {
      const breeds = [
        { name: 'boxer' },
        { name: 'french', parentBreed: 'bulldog' },
        { name: 'african' },
      ];
      expect(filterByFormattedName(breeds, 'o')).toEqual([
        { name: 'boxer' },
        { name: 'french', parentBreed: 'bulldog' },
      ]);
    });
  });
});
