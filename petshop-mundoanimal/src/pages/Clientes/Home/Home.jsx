import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2'; // 1. Importe o Swal
import { getUserPets, deletePet } from '../../../services/petServices.js'; // 1. Importe o deletePetService

// Imports dos componentes...
import Navbar from '../../../components/Navbar/Navbar';
import PetCard from '../../../components/Petcard/Petcard';
import Modal from '../../../components/Modal/Modal';
import RegisterPetForm from '../../../components/RegisterPet/RegisterPet';
import './HomePage.css';
import '../../../../styles/Global.css';

export default function PetsPage() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  useEffect(() => {
    const fetchUserPets = async () => {
      try {
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
  }, []);

  // 2. Crie a função para lidar com a exclusão
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
        // Remove o pet da lista na tela
        setPets(prevPets => prevPets.filter(p => p._id !== petId));
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


  const filteredPets = pets.filter(pet =>
    pet?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addPet = (novoPet) => {
    setPets(prevPets => [novoPet, ...prevPets]);
  };

  if (loading) { /* ... */ }
  if (error) { /* ... */ }
  
  return (
    <div className="page-container">
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <main className="content-container">
        <div className="header-section">
          <h1>Meus Pets</h1>
          <button className="register-btn" onClick={() => setIsModalOpen(true)}>
            + Registrar Novo Pet
          </button>
        </div>

        <div className="pet-list">
          {pets.length === 0 ? (
            <div className="no-pets-message">
              <h2>🐾</h2>
              <p>Você ainda não possui pets registrados.</p>
            </div>
          ) : filteredPets.length === 0 ? (
            <div className="no-pets-message">
              <p>Nenhum pet encontrado com o nome "{searchTerm}".</p>
            </div>
          ) : (
            filteredPets.map(pet => (
              // 3. Passe a função handleDeletePet como a prop 'onDelete'
              <PetCard 
                key={pet._id} 
                pet={pet}
                onDelete={handleDeletePet} 
              />
            ))
          )}
        </div>
      </main>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <RegisterPetForm
            onAddPet={addPet}
            onClose={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
}