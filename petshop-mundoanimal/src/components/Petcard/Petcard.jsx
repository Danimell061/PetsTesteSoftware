import React from 'react';
import './PetCard.css';
import Swal from 'sweetalert2';

// Adicione ownerName às props
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
        <button className="delete-btn" onClick={handleClick}>Excluir</button>
      </div>
    </div>
  );
}