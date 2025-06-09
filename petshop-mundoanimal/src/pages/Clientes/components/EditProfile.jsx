import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { updateUser, deleteUser } from '../../../services/userServices.js';
import './EditProfile.css';

export default function EditProfileForm({ currentUser, onUpdate, onClose }) {
  
  const [formData, setFormData] = useState({
    name: currentUser.name || '',
    email: currentUser.email || '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Chama a API para salvar as alterações
      await updateUser(currentUser._id, formData);
      
      // 2. Mostra o pop-up de sucesso
      await Swal.fire({
        title: "Sucesso!",
        text: "Seu perfil foi atualizado com sucesso.",
        icon: "success",
        showConfirmButton: true,        // GARANTE que o botão apareça
        confirmButtonText: 'Continuar', // DEFINE o texto do botão
        confirmButtonColor: "#3b82f6"
      });
      
      // 3. FORÇA O RECARREGAMENTO DA PÁGINA
      window.location.reload();

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

  const handleDeleteProfile = async () => {
    // ... A lógica de exclusão permanece a mesma e já funciona
    const result = await Swal.fire({
      title: `Tem certeza, ${currentUser.name}?`,
      text: "Sua conta será excluída permanentemente!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#3b82f6",
      confirmButtonText: "Sim, excluir",
      cancelButtonText: "Cancelar"
    });

    if (result.isConfirmed) {
      try {
        await deleteUser(currentUser._id);
        await Swal.fire({
          title: "Conta Excluída!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        Cookies.remove('token');
        localStorage.removeItem('user');
        navigate('/');
      } catch (error) {
        console.error("Erro ao excluir perfil:", error);
        Swal.fire("Erro", "Não foi possível excluir sua conta.", "error");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="edit-profile-form">
      <h2>Editar Perfil</h2>
      
      <div className="form-group">
        <label htmlFor="name">Nome</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label htmlFor="email">E-mail</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
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
          onClick={handleDeleteProfile}
        >
          Excluir Minha Conta
        </button>
      </div>
    </form>
  );
}