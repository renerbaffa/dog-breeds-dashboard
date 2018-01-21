import axios from 'axios';

import { BASE_URL } from '../constants/backend';
import normalizeBreeds from '../normalizers/breeds';

export const FETCH_BREEDS = `${BASE_URL}/breeds/list/all`;

const SUCCESS = 'success';

export async function fetchBreeds() {
  let breeds = [];
  let hasError = true;

  try {
    const breedsResponse = await axios.get(FETCH_BREEDS);
    if (breedsResponse.data.status.toLowerCase() === SUCCESS.toLowerCase()) {
      breeds = normalizeBreeds(breedsResponse.data.message);
      hasError = false;
    }
    return { hasError, breeds };
  } catch (err) {
    return { hasError, breeds };
  }
}

export default {
  fetchBreeds,
};
