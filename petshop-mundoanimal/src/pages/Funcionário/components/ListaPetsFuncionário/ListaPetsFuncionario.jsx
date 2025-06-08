import React, { useState } from 'react'; // Importe useState
import PetCard from '../../../../components/Petcard/Petcard';

const mockAllPets = [
    
];

export default function ListaPetsFuncionario() {
  // NOVO: Estado para o termo de busca
  const [searchTerm, setSearchTerm] = useState('');

  // NOVO: Filtra os pets pelo nome do pet ou do dono
  const filteredPets = mockAllPets.filter(pet =>
    pet.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pet.ownerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    // Usamos a mesma classe genérica .view-container
    <div className="view-container">
      <div className="view-header">
        <h1>Todos os Pets Cadastrados</h1>
        <input
          type="text"
          placeholder="Pesquisar pet ou dono..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* ALTERADO: Mapeia a lista filtrada */}
        {filteredPets.map(pet => (
          <PetCard key={pet.id} pet={pet} ownerName={pet.ownerName} />
        ))}
      </div>
    </div>
  )
}