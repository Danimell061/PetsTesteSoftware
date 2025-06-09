// src/components/pets/PetCard.jsx
import React from 'react';
import './PetCard.css';

// Recebe agora apenas onDelete e onEdit
export default function PetCard({ pet, ownerName, onEdit, onDelete }) {
  return (
    <div className="pet-card">
      <img
        src={pet.photo}
        alt={`Foto de ${pet.name}`}
        className="pet-photo"
      />
      <div className="pet-info">
        <h3>{pet.name}</h3>
        {ownerName && <p><strong>Dono:</strong> {ownerName}</p>}
        <p><strong>Espécie:</strong> {pet.type}</p>
        <p><strong>Raça:</strong> {pet.breed || 'Não informada'}</p>
        <p><strong>Idade:</strong> {pet.age}</p>
      </div>
      <div className="pet-actions">
        <button
          className="edit-btn"
          onClick={() => onEdit(pet)}
        >
          Editar
        </button>
        <button
          className="delete-btn"
          onClick={() => onDelete(pet._id, pet.name)}
        >
          Excluir
        </button>
      </div>
    </div>
  );
}
