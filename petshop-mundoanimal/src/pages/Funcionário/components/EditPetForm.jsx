import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { getAllPets, deletePet, getUserLogged } from '../../../../services/petServices.js'; // Ajuste os serviços
import PetCard from '../../../../components/Petcard/Petcard';
import Modal from '../../../../components/Modal/Modal';
import EditPetForm from '../components/EditPetForm';
import './ListaPetsFuncionario.css';

export default function ListaPetsFuncionario() {
  const [allPets, setAllPets] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // --- ESTADOS PARA O MODAL DE EDIÇÃO ---
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingPet, setEditingPet] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [petsResponse, userResponse] = await Promise.all([
          getAllPets(),
          getUserLogged()
        ]);
        setAllPets(petsResponse.data);
        setLoggedInUser(userResponse.data);
      } catch (err) {
        setError("Não foi possível carregar os dados.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const canPerformAction = () => {
    if (!loggedInUser) return false;
    return loggedInUser.role === 'admin' || loggedInUser.role === 'funcionario';
  };

  const handleDeletePet = async (petId, petName) => {
    // ... lógica de exclusão que já funciona
  };

  // --- FUNÇÕES PARA CONTROLAR O MODAL ---
  const handleOpenEditModal = (pet) => {
    setEditingPet(pet); // Guarda qual pet estamos editando
    setIsEditModalOpen(true); // Abre o modal
  };
  
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingPet(null);
  };
  
  const handleUpdateSuccess = (updatedPet) => {
    // Atualiza a lista na tela sem precisar recarregar
    setAllPets(prevPets => prevPets.map(p => p._id === updatedPet._id ? updatedPet : p));
  };

  const filteredPets = allPets.filter(pet =>
    pet?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pet?.user?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) { return <div className="view-container"><h2>Carregando todos os pets...</h2></div>; }
  if (error) { return <div className="view-container error-message"><h2>{error}</h2></div>; }

  return (
    <>
      <div className="view-container">
        <div className="view-header">
          <h1>Todos os Pets Cadastrados</h1>
          <input
            type="text"
            placeholder="Pesquisar por nome do pet ou do dono..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="pet-list-funcionario">
          {filteredPets.length > 0 ? (
            filteredPets.map(pet => (
              <PetCard 
                key={pet._id}
                pet={pet} 
                ownerName={pet.user?.name} 
                // Passando as funções para o PetCard
                onDelete={canPerformAction() ? handleDeletePet : null}
                onEdit={canPerformAction() ? handleOpenEditModal : null}
              />
            ))
          ) : (
            <p className="no-results-message">Nenhum pet encontrado.</p>
          )}
        </div>
      </div>

      {/* RENDERIZAÇÃO CONDICIONAL DO MODAL DE EDIÇÃO */}
      {isEditModalOpen && (
        <Modal onClose={handleCloseEditModal}>
            <EditPetForm
                petToEdit={editingPet}
                onUpdateSuccess={handleUpdateSuccess}
                onClose={handleCloseEditModal}
            />
        </Modal>
      )}
    </>
  );
}