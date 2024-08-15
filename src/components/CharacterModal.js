// src/components/CharacterModal.js
import React from 'react';
import Modal from 'react-modal';

const CharacterModal = ({ character, closeModal }) => {
  return (
    <Modal isOpen={!!character} onRequestClose={closeModal}>
      <button onClick={closeModal}>Close</button>
      {character && (
        <div>
          <h2>{character.name}</h2>
          <p>Height: {character.height}</p>
          <p>Mass: {character.mass}</p>
          <p>Hair Color: {character.hair_color}</p>
          <p>Skin Color: {character.skin_color}</p>
          <p>Eye Color: {character.eye_color}</p>
          <p>Birth Year: {character.birth_year}</p>
          <p>Gender: {character.gender}</p>
        </div>
      )}
    </Modal>
  );
};

export default CharacterModal;
