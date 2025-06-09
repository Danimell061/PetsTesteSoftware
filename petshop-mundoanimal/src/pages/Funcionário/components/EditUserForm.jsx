import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
// Importamos os dois serviços que serão usados aqui
import { updateUser, updateRoleUser } from '../../../services/userServices';
import './EditForm.css';

export default function EditUserForm({ userToEdit, loggedInUser, onUpdateSuccess, onClose }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (userToEdit) {
            setFormData({
                name: userToEdit.name || '',
                email: userToEdit.email || '',
                role: userToEdit.role || 'cliente',
            });
        }
    }, [userToEdit]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // ================== FUNÇÃO handleSubmit ATUALIZADA ==================
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            // 1. Prepara e envia os dados do perfil (nome e email)
            const profileData = { name: formData.name, email: formData.email };
            let updatedUser = (await updateUser(userToEdit._id, profileData)).data;

            // 2. SE o cargo foi alterado E o usuário logado é um admin, chama o serviço de cargo
            if (loggedInUser?.role === 'admin' && formData.role !== userToEdit.role) {
                // O serviço 'updateRoleUser' espera o ID e um objeto com a nova role
                const roleResponse = await updateRoleUser(userToEdit._id, formData.role);
                // Atualiza nosso objeto de usuário com a resposta mais recente
                updatedUser = roleResponse.data;
            }

            await Swal.fire({
                title: "Sucesso!",
                text: "Usuário atualizado com sucesso.",
                icon: "success",
                confirmButtonColor: "#3b82f6"
            }).then(() => {
                onUpdateSuccess(updatedUser);
                onClose();
                window.location.reload();
            });

            // Envia os dados finais e atualizados para a página da lista
            onUpdateSuccess(updatedUser);
            onClose();

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
    // ====================================================================

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

            {/* O campo de cargo continua sendo visível apenas para admins */}
            {loggedInUser?.role === 'admin' && (
                <div className="form-group">
                    <label htmlFor="role">Cargo</label>
                    <select id="role" name="role" value={formData.role} onChange={handleChange}>
                        <option value="cliente">Cliente</option>
                        <option value="funcionario">Funcionário</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
            )}

            <button type="submit" className="submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
            </button>
        </form>
    );
}