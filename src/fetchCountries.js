import Notiflix from 'notiflix';

export { fetchCountries };

function fetchCountries(name) {
  const url = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`;
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        Notiflix.Notify.failure('Oops, there is no country with that name!');
      }
      return response;
    })
    .then(data => data.json());
}
