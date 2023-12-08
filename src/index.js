import SlimSelect from 'slim-select';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import IziToast from 'izitoast';

new SlimSelect({
  select: '#selectElement',
});

const breedList = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

const url = `https://api.thecatapi.com/v1/breeds`;

document.addEventListener('DOMContentLoaded', () => {
  fetchBreeds(url)
    .then(json => {
      if ('message' in json) {
        loader.classList.add('visually-hidden');
        throw new Error();
      }
      breedList.classList.remove('visually-hidden');
      loader.classList.add('visually-hidden');
      renderBreedsList(json);
    })
    .catch(error => onError(error));
});

function renderBreedsList(breeds) {
  const markup = breeds
    .map(({ id, name }) => {
      return `
      <option value="${id}">${name}</option>
      `;
    })
    .join('');
  breedList.innerHTML = markup;
}

function getSelectBreed(e) {
  const breedId = e.target.value;

  loader.classList.remove('visually-hidden');
  catInfo.classList.add('visually-hidden');

  fetchCatByBreed(breedId)
    .then(json => {
      if (json.length === 0) {
        loader.classList.add('visually-hidden');
        throw new Error();
      }
      loader.classList.add('visually-hidden');
      renderCatInfo(json);
      catInfo.classList.remove('visually-hidden');
    })
    .catch(error => onError(error));
}

function renderCatInfo(breedData) {
  const markupUrl = breedData.map(({ url }) => {
    return `
      <img src="${url}" width="500">              
      `;
  });

  const markupName = breedData
    .flatMap(elem => elem.breeds)
    .map(({ name, description, temperament }) => {
      return `
      <div class="info-container">
        <h2>${name}</h2>
        <p>${description}</p>  
        <p><span style="font-size:120%; font-weight:bold">Temperament:</span> ${temperament}.</p>
      </div>              
      `;
    });

  catInfo.innerHTML = markupUrl + markupName;
}

function onError() {
  error.classList.remove('visually-hidden');
  iziToast.warning({message: 
    'Oops! Something went wrong! Try reloading the page!'}
  );
}

breedList.addEventListener('change', getSelectBreed);


