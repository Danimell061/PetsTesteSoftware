import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';
import '../../../styles/Global.css';

export default function RegisterPage() {
  const navigate = useNavigate();
  
  // Estado para guardar os dados do formulário
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: ''
  });

  // Função para atualizar o estado quando o usuário digita
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = (event) => {
    event.preventDefault();
    // Validação: verificar se as senhas coincidem
    if (formData.senha !== formData.confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }
    // Lógica de cadastro (ex: chamada de API)
    console.log("Dados do formulário:", formData);
    // Redireciona para a home após o "cadastro"
    navigate('/home'); 
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <button className="voltar-btn" onClick={() => navigate('/')} title="Voltar">
            &larr;
          </button>
          <h2>Criar Conta</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="nome"
            placeholder="Nome Completo"
            value={formData.nome}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="senha"
            placeholder="Senha"
            value={formData.senha}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmarSenha"
            placeholder="Confirmar Senha"
            value={formData.confirmarSenha}
            onChange={handleChange}
            required
          />
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}