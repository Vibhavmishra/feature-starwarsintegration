import React, { useState, useEffect } from 'react';
import CharacterModal from './CharacterModal';
import { fetchCharacterDetails, fetchAdditionalData } from '../api';

const CharacterCard = ({ character }) => {
  const [details, setDetails] = useState(null);
  const [speciesColor, setSpeciesColor] = useState('#fff');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchCharacterDetails(character.url).then((response) => {
      const characterDetails = response.data;
      setDetails(characterDetails);

      if (characterDetails.species.length > 0) {
        fetchAdditionalData(characterDetails.species[0]).then((speciesResponse) => {
          const speciesData = speciesResponse.data;
          // Set color based on species or skin color
          setSpeciesColor(speciesData.name === 'Human' ? characterDetails.skin_color : getSpeciesColor(speciesData.name));
        });
      } else {
        setSpeciesColor(characterDetails.skin_color);
      }
    });
  }, [character.url]);

  const handleCardClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const getSpeciesColor = (species) => {
    // Define species color mapping
    const speciesColors = {
      Human: '#f5e6cc',
      Droid: '#c0c0c0',
      Wookiee: '#a52a2a',
      
    };
    return speciesColors[species] || '#fff'; // Default color if species not in mapping
  };

  return (
    <div className="character-card" onClick={handleCardClick} style={{ backgroundColor: speciesColor }}>
      <img src={`https://starwars-visualguide.com/assets/img/characters/${character.url.split('/')[5]}.jpg`} alt={character.name} />
      <h3>{character.name}</h3>
      <CharacterModal character={details} closeModal={closeModal} isOpen={showModal} />
    </div>
  );
};

export default CharacterCard;