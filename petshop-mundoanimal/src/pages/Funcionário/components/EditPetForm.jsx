import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { updatePet } from '../../../services/petServices'; // Ajuste o caminho se necessário
import './EditForm.css'; // Usando o mesmo arquivo de CSS do EditUserForm

export default function EditPetForm({ petToEdit, onUpdateSuccess, onClose }) {
    // 1. ADICIONADO 'type' de volta ao estado do formulário
    const [formData, setFormData] = useState({
        name: '',
        type: 'Cachorro', // Valor padrão
        breed: '',
        age: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Preenche o formulário com os dados do pet selecionado
    useEffect(() => {
        if (petToEdit) {
            setFormData({
                name: petToEdit.name || '',
                type: petToEdit.type || 'Cachorro', // 2. ADICIONADO 'type' aqui também
                breed: petToEdit.breed || '',
                age: petToEdit.age || '',
            });
        }
    }, [petToEdit]);

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await updatePet(petToEdit._id, formData);
            await Swal.fire({
                title: 'Sucesso!',
                text: 'Pet atualizado com sucesso.',
                icon: 'success',
                confirmButtonColor: '#3b82f6',
            }).then(() => {
                onUpdateSuccess(response.data);
                onClose();
                window.location.reload();
            });

        } catch (error) {
            console.error('Erro ao atualizar pet:', error);
            Swal.fire({
                title: 'Erro!',
                text: 'Não foi possível atualizar o pet.',
                icon: 'error',
                confirmButtonColor: '#3b82f6',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        // 3. CORREÇÃO PRINCIPAL: Usando a classe 'edit-user-form' para que o CSS seja aplicado
        <form onSubmit={handleSubmit} className="edit-user-form">
            <h2>Editando Pet:</h2>
            <p className="editing-user-name">{petToEdit.name}</p>

            <div className="form-group">
                <label htmlFor="name">Nome</label>
                <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} required />
            </div>

            {/* 4. ADICIONADO de volta o campo 'Espécie' */}
            <div className="form-group">
                <label htmlFor="type">Espécie</label>
                <select id="type" name="type" value={formData.type} onChange={handleChange} required>
                    <option value="Cachorro">Cachorro</option>
                    <option value="Gato">Gato</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="breed">Raça</label>
                <input id="breed" name="breed" type="text" value={formData.breed} onChange={handleChange} />
            </div>

            <div className="form-group">
                <label htmlFor="age">Idade</label>
                <input id="age" name="age" type="text" value={formData.age} onChange={handleChange} required />
            </div>

            <button type="submit" className="submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
            </button>
        </form>
    );
}