import Notiflix from 'notiflix';

export default function fetchCountries(name) {
  const BASE_URL = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  return fetch(BASE_URL)
    .then(response => {
    if (!response.ok) {
      throw new Error(response.status)
    }
    return response.json()
    })
    .catch(error => {
      Notiflix.Notify.failure("Oops, there is no country with that name");
  })
}