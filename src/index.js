import './css/styles.css';
import debounce from 'lodash.debounce';
import fetchCountries from './fetchCountries.js';
import Notiflix from 'notiflix';
// console.log(fetchCountries)
const DEBOUNCE_DELAY = 300;
const searchEl = document.querySelector('#search-box')
const contriesList = document.querySelector('.country-list')
searchEl.addEventListener('input', debounce(getCountries, DEBOUNCE_DELAY))
// fetchCountries('ukraine')

function getCountries(e) {
  fetchCountries(searchEl.value.trim()).then(data => {
    if (data.length > 10) {
      Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
    }
    if (data.length > 2 && data.length < 10) {
      renderListMarkup(data)
    }
    if (data.length === 1) {
      renderCountryMarkup(data)
    }
    // console.log(data.length)
  })
}

// function renderListMarkup(arrayOfCountries) {

//   arrayOfCountries.map(coutry => {
//   return <li></li>
// })
//   // contriesList
// }


// function renderCountryMarkup(country) {

// }