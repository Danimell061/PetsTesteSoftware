import React, { useState } from 'react';
import Navbar from '../../../components/Navbar/Navbar';
import PetCard from '../../../components/Petcard/Petcard';
import './Homepage.css';
import '../../../../styles/Global.css';

export default function PetsPage() {
  // Estado para armazenar os pets e o termo de busca
  const [pets, setPets] = useState([
    { id: 1, nome: 'Rex', especie: 'Cachorro', raca: 'Labrador', idade: '3 anos', foto: 'https://placehold.co/80x80/FCD34D/4A2E0A?text=R' },
    { id: 2, nome: 'Mimi', especie: 'Gato', raca: 'Persa', idade: '2 anos', foto: 'https://placehold.co/80x80/34D399/FFFFFF?text=M' }
  ]);
  const [searchTerm, setSearchTerm] = useState('');

  // Filtra os pets com base no termo de busca (ignorando maiúsculas/minúsculas)
  const filteredPets = pets.filter(pet =>
    pet.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-container">
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <main className="content-container">
        <div className="header-section">
          <h1>Meus Pets</h1>
          <button className="register-btn">+ Registrar Novo Pet</button>
        </div>

        <div className="pet-list">
          {pets.length === 0 ? (
            // Mensagem se não houver NENHUM pet cadastrado
            <div className="no-pets-message">
              <h2>🐾</h2>
              <p>Você ainda não possui pets registrados.</p>
              <p>Clique em "Registrar Novo Pet" para começar!</p>
            </div>
          ) : filteredPets.length === 0 ? (
            // Mensagem se a busca não retornar resultados
             <div className="no-pets-message">
              <p>Nenhum pet encontrado com o nome "{searchTerm}".</p>
            </div>
          ) : (
            // Mapeia e exibe a lista de pets filtrados
            filteredPets.map(pet => (
              <PetCard key={pet.id} pet={pet} />
            ))
          )}
        </div>
      </main>
    </div>
  );
}