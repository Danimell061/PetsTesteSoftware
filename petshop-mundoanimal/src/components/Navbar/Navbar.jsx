import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { getUserLogged } from '../../services/userServices.js';
import Modal from '../Modal/Modal';
import EditProfileForm from '../../pages/Clientes/components/EditProfile.jsx'; // Caminho que você mostrou na imagem
import './Navbar.css';
import logo from '../../assets/logo.png';

export default function Navbar({ searchTerm, setSearchTerm }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (Cookies.get("token")) {
        try {
          const response = await getUserLogged();
          setUser(response.data);
        } catch (error) {
          console.error("Erro ao buscar dados do usuário:", error);
          handleLogout();
        }
      }
    };
    fetchUserData();
  }, []);

  const handleLogout = () => {
    Cookies.remove('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  // Função simplificada: apenas atualiza o estado local com os dados novos vindos do formulário
  const handleProfileUpdate = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  return (
    <>
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
            Olá, {user ? user.name : 'Visitante'} &#x25BC;
          </button>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <button
                onClick={() => {
                  setIsEditModalOpen(true);
                  setIsDropdownOpen(false);
                }}
                className="dropdown-item"
              >
                Editar Perfil
              </button>
              {user && (user.role === 'admin' || user.role === 'funcionario') && (
                <button onClick={() => navigate('/funcionario')} className="dropdown-item">
                  Painel Funcionário
                </button>
              )}
              <div className="dropdown-divider"></div>
              <button onClick={handleLogout} className="dropdown-item logout">
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* A chamada para o Modal e o Formulário */}
      {isEditModalOpen && user && (
        <Modal onClose={() => setIsEditModalOpen(false)}>
          <EditProfileForm
            currentUser={user}
            onUpdate={handleProfileUpdate}
            onClose={() => setIsEditModalOpen(false)}
          />
        </Modal>
      )}
    </>
  );
}