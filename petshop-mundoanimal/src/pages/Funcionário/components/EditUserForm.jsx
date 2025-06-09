import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { updateUser } from '../../../services/userServices'; // Ajuste o caminho se necessário
import './EditUserForm.css'; // Vamos criar este CSS

// Recebe 3 props:
// userToEdit: O objeto do usuário que será editado.
// onUpdateSuccess: Função para avisar a lista que a atualização deu certo.
// onClose: Função para fechar o modal.
export default function EditUserForm({ userToEdit, onUpdateSuccess, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Preenche o formulário com os dados do usuário quando ele é selecionado
  useEffect(() => {
    if (userToEdit) {
      setFormData({
        name: userToEdit.name || '',
        email: userToEdit.email || '',
      });
    }
  }, [userToEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Chama o serviço de update passando o ID e os novos dados
      const response = await updateUser(userToEdit._id, formData);

      await Swal.fire({
        title: "Sucesso!",
        text: "Usuário atualizado com sucesso.",
        icon: "success",
        confirmButtonColor: "#3b82f6"
      });
      
      onUpdateSuccess(response.data); // Envia os dados atualizados para a página da lista
      onClose(); // Fecha o modal

    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      Swal.fire({
        title: "Erro!",
        text: "Não foi possível atualizar o usuário.",
        icon: "error",
        confirmButtonColor: "#3b82f6"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="edit-user-form">
      <h2>Editando Usuário:</h2>
      <p className="editing-user-name">{userToEdit.name}</p>

      <div className="form-group">
        <label htmlFor="name">Nome</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="email">E-mail</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>
      <button type="submit" className="submit-btn" disabled={isSubmitting}>
        {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
      </button>
    </form>
  );
}