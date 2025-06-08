import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; // Importe useNavigate
import './Sidebar.css';

export default function Sidebar() {
  const navigate = useNavigate(); // Inicialize o hook

  const handleLogout = () => {
    // Aqui você poderia adicionar lógicas de limpeza de sessão, etc.
    navigate('/'); // Redireciona para a página de boas-vindas
  };

  return (
    // A tag <aside> agora tem a classe .sidebar-container
    <aside className="sidebar">
      <div> {/* Este div agrupa a parte de cima */}
        <div className="sidebar-header">
          <h3>Painel</h3>
        </div>
        <nav className="sidebar-nav">
          <NavLink to="/funcionario/clientes" className="sidebar-link">
            Clientes
          </NavLink>
          <NavLink to="/funcionario/pets" className="sidebar-link">
            Pets
          </NavLink>
        </nav>
      </div>

      {/* NOVO: Rodapé da sidebar com o botão de sair */}
      <div className="sidebar-footer">
        <button onClick={handleLogout} className="logout-btn">
          Sair
        </button>
      </div>
    </aside>
  );
}