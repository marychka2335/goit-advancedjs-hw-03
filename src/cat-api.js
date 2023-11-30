import axios from 'axios';
const BASE_URL = 'https://api.thecatapi.com/v1';

// function fetchBreeds(url) {
//   return fetch(url).then(response => response.json());
// }
 function fetchBreeds() {
  return axios.get(`${BASE_URL}/breeds`).then(response => response.data);
}

function fetchCatByBreed(breedId) {
  axios.defaults.headers.common['x-api-key'] =
  'live_SWwNDJ6lixvIgMTFSA1O4wT3iaw1WygGWikOVhdwUP1RCHZe5g4W3gX9Bf2NR5Jv';
const KEY_API = axios.defaults.headers.common['x-api-key'];
  // const KEY_API =
  //   'live_SWwNDJ6lixvIgMTFSA1O4wT3iaw1WygGWikOVhdwUP1RCHZe5g4W3gX9Bf2NR5Jv';
  const urlСatByBreed = `https://api.thecatapi.com/v1/images/search?api_key=${KEY_API}&limit=1&breed_ids=${breedId}`;

  return fetch(urlСatByBreed).then(response => response.json());
}

export { fetchBreeds, fetchCatByBreed };


// const BASE_URL = 'https://api.thecatapi.com/v1';
// axios.defaults.headers.common['x-api-key'] =
//   'live_SWwNDJ6lixvIgMTFSA1O4wT3iaw1WygGWikOVhdwUP1RCHZe5g4W3gX9Bf2NR5Jv';

// export function fetchBreeds() {
//   return axios.get(`${BASE_URL}/breeds`).then(response => response.data);
// }

// export function fetchCatByBreed(breedId) {
//   return axios
//     .get(`${BASE_URL}/images/search?breed_ids=${breedId}`)
//     .then(response => response.data);
// }


// import Notiflix from 'notiflix';
// import iziToast from 'izitoast';

// export function fetchBreeds() {
    
//     return fetch(`https://api.thecatapi.com/v1/${breeds}/?fields=breed,description,temperament,photos`).then(response => {
//         if (!response.ok) {
//             iziToast.warning({message: 'Oops, there is no country with that name.'})
//         } return response.json()
//     }).catch(error => console.log(error))
// }