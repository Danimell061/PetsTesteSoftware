import React from 'react';
import './PetCard.css';

// Recebe os dados do pet como "props"
export default function PetCard({ pet }) {
  return (
    <div className="pet-card">
      <img
        src={pet.foto}
        alt={`Foto de ${pet.nome}`}
        className="pet-photo"
      />
      <div className="pet-info">
        <h3>{pet.nome}</h3>
        <p><strong>Espécie:</strong> {pet.especie}</p>
        <p><strong>Raça:</strong> {pet.raca}</p>
        <p><strong>Idade:</strong> {pet.idade}</p>
      </div>
      <div className="pet-actions">
        <button className="edit-btn">Editar</button>
        <button className="delete-btn">Excluir</button>
      </div>
    </div>
  );
}