import formatBreedName from './breeds';

describe('formatBreedName util', () => {
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
