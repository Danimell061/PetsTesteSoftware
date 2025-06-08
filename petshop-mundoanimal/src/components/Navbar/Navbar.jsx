import React, { useState, useEffect } from 'react'; // Importe useEffect
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { getUserLogged } from '../../services/userServices.js'; // Importe a nova função
import './Navbar.css';
import logo from '../../assets/logo.png'; // Importe o logo

export default function Navbar({ searchTerm, setSearchTerm }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState(null); // Estado para guardar o usuário vindo da API
  const navigate = useNavigate();

  // useEffect será executado uma vez, quando a Navbar carregar
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUserLogged();
        setUser(response.data); // Salva os dados do usuário no estado
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
        // Se der erro (ex: token inválido), desloga o usuário por segurança
        handleLogout(); 
      }
    };

    // Só busca os dados se existir um token
    if (Cookies.get("token")) {
      fetchUserData();
    }
  }, []); // O array vazio [] garante que rode só uma vez

  const handleLogout = () => {
    // Agora só precisamos remover o cookie
    Cookies.remove('token');
    // Removemos também o user do localStorage por garantia (limpeza)
    localStorage.removeItem('user');
    
    navigate('/'); 
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

      <div className="navbar-user">
        <button
          className="user-button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          {/* Usa o nome do estado 'user' para exibir o nome */}
          Olá, {user ? user.name : 'Visitante'} &#x25BC;
        </button>

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