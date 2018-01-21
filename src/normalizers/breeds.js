import Guid from 'guid';

export default function normalizeBreeds(breeds = {}) {
  const data = [];

  Object.keys(breeds).forEach((breed) => {
    if (breeds[breed].length > 0) {
      breeds[breed].forEach((subBreed) => {
        data.push({
          id: Guid.create().value,
          name: subBreed,
          parentBreed: breed,
        });
      });
    } else {
      data.push({
        id: Guid.create().value,
        name: breed,
        parentBreed: undefined,
      });
    }
  });

  return data;
}
