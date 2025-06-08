import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import Cookies from 'js-cookie';

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove('token');
    localStorage.removeItem('user'); // Limpa também o user do localStorage por segurança
    navigate('/');
  };

  return (
    <aside className="sidebar">
      <div> {/* Agrupa a parte de cima */}
        <div className="sidebar-header">
          <h3>Painel</h3>
        </div>
        <nav className="sidebar-nav">
          <NavLink to="/funcionario/clientes" className="sidebar-link">
            Usuários
          </NavLink>
          <NavLink to="/funcionario/pets" className="sidebar-link">
            Pets
          </NavLink>
        </nav>
      </div>

      <div className="sidebar-footer">
        <button onClick={handleLogout} className="logout-btn">
          Sair
        </button>
        <button onClick={() => navigate('/cliente')} className="view-client-btn">
          Visão Cliente
        </button>
      </div>
    </aside>
  );
}