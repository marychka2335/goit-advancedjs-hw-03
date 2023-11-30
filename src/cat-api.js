import axios from 'axios';
const BASE_URL = 'https://api.thecatapi.com/v1';
axios.defaults.headers.common['x-api-key'] =
  'live_SWwNDJ6lixvIgMTFSA1O4wT3iaw1WygGWikOVhdwUP1RCHZe5g4W3gX9Bf2NR5Jv';

export function fetchBreeds() {
  return axios.get(`${BASE_URL}/breeds`).then(response => response.data);
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`${BASE_URL}/images/search?breed_ids=${breedId}`)
    .then(response => response.data);
}