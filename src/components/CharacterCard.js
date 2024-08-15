// src/components/CharacterCard.js
import React, { useState, useEffect } from 'react';
import CharacterModal from './CharacterModal';
import { fetchCharacterDetails } from '../api';

const CharacterCard = ({ character }) => {
  const [details, setDetails] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchCharacterDetails(character.url).then((response) => {
      setDetails(response.data);
    });
  }, [character.url]);

  const handleCardClick = () => {
    setShowModal(true);
  };

  return (
    <div className="character-card" onClick={handleCardClick}>
      <img src={`https://starwars-visualguide.com/assets/img/characters/${character.url.split('/')[5]}.jpg`} alt={character.name} />
      <h3>{character.name}</h3>
      {showModal && <CharacterModal character={details} closeModal={() => setShowModal(false)} />}
    </div>
  );
};

export default CharacterCard;
