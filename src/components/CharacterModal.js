import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const CharacterModal = ({ character, closeModal, isOpen }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} className="character-modal" overlayClassName="character-modal-overlay">
      <button onClick={closeModal} className="modal-close-button">Close</button>
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
          <p>Species: {character.species}</p>
        </div>
      )}
    </Modal>
  );
};

export default CharacterModal;

