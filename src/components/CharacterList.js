import React, { useState, useEffect } from 'react';
import { fetchCharacters } from '../api';
import CharacterCard from './CharacterCard';
import Loader from './Loader';
import Pagination from './Pagination';
import SearchFilter from './SearchFilter';

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    setLoading(true);
    fetchCharacters(page)
      .then((response) => {
        let results = response.data.results;
        if (searchQuery) {
          results = results.filter((character) =>
            character.name.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
        if (filter) {
          results = results.filter((character) => {
            // Filter logic based on selected filter
            // Example: Assume additional data fetching logic to get filter values
            // This example assumes filtering by species as an example
            if (filter === 'species') {
              // Fetch species data and filter characters by species
              return character.species.length > 0; // Simplified example
            }
            return true;
          });
        }
        setCharacters(results);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [page, searchQuery, filter]);

  if (loading) return <Loader />;
  if (error) return <div>Error fetching data</div>;

  return (
    <div>
      <SearchFilter setSearchQuery={setSearchQuery} setFilter={setFilter} />
      <div className="character-list">
        {characters.map((character) => (
          <CharacterCard key={character.name} character={character} />
        ))}
      </div>
      <Pagination page={page} setPage={setPage} />
    </div>
  );
};

export default CharacterList;
