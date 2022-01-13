export default function fetchCountries(name) {
  // const BASE_URL = `https://restcountries.com/v3.1/name/${name}`
  const BASE_URL_field = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  // const BASE_URL2 = 'https://restcountries.com/v3.1/name/peru'
  // const BASE_URL3 = 'https://restcountries.com/v3.1/name/united'
  return fetch(BASE_URL_field).then(response => response.json())
}