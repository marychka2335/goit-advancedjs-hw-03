import { fetchBreeds, fetchCatByBreed } from './cat-api';
import iziToast from 'izitoast';
import SlimSelect from 'slim-select';
import 'izitoast/dist/css/iziToast.min.css';

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

catInfo.classList.add('is-hidden');

breedSelect.addEventListener('change', createMarkup);

updateSelect();

function updateSelect(data) {
  loader.classList.remove('is-hidden');

  fetchBreeds(data)
    .then(data => {
      loader.classList.add('is-hidden');
      breedSelect.classList.remove('is-hidden');
      breedSelect.innerHTML = '';
      let markSelect = data.map(({ name, id }) => {
        return `<option value ='${id}'>${name}</option>`;
      });
      breedSelect.insertAdjacentHTML('beforeend', markSelect);
      new SlimSelect({
        select: breedSelect,
      });
    })
    .catch(onError);
}

function createMarkup(event) {
  loader.classList.remove('is-hidden');
  catInfo.classList.add('is-hidden');

  const breedId = event.currentTarget.value;

  fetchCatByBreed(breedId)
    .then(data => {
      loader.classList.add('is-hidden');
      breedSelect.classList.remove('is-hidden');
      const { url, breeds } = data[0];

      catInfo.innerHTML = `<img src="${url}" alt="${breeds[0].name}" width="400"/><div class="box"><h2>${breeds[0].name}</h2><p>${breeds[0].description}</p><p><strong>Temperament:</strong> ${breeds[0].temperament}</p></div>`;
      catInfo.classList.remove('is-hidden');
    })
    .catch(onError);
}

function onError() {
  loader.classList.add('is-hidden');
  breedSelect.innerHTML = '';

  iziToast({
    message: 'Something went wrong! Try reloading the page!',
    position: "center"
  });
}