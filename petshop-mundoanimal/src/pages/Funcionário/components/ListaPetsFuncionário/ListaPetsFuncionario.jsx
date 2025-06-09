// src/pages/ListaPetsFuncionario.jsx
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { getAllPets, deletePet } from '../../../../services/petServices.js';
import PetCard from '../../../../components/Petcard/Petcard';
import EditPetForm from '../../components/EditPetForm.jsx';
import Modal from '../../../../components/Modal/Modal';
import './ListaPetsFuncionario.css';

export default function ListaPetsFuncionario() {
  const [allPets, setAllPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Estados para edição
  const [petToEdit, setPetToEdit] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchAllPets = async () => {
      try {
        const response = await getAllPets();
        setAllPets(response.data);
        setError(null);
      } catch (err) {
        console.error("Erro ao buscar todos os pets:", err);
        setError("Não foi possível carregar a lista de pets.");
      } finally {
        setLoading(false);
      }
    };
    fetchAllPets();
  }, []);

  // Exclusão
  const handleDeletePet = async (petId, petName) => {
    const result = await Swal.fire({
      title: `Tem certeza que deseja excluir ${petName}?`,
      text: "Esta ação não pode ser revertida!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3b82f6",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Sim, excluir!",
      cancelButtonText: "Cancelar"
    });
    if (result.isConfirmed) {
      try {
        await deletePet(petId);
        setAllPets(prev => prev.filter(p => p._id !== petId));
        Swal.fire({
          title: "Excluído!",
          text: `O pet ${petName} foi excluído com sucesso.`,
          icon: "success",
          confirmButtonColor: "#3b82f6"
        });
      } catch (error) {
        console.error("Erro ao excluir pet:", error);
        Swal.fire({
          title: "Erro!",
          text: "Não foi possível excluir o pet.",
          icon: "error",
          confirmButtonColor: "#3b82f6"
        });
      }
    }
  };

  // Abertura do modal de edição
  const handleEditPet = pet => {
    setPetToEdit(pet);
    setIsEditModalOpen(true);
  };

  // Atualiza lista após edição
  const handleUpdateSuccess = updatedPet => {
    setAllPets(current => current.map(p => p._id === updatedPet._id ? updatedPet : p));
  };

  const filteredPets = allPets.filter(pet =>
    pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pet.user?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p>Carregando...</p>;
  if (error)   return <p className="error">{error}</p>;

  return (
    <div className="view-container">
      <div className="view-header">
        <h1>Todos os Pets Cadastrados</h1>
        <input
          type="text"
          placeholder="Pesquisar por nome do pet ou do dono..."
          className="search-input"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="pet-list-funcionario">
        {filteredPets.length === 0 ? (
          <p className="no-results-message">Nenhum pet encontrado.</p>
        ) : (
          filteredPets.map(pet => (
            <PetCard
              key={pet._id}
              pet={pet}
              ownerName={pet.user?.name}
              onDelete={handleDeletePet}
              onEdit={handleEditPet}
            />
          ))
        )}
      </div>

      {/* Modal de edição */}
      {isEditModalOpen && petToEdit && (
        <Modal onClose={() => setIsEditModalOpen(false)}>
          <EditPetForm
            petToEdit={petToEdit}
            onUpdateSuccess={handleUpdateSuccess}
            onClose={() => setIsEditModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
}
