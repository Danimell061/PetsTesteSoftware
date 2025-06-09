import React, { useState, useEffect } from 'react';
import { getUserPets } from '../../../services/petServices.js'; // Ajuste o caminho se necessário

// Imports dos componentes...
import Navbar from '../../../components/Navbar/Navbar';
import PetCard from '../../../components/Petcard/Petcard';
import Modal from '../../../components/Modal/Modal';
import RegisterPetForm from '../../../components/RegisterPet/RegisterPet';
import './HomePage.css';
import '../../../../styles/Global.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function PetsPage() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate()
  
  useEffect(() => {
    const fetchUserPets = async () => {
      try {
        if(!Cookies.get('token')){
          navigate('/')
          return
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
  }, []);

  // CORREÇÃO 1: Usar 'pet.name' em vez de 'pet.nome'
  const filteredPets = pets.filter(pet =>
    pet?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addPet = (novoPet) => {
    setPets(prevPets => [novoPet, ...prevPets]);
  };

  if (loading) {
    return <div>Carregando seus pets...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  
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
              // CORREÇÃO 2: Usar 'pet._id' como key, que é o id do MongoDB
              <PetCard key={pet._id} pet={pet} />
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