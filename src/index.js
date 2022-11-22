import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

let getEl = selector => document.querySelector(selector);

getEl('#search-box').addEventListener(
  'input',
  debounce(onSearch, DEBOUNCE_DELAY)
);

function onSearch(e) {
  e.preventDefault();
  const inputData = getEl('#search-box').value.trim();
  if (inputData === '') {
    return clearInput();
  }
  fetchCountries(inputData)
    .then(renderCountriesList)
    .catch(error => console.log(error));
}

function clearInput() {
  getEl('.country-list').innerHTML = '';
  getEl('.country-info').innerHTML = '';
}

function renderCountriesList(data) {
  console.log(data);
  if (data.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (data.length === 1) {
    getEl('.country-info').innerHTML = renderCountryInfo(data[0]);
    getEl('.country-list').innerHTML = '';
  } else {
    const list = data.map(country => renderCountryList(country)).join('');
    getEl('.country-list').insertAdjacentHTML('beforeend', list);
    getEl('.country-info').innerHTML = '';
  }
}

function renderCountryList({ name, flags }) {
  return `
    <li class="country-list__item">
        <img src=${flags.svg} alt="${name.official}" width=80px>
        <h2 class="country-list__name">${name.official}</h2>
    </li>
    `;
}

function renderCountryInfo({ name, capital, population, flags, languages }) {
  return `
    <div class="country">
        <div class="country__title">
            <img class="country__img" src=${flags.svg} alt="${
    name.official
  }" width=200px>
            <h2 class="country__name">${name.official}</h2>
        </div>
        <div class="info">
            <p class="capital"><span class="text">Capital</span>: ${capital}</p>
            <p class="population"><span class="text">Population</span>: ${population}</p>
            <p class="languages"><span class="text">Languages</span>: ${Object.values(
              languages
            )}</p>
        </div>
    </div>
    `;
}
