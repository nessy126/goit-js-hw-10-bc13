import './css/styles.css';
import debounce from 'lodash.debounce';
import fetchCountries from './fetchCountries.js';
import Notiflix from 'notiflix';
// console.log(fetchCountries)
const DEBOUNCE_DELAY = 300;
const searchEl = document.querySelector('#search-box');
const contriesList = document.querySelector('.country-list');
const countryDiv = document.querySelector('.country-info');
searchEl.addEventListener('input', debounce(getCountries, DEBOUNCE_DELAY));
// fetchCountries('ukraine')

function getCountries(e) {
  const serchRequest = searchEl.value.trim();

  if (!serchRequest) {
    renderMarkup();
    return;
  }
  fetchCountries(serchRequest)
    .then(data => {
      const lengthOfArray = data.length;

      if (lengthOfArray === 1) {
        const markup = renderCountryMarkup(data);
        renderMarkup('', markup);
        return;
      }

      if (lengthOfArray >= 2 && data.length <= 10) {
        const markup = renderListMarkup(data);
        renderMarkup(markup, '');
        return;
      }

      if (lengthOfArray > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        renderMarkup();
        return;
      }
    })
    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}

function renderListMarkup(arrayOfCountries) {
  return arrayOfCountries
    .map(({ flags, name }) => {
      return `<li class="countries"><img src="${flags.svg}" class="countries"></img>${name.official}</li>`;
    })
    .join('');
}

function renderCountryMarkup(countryOne) {
  return countryOne
    .map(({ flags, name, capital, population, languages }) => {
      return `<li class="countries"><img src="${flags.svg}" class="countries"></img>${
        name.official
      }</li>
    <ul class="contry-one">
    <li class="info">Capital: <span>${capital}</span></li>
    <li class="info">Population: <span>${population}</span></li>
    <li class="info">Languages: <span>${Object.values(languages).join(', ')}</span></li>
    </ul>`;
    })
    .join('');
}

function renderMarkup(a = '', b = '') {
  contriesList.innerHTML = a;
  countryDiv.innerHTML = b;
}
