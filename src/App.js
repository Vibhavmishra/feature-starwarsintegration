import React, { useState, useEffect } from 'react';
import CharacterCard from './components/CharacterCard';
import Loader from './components/Loader';
import Pagination from './components/Pagination';
import {
  fetchCharacters,
  fetchAllHomeworlds,
  fetchAllFilms,
  fetchAllSpecies
} from './api';
import './App.css';
import starWarsLogo from './assets/star-wars-logo.svg';

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    homeworld: '',
    film: '',
    species: ''
  });
  const [homeworlds, setHomeworlds] = useState([]);
  const [films, setFilms] = useState([]);
  const [species, setSpecies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [characterResponse, homeworldResponse, filmsResponse, speciesResponse] = await Promise.all([
        fetchCharacters(page),
        fetchAllHomeworlds(),
        fetchAllFilms(),
        fetchAllSpecies()
      ]);

      setCharacters(characterResponse.data.results);
      setHomeworlds(homeworldResponse);
      setFilms(filmsResponse);
      setSpecies(speciesResponse);
      setLoading(false);
    };

    fetchData();
  }, [page]);

  useEffect(() => {
    let filtered = characters;

    if (searchTerm) {
      filtered = filtered.filter((character) =>
        character.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.homeworld) {
      filtered = filtered.filter(
        (character) => character.homeworld === filters.homeworld
      );
    }

    if (filters.film) {
      filtered = filtered.filter((character) =>
        character.films.includes(filters.film)
      );
    }

    if (filters.species) {
      filtered = filtered.filter((character) =>
        character.species.includes(filters.species)
      );
    }

    setFilteredCharacters(filtered);
  }, [characters, searchTerm, filters]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value
    }));
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={starWarsLogo} alt="Star Wars Logo" className="App-logo" />
      </header>
      <h1>Star Wars Characters</h1>
      <div className="search-filter">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearch}
        />
        <select name="homeworld" value={filters.homeworld} onChange={handleFilterChange}>
          <option value="">Select Homeworld</option>
          {homeworlds.map((homeworld) => (
            <option key={homeworld.url} value={homeworld.url}>
              {homeworld.name}
            </option>
          ))}
        </select>
        <select name="film" value={filters.film} onChange={handleFilterChange}>
          <option value="">Select Film</option>
          {films.map((film) => (
            <option key={film.url} value={film.url}>
              {film.title}
            </option>
          ))}
        </select>
        <select name="species" value={filters.species} onChange={handleFilterChange}>
          <option value="">Select Species</option>
          {species.map((specie) => (
            <option key={specie.url} value={specie.url}>
              {specie.name}
            </option>
          ))}
        </select>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className="character-list">
          {filteredCharacters.map((character) => (
            <CharacterCard key={character.url} character={character} />
          ))}
        </div>
      )}
      <Pagination currentPage={page} onPageChange={setPage} />
    </div>
  );
};

export default App;
