import React, { useState, useEffect } from 'react';
import { getAllPets } from '../../../../services/petServices'; // Ajuste o caminho para o seu arquivo de serviços
import PetCard from '../../../../components/Petcard/Petcard';
import './ListaPetsFuncionario.css'; // Crie este arquivo se necessário

export default function ListaPetsFuncionario() {
  // Estados para os dados, carregamento e erros
  const [allPets, setAllPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // useEffect para buscar os dados da API quando o componente carregar
  useEffect(() => {
    const fetchAllPetsData = async () => {
      try {
        const response = await getAllPets();
        setAllPets(response.data); // Armazena a lista de pets no estado
        setError(null);
      } catch (err) {
        console.error("Erro ao buscar todos os pets:", err);
        setError("Não foi possível carregar a lista de pets.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllPetsData();
  }, []); // O array vazio [] garante que rode apenas uma vez

  // Filtra os pets pelo nome do pet OU pelo nome do dono
  const filteredPets = allPets.filter(pet =>
    // CORREÇÃO: Usando os nomes corretos da API (pet.name e pet.user.name)
    pet?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pet?.user?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="view-container"><h2>Carregando todos os pets...</h2></div>;
  }

  if (error) {
    return <div className="view-container error-message"><h2>{error}</h2></div>;
  }

  return (
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
              key={pet._id} // CORREÇÃO: Usando _id do MongoDB
              pet={pet} 
              // CORREÇÃO: Passando o nome do dono a partir de pet.user.name
              ownerName={pet.user?.name} 
            />
          ))
        ) : (
          <p className="no-results-message">Nenhum pet encontrado.</p>
        )}
      </div>
    </div>
  );
}