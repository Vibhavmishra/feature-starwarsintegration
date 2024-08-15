import axios from 'axios';

const API_BASE_URL = 'https://swapi.dev/api';

export const fetchCharacters = (page = 1) => {
  return axios.get(`${API_BASE_URL}/people/?page=${page}`);
};

export const fetchCharacterDetails = (url) => {
    console.log(url, "ssss");
  return axios.get(url);
};