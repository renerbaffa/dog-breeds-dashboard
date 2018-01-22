import axios from 'axios';

import { BASE_URL } from '../constants/backend';

// /api/breed/{breed name}/{sub-breed name}/images/random
export function getDogImageURL(breed) {
  let breedUrl = `${BASE_URL}/breed`;

  if (breed.parentBreed) {
    breedUrl =
      `${breedUrl}/${breed.parentBreed}/${breed.name}/images/random`;
  } else {
    breedUrl = `${breedUrl}/${breed.name}/images/random`;
  }

  return breedUrl;
}

export const SUCCESS = 'success';

export async function fetchRandomDogImage(breed) {
  let hasError = true;
  let dogImage;

  try {
    const dogResponse = await axios.get(getDogImageURL(breed));

    if (dogResponse.data.status.toLowerCase() === SUCCESS.toLowerCase()) {
      dogImage = dogResponse.data.message;
      hasError = false;
    }

    return { hasError, dogImage };
  } catch (err) {
    return { hasError, dogImage };
  }
}
