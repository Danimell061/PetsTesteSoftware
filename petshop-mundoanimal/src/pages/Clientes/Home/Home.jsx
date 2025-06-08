import React, { useState } from 'react';

// Bloco de imports corrigido com base na sua estrutura
import Navbar from '../../../components/Navbar/Navbar';
import PetCard from '../../../components/Petcard/Petcard';
import Modal from '../../../components/Modal/Modal';
import RegisterPetForm from '../../../components/RegisterPet/RegisterPet';
import './HomePage.css';
import '../../../../styles/Global.css';

export default function PetsPage() {
  const [pets, setPets] = useState([
    { id: 1, nome: 'Rex', especie: 'Cachorro', raca: 'Labrador', idade: '3 anos', foto: 'https://placehold.co/80x80/FCD34D/4A2E0A?text=R' },
    { id: 2, nome: 'Mimi', especie: 'Gato', raca: 'Persa', idade: '2 anos', foto: 'https://placehold.co/80x80/34D399/FFFFFF?text=M' }
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredPets = pets.filter(pet =>
    pet.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addPet = (novoPet) => {
    setPets(prevPets => [novoPet, ...prevPets]);
  };

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
              <PetCard key={pet.id} pet={pet} />
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