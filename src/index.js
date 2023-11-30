import SlimSelect from 'slim-select';

import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import iziToast from 'izitoast';

new SlimSelect({
  select: '#selectElement',
});

const breedList = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

const url = `https://api.thecatapi.com/v1/breeds`;

// вызов функции при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  fetchBreeds(url)
    .then(json => {
      // делаем проверку получения данных
      // если нет данных - тогда ошибка
      if ('message' in json) {
        loader.classList.add('visually-hidden');
        throw new Error();
      }
      //если данные есть - рендерим разметку
      breedList.classList.remove('visually-hidden');
      loader.classList.add('visually-hidden');
      renderBreedsList(json);
    })
    .catch(error => onError(error));
});

// функция создания разметки при перезагрузке страницы
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

// получаем выбранное значение породы
function getSelectBreed(e) {
  const breedId = e.target.value;

  loader.classList.remove('visually-hidden');
  catInfo.classList.add('visually-hidden');

  fetchCatByBreed(breedId)
    .then(json => {
      if (json.length === 0) {
        // делаем проверку данных
        loader.classList.add('visually-hidden');
        throw new Error();
      }
      //если данные есть - рендерим разметку
      loader.classList.add('visually-hidden');
      renderCatInfo(json);
      catInfo.classList.remove('visually-hidden');
    })
    .catch(error => onError(error));
}

// функция создания разметки для информации о породе
function renderCatInfo(breedData) {
  // добавляем url
  const markupUrl = breedData.map(({ url }) => {
    return `
      <img src="${url}" width="500">              
      `;
  });

  // вытягиваем и добавляем описание кота
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

  // вставляем разметку в код
  catInfo.innerHTML = markupUrl + markupName;
}

// функция вывода ошибки
function onError(err) {
  error.classList.remove('visually-hidden');
  iziToast.warning({message: 
    'Oops! Something went wrong! Try reloading the page!'}
  );
}

breedList.addEventListener('change', getSelectBreed);


// // import { fetchBreeds, fetchCatByBreed } from './cat-api';
// import SlimSelect from 'slim-select';


// import './styles.css';
// import iziToast from 'izitoast';
// import 'izitoast/dist/css/iziToast.min.css';
// // import debounce from 'lodash.debounce';
// import { fetchBreeds } from './cat-api';
// import renderingMarkup from './renderingMarkup';

// // const DEBOUNCE_DELAY = 300;
// const input = document.querySelector('#search-box');
// const breedSelect = document.querySelector('.breed-select');
// const catInfo = document.querySelector('.cat-info');
// const loader = document.querySelector('.loader');
// const error = document.querySelector('.error');

// // input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

// catInfo.classList.add('is-hidden');

// breedSelect.addEventListener('change', createMarkup);

// function createMarkup(event) {
//   loader.classList.remove('is-hidden');
//   catInfo.classList.add('is-hidden');
//   const breedId = event.currentTarget.value;

//   fetchCatByBreed(breedId)
//     .then(data => {
//       loader.classList.add('is-hidden');
//       breedSelect.classList.remove('is-hidden');
//       const { url, breeds } = data[0];

//       catInfo.innerHTML = `<img src="${url}" alt="${breeds[0].name}" width="400"/><div class="box"><h2>${breeds[0].name}</h2><p>${breeds[0].description}</p><p><strong>Temperament:</strong> ${breeds[0].temperament}</p></div>`;
//       catInfo.classList.remove('is-hidden');
//     })
//     .catch(onError);
// }
// updateSelect();

// function updateSelect(data) {
//   loader.classList.remove('is-hidden');

//   fetchBreeds(data)
//     .then(data => {
//       loader.classList.add('is-hidden');
//       breedSelect.classList.remove('is-hidden');
//       breedSelect.innerHTML = '';
//       let markSelect = data.map(({ name, id }) => {
//         return `<option value ='${id}'>${name}</option>`;
//       });
//       breedSelect.insertAdjacentHTML('beforeend', markSelect);
//       new SlimSelect({
//         select: breedSelect,
//       });
//     })
//     .catch(onError);
// }


// function onSearch (evt){
//     const searchQuery = evt.target.value.trim();
//     if (searchQuery !== '') {
//         fetchBreeds(searchQuery).then(renderingMarkup).catch(error => console.log(error));
//     }
// };



// catInfo.classList.add('is-hidden');

// breedSelect.addEventListener('change', createMarkup);

// updateSelect();

// function updateSelect(data) {
//   loader.classList.remove('is-hidden');

//   fetchBreeds(data)
//     .then(data => {
//       loader.classList.add('is-hidden');
//       breedSelect.classList.remove('is-hidden');
//       breedSelect.innerHTML = '';
//       let markSelect = data.map(({ name, id }) => {
//         return `<option value ='${id}'>${name}</option>`;
//       });
//       breedSelect.insertAdjacentHTML('beforeend', markSelect);
//       new SlimSelect({
//         select: breedSelect,
//       });
//     })
//     .catch(onError);
// }

// function createMarkup(event) {
//   loader.classList.remove('is-hidden');
//   catInfo.classList.add('is-hidden');

//   const breedId = event.currentTarget.value;

//   fetchCatByBreed(breedId)
//     .then(data => {
//       loader.classList.add('is-hidden');
//       breedSelect.classList.remove('is-hidden');
//       const { url, breeds } = data[0];

//       catInfo.innerHTML = `<img src="${url}" alt="${breeds[0].name}" width="400"/><div class="box"><h2>${breeds[0].name}</h2><p>${breeds[0].description}</p><p><strong>Temperament:</strong> ${breeds[0].temperament}</p></div>`;
//       catInfo.classList.remove('is-hidden');
//     })
//     .catch(onError);
// }

// function onError() {
//   loader.classList.add('is-hidden');
//   breedSelect.innerHTML = '';

//   iziToast.show({
//     message: 'Something went wrong! Try reloading the page!',
//     position: 'TopCenter',
//     color: red,
//   });
// }