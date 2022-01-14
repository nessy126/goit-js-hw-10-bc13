import './css/styles.css';
import debounce from 'lodash.debounce';
import fetchCountries from './fetchCountries.js';
import Notiflix from 'notiflix';
// console.log(fetchCountries)
const DEBOUNCE_DELAY = 300;
const searchEl = document.querySelector('#search-box')
const contriesList = document.querySelector('.country-list')
const countryDiv = document.querySelector('.country-info')
searchEl.addEventListener('input', debounce(getCountries, DEBOUNCE_DELAY))
// fetchCountries('ukraine')

function getCountries(e) {
  fetchCountries(searchEl.value.trim())
    .then(data => {
      if (searchEl.value.trim() === '') {
      contriesList.innerHTML = ''
    }

    if (data.length > 10) {
      Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
      contriesList.innerHTML = ''
    }
      if (data.length >= 2 && data.length <= 10) {
      contriesList.innerHTML = ''
      renderListMarkup(data)
    }
      if (data.length === 1) {
      contriesList.innerHTML = ''
      renderCountryMarkup(data)
    }
  })
}

function renderListMarkup(arrayOfCountries) {
  countryDiv.innerHTML = ''
  const renderCountries = arrayOfCountries.map(country => {
  return `<li class="countries"><img src="${country.flags.svg}" class="countries"></img>${country.name.official}</li>`
}).join('')
  contriesList.innerHTML = renderCountries
}


function renderCountryMarkup(countryOne) {
  contriesList.innerHTML = ''
  const renderCountry = countryOne.map(country => {
    return `<li class="countries"><img src="${country.flags.svg}" class="countries"></img>${country.name.official}</li>
    <ul class="contry-one">
    <li class="info">Capital: <span>${country.capital}</span></li>
    <li class="info">Population: <span>${country.population}</span></li>
    <li class="info">Languages: <span>${Object.values(country.languages)}</span></li>
    </ul>`
  }).join('')
  countryDiv.innerHTML = renderCountry
}