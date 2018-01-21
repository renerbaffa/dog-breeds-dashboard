export default function normalizeBreeds(breeds = {}) {
  const data = [];

  Object.keys(breeds).forEach((breed) => {
    if (breeds[breed].length > 0) {
      breeds[breed].forEach((subBreed) => {
        data.push({
          name: subBreed,
          parentBreed: breed,
        });
      });
    } else {
      data.push({
        name: breed,
        parentBreed: undefined,
      });
    }
  });

  return data;
}
