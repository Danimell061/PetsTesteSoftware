import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Welcome.css';
import '../../../styles/Global.css';

export default function WelcomePage() {
  const navigate = useNavigate(); 

  return (
    <div className="welcome-container">
      <header className="welcome-header">
        <img
          src="https://cdn-icons-png.flaticon.com/512/616/616408.png"
          alt="Pata de animal"
          className="paw-icon"
        />
        <h1 className="welcome-title">Mundo Animal</h1>
      </header>

      <div className="welcome-card">
        <h2 className="welcome-subtitle">Bem-vindo ao sistema do pet shop</h2>
        <p className="welcome-text">Escolha como deseja acessar:</p>

        <div className="welcome-buttons">
          <button className="btn-cliente" onClick={() => {
              navigate('/login', { state: { tipoUsuario: 'cliente'}})
            }}>
            Login Cliente
          </button>
          <button className="btn-funcionario" onClick={() => {
              navigate('/login', { state: { tipoUsuario: 'funcionario'}})
            }}>
            Login Funcionário
          </button>
        </div>
      </div>
    </div>
  );
}
