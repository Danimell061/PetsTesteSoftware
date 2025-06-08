import React, { useState } from 'react'; // Importe useState
import PetCard from '../../../../components/Petcard/Petcard';

const mockAllPets = [
    { id: 1, nome: 'Rex', especie: 'Cachorro', raca: 'Labrador', idade: '3 anos', foto: 'https://placehold.co/80x80/FCD34D/4A2E0A?text=R', ownerName: 'João da Silva' },
    { id: 2, nome: 'Mimi', especie: 'Gato', raca: 'Persa', idade: '2 anos', foto: 'https://placehold.co/80x80/34D399/FFFFFF?text=M', ownerName: 'Maria Oliveira' },
    { id: 3, nome: 'Thor', especie: 'Cachorro', raca: 'Golden', idade: '5 anos', foto: 'https://placehold.co/80x80/f87171/FFFFFF?text=T', ownerName: 'Carlos Pereira' },
    { id: 4, nome: 'Luna', especie: 'Gato', raca: 'Siamês', idade: '1 ano', foto: 'https://placehold.co/80x80/60a5fa/FFFFFF?text=L', ownerName: 'João da Silva' }
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