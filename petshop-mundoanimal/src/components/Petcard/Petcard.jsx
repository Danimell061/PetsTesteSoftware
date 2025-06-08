import React from 'react';
import './PetCard.css';
import Swal from 'sweetalert2';

export default function PetCard({ pet, ownerName }) {
  const handleClick = () => {
    Swal.fire({
      title: "Tem certeza?",
      text: "Você não poderá reverter isso!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#60a5fa",
      cancelButtonColor: "#f87171",
      confirmButtonText: "Sim, excluir!",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          confirmButtonColor: "#60a5fa",
          title: "Excluído!",
          text: "Seu pet foi excluído com sucesso.",
          icon: "success"
        });
      }
    });
  }
  
  return (
    <div className="pet-card">
      <img
        // ANTES: pet.foto | DEPOIS: pet.photo
        src={pet.photo} 
        // ANTES: pet.nome | DEPOIS: pet.name
        alt={`Foto de ${pet.name}`} 
        className="pet-photo"
      />
      <div className="pet-info">
        {/* ANTES: pet.nome | DEPOIS: pet.name */}
        <h3>{pet.name}</h3> 
        {ownerName && <p><strong>Dono:</strong> {ownerName}</p>}
        {/* ANTES: pet.especie | DEPOIS: pet.type */}
        <p><strong>Espécie:</strong> {pet.type}</p>
        {/* ANTES: pet.raca | DEPOIS: pet.breed */}
        <p><strong>Raça:</strong> {pet.breed || 'Não informada'}</p> {/* Adicionado fallback caso a raça seja opcional */}
        {/* ANTES: pet.idade | DEPOIS: pet.age */}
        <p><strong>Idade:</strong> {pet.age}</p> 
      </div>
      <div className="pet-actions">
        <button className="edit-btn">Editar</button>
        <button className="delete-btn" onClick={handleClick}>Excluir</button>
      </div>
    </div>
  );
}