export default function normalizeBreeds(breeds = {}) {
  const data = [];

  Object.keys(breeds).forEach((breed) => {
    if (breeds[breed].length > 0) {
      breeds[breed].forEach((subBreed) => {
        data.push(subBreed);
      });
    } else {
      data.push(breed);
    }
  });

  return data;
}
