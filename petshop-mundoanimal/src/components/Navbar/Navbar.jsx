import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/logo.png';
import Cookies from 'js-cookie';

export default function Navbar({ searchTerm, setSearchTerm }) {
  // Hook para controlar a visibilidade do dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Lógica de logout (limpar tokens, etc.) pode ser adicionada aqui
    Cookies.remove('token')
    navigate('/'); // Redireciona para a página inicial/welcome
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img src={logo} alt="Logo Mundo Animal" className="navbar-logo w-[75px]" />
      </div>

      <div className="navbar-search">
        <input
          type="text"
          placeholder="Pesquisar por nome..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* A área do usuário agora é relativa para posicionar o dropdown */}
      <div className="navbar-user">
        <button
          className="user-button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          Olá, Cliente &#x25BC; {/* Adiciona uma seta para baixo */}
        </button>

        {/* Renderização condicional do dropdown */}
        {isDropdownOpen && (
          <div className="dropdown-menu">
            <button onClick={handleLogout} className="dropdown-item">
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}