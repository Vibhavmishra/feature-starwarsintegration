// src/components/SearchFilter.js
import React, { useState } from 'react';

const SearchFilter = ({ setSearchQuery, setFilter }) => {
  const [search, setSearch] = useState('');
  const [filter, setFilterLocal] = useState('');

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterLocal(e.target.value);
    setFilter(e.target.value);
  };

  return (
    <div className="search-filter">
      <input type="text" placeholder="Search by name" value={search} onChange={handleSearchChange} />
      <select name="filter" value={filter} onChange={handleFilterChange}>
        <option value="">Select Filter</option>
        <option value="homeworld">Homeworld</option>
        <option value="films">Films</option>
        <option value="species">Species</option>
      </select>
    </div>
  );
};

export default SearchFilter;
