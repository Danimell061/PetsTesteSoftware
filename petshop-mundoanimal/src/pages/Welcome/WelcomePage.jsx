import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcome.css';
import '../../../styles/Global.css';
import logo from '../../assets/logo.png';

export default function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <header className="welcome-header">
        <img src={logo} alt="Logo Mundo Animal" className="welcome-logo" />
      </header>

      <div className="welcome-card">
        <h2 className="welcome-subtitle">Bem-vindo ao sistema do pet shop</h2>
        <p className="welcome-text">Escolha como deseja acessar:</p>

        <div className="welcome-buttons">
          <button
            className="btn-cliente"
            onClick={() => {
              navigate('/login', { state: { tipoUsuario: 'cliente' } });
            }}
          >
            Login Cliente
          </button>
          <button
            className="btn-funcionario"
            onClick={() => {
              navigate('/login', { state: { tipoUsuario: 'funcionario' } });
            }}
          >
            Login Funcionário
          </button>
        </div>

        <div className="signup-link">
          <p>
            Não tem uma conta?{' '}
            <span onClick={() => navigate('/register')}>
              Crie uma aqui
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}