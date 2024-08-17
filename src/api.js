import axios from 'axios';

const BASE_URL = 'https://swapi.dev/api';

export const fetchCharacters = (page = 1) => {
  return axios.get(`${BASE_URL}/people/?page=${page}`);
};

export const fetchCharacterDetails = (url) => {
  return axios.get(url);
};

export const fetchAdditionalData = (url) => {
  return axios.get(url);
};

export const fetchAllHomeworlds = async () => {
  let url = `${BASE_URL}/planets/`;
  let homeworlds = [];
  while (url) {
    const response = await axios.get(url);
    homeworlds = [...homeworlds, ...response.data.results];
    url = response.data.next;
  }
  return homeworlds;
};

export const fetchAllFilms = async () => {
  const response = await axios.get(`${BASE_URL}/films/`);
  return response.data.results;
};

export const fetchAllSpecies = async () => {
  const response = await axios.get(`${BASE_URL}/species/`);
  return response.data.results;
};
