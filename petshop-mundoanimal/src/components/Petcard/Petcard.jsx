import React from 'react';
import './PetCard.css';

// Adicione ownerName às props
export default function PetCard({ pet, ownerName }) {
  return (
    <div className="pet-card">
      <img
        src={pet.foto}
        alt={`Foto de ${pet.nome}`}
        className="pet-photo"
      />
      <div className="pet-info">
        <h3>{pet.nome}</h3>
        {/* Renderiza o nome do dono se a prop for passada */}
        {ownerName && <p><strong>Dono:</strong> {ownerName}</p>}
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