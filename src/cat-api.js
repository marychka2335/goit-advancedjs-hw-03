import axios from 'axios';
const BASE_URL = 'https://api.thecatapi.com/v1';

 function fetchBreeds() {
  return axios.get(`${BASE_URL}/breeds`).then(response => response.data);
}

function fetchCatByBreed(breedId) {
  axios.defaults.headers.common['x-api-key'] =
  'live_SWwNDJ6lixvIgMTFSA1O4wT3iaw1WygGWikOVhdwUP1RCHZe5g4W3gX9Bf2NR5Jv';
const KEY_API = axios.defaults.headers.common['x-api-key'];
  const urlСatByBreed = `https://api.thecatapi.com/v1/images/search?api_key=${KEY_API}&limit=1&breed_ids=${breedId}`;

  return fetch(urlСatByBreed).then(response => response.json());
}

export { fetchBreeds, fetchCatByBreed };


