import React, { useState } from 'react';
import { updateUserService } from '../../../services/userServices'; // Ajuste o caminho para seus serviços
import Swal from 'sweetalert2';
import './EditProfile.css';

// O componente continua recebendo as 4 props, incluindo 'onDelete'
export default function EditProfileForm({ currentUser, onUpdate, onClose, onDelete }) {
  
  const [formData, setFormData] = useState({
    name: currentUser.name || '',
    email: currentUser.email || '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await updateUserService(formData);
      onUpdate(response.data);
      
      Swal.fire({
        title: "Sucesso!",
        text: "Seu perfil foi atualizado.",
        icon: "success",
        confirmButtonColor: "#3b82f6"
      });
      
      onClose();

    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      Swal.fire({
        title: "Erro!",
        text: "Não foi possível atualizar o perfil.",
        icon: "error",
        confirmButtonColor: "#3b82f6"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // NOVO: Função para mostrar o pop-up de confirmação de exclusão
  const handleDeleteClick = async () => {
    const result = await Swal.fire({
      title: "Você tem certeza?",
      text: "Sua conta será excluída permanentemente. Esta ação não pode ser revertida.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3b82f6",
      confirmButtonText: "Sim, excluir minha conta!",
      cancelButtonText: "Cancelar"
    });

    // Se o usuário confirmar no pop-up...
    if (result.isConfirmed) {
      // ...nós chamamos a função 'onDelete' que veio da Navbar.
      // A Navbar cuidará da chamada da API e do logout.
      onDelete();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="edit-profile-form">
      <h2>Editar Perfil</h2>
      
      <div className="form-group">
        <label htmlFor="name">Nome</label>
        <input 
          type="text" 
          id="name" 
          name="name"
          value={formData.name} 
          onChange={handleChange} 
          required 
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">E-mail</label>
        <input 
          type="email" 
          id="email" 
          name="email"
          value={formData.email} 
          onChange={handleChange} 
          required 
        />
      </div>

      <div className="form-group">
        <label>Senha</label>
        <p className="password-notice">A senha não pode ser alterada.</p>
      </div>

      <div className="form-actions">
        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
        </button>
      </div>
      
      <div className="delete-section">
        <div className="divider"></div>
        <button 
          type="button"
          className="delete-account-btn" 
          // O onClick agora chama nossa nova função de confirmação
          onClick={handleDeleteClick} 
        >
          Excluir Minha Conta
        </button>
      </div>
    </form>
  );
}