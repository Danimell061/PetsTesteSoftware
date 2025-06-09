import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { getUserPets, deletePet } from '../../../services/petServices.js';
import Navbar from '../../../components/Navbar/Navbar';
import PetCard from '../../../components/Petcard/Petcard';
import Modal from '../../../components/Modal/Modal';
import RegisterPetForm from '../../../components/RegisterPet/RegisterPet';
import EditPetForm from '../../Funcionário/components/EditPetForm.jsx';
import './HomePage.css';
import '../../../../styles/Global.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function PetsPage() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  // Estados para edição
  const [petToEdit, setPetToEdit] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserPets = async () => {
      try {
        if (!Cookies.get('token')) {
          navigate('/');
          return;
        }
        setLoading(true);
        const response = await getUserPets();
        setPets(response.data);
        setError(null);
      } catch (err) {
        console.error("Erro ao buscar os pets:", err);
        setError("Não foi possível carregar os pets. Tente novamente mais tarde.");
        setPets([]);
      } finally {
        setLoading(false);
      }
    };
    fetchUserPets();
  }, [navigate]);

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
        setPets(prev => prev.filter(p => p._id !== petId));
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
    setPets(current => current.map(p => p._id === updatedPet._id ? updatedPet : p));
  };

  // Cadastro de novo pet
  const addPet = novoPet => {
    setPets(prev => [novoPet, ...prev]);
  };

  const filteredPets = pets.filter(pet =>
    pet.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p>Carregando...</p>;
  if (error)   return <p className="error">{error}</p>;

  return (
    <div className="page-container">
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <main className="content-container">
        <div className="header-section">
          <h1>Meus Pets</h1>
          <button className="register-btn" onClick={() => setIsRegisterModalOpen(true)}>
            + Registrar Novo Pet
          </button>
        </div>

        <div className="pet-list">
          {filteredPets.length === 0 ? (
            <p className="no-pets-message">
              {pets.length === 0
                ? 'Você ainda não possui pets registrados.'
                : `Nenhum pet encontrado com o nome "${searchTerm}".`}
            </p>
          ) : (
            filteredPets.map(pet => (
              <PetCard
                key={pet._id}
                pet={pet}
                onDelete={handleDeletePet}
                onEdit={handleEditPet}
              />
            ))
          )}
        </div>
      </main>

      {/* Modal de cadastro */}
      {isRegisterModalOpen && (
        <Modal onClose={() => setIsRegisterModalOpen(false)}>
          <RegisterPetForm
            onAddPet={addPet}
            onClose={() => setIsRegisterModalOpen(false)}
          />
        </Modal>
      )}

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
