import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';
import '../../../styles/Global.css';
import { cadastrarService } from '../../services/userServices';
import Cookies from 'js-cookie';

export default function RegisterPage() {
  const navigate = useNavigate();
  
  // Estado para guardar os dados do formulário
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
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
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Validação: verificar se as senhas coincidem
    if (formData.password !== formData.confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }
    // Lógica de cadastro (ex: chamada de API)
    console.log("Dados do formulário:", formData);
    const response = await cadastrarService(formData)
    const token = response.data
    Cookies.set('token', token)

    // Redireciona para a home após o "cadastro"
    navigate('/cliente'); 
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
            name="name"
            placeholder="Nome Completo"
            value={formData.name}
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
            name="password"
            placeholder="Senha"
            value={formData.password}
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