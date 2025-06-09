import React from 'react';
import './PetCard.css';
// Não precisamos mais do Swal aqui

// Adicione 'onDelete' às props
export default function PetCard({ pet, ownerName, onDelete }) {
  
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
        <button className="edit-btn">Editar</button>
        {/* O botão agora chama a função 'onDelete' recebida via props, passando o ID e o nome do pet */}
        <button className="delete-btn" onClick={() => onDelete(pet._id, pet.name)}>
          Excluir
        </button>
      </div>
    </div>
  );
}