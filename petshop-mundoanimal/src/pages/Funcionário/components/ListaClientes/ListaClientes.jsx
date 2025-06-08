import React, { useState } from 'react'; // Importe useState
import './ListaClientes.css';

const mockClientes = [
];

export default function ListaClientes() {
  // NOVO: Estado para o termo de busca
  const [searchTerm, setSearchTerm] = useState('');

  // NOVO: Filtra os clientes com base no termo de busca
  const filteredClientes = mockClientes.filter(cliente =>
    cliente.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="view-container">
      {/* NOVO: Container para o título e a busca */}
      <div className="view-header">
        <h1>Lista de Clientes</h1>
        <input
          type="text"
          placeholder="Pesquisar cliente..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="clientes-table">
        <div className="clientes-header">
          <span>ID do Cliente</span>
          <span>Nome</span>
          <span>Ações</span>
        </div>
        {/* ALTERADO: Mapeia a lista filtrada */}
        {filteredClientes.map((cliente) => (
          <div key={cliente.id} className="cliente-row">
            <span>{cliente.id}</span>
            <span>{cliente.nome}</span>
            <div className="cliente-actions">
              <button className="btn-alterar">Alterar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}