import React from 'react';
import './Navbar.css';

// O componente recebe o termo de busca e a função para atualizá-lo
export default function Navbar({ searchTerm, setSearchTerm }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h2>Mundo Animal</h2>
      </div>
      <div className="navbar-search">
        <input
          type="text"
          placeholder="Pesquisar por nome..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="navbar-user">
        <span>Olá, Cliente</span>
      </div>
    </nav>
  );
}