import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { cadastrarPetService } from '../../services/petServices.js'; // Ajuste o caminho se necessário
import './RegisterPet.css';

const DOG_IMAGE_URL = "https://img.freepik.com/premium-vector/cartoon-cute-beagle-dog-with-speech-bubble_52569-2186.jpg?w=360";
const CAT_IMAGE_URL = "https://img.freepik.com/premium-vector/cute-cartoon-cat-profile-avatar_1177872-8.jpg";


export default function RegisterPetForm({ onAddPet, onClose }) {
  const [name, setName] = useState('');
  const [type, setType] = useState('Cachorro');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Lógica de upload de foto foi removida

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name || !age) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor, preencha os campos de nome e idade.',
        confirmButtonColor: '#60a5fa'
      });
      return;
    }

    setIsSubmitting(true);

    const novoPet = {
      name,
      type,
      breed: breed || 'Não informada',
      age,
      // 2. Usamos as constantes com as URLs aqui
      photo: type === 'Cachorro' ? DOG_IMAGE_URL : CAT_IMAGE_URL,
    };

    try {
      const response = await cadastrarPetService(novoPet);

      onAddPet(response.data);
      onClose();
      
      Swal.fire({
          title: "Sucesso!",
          text: `${name} foi cadastrado!`,
          icon: "success",
          confirmButtonColor: "#3b82f6"
      });

    } catch (error) {
      console.error("Erro ao cadastrar pet:", error);
      Swal.fire({
        icon: 'error',
        title: 'Erro no Cadastro',
        text: 'Não foi possível cadastrar o pet. Tente novamente.',
        confirmButtonColor: '#60a5fa'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="register-pet-form">
      <h2>Registrar Novo Pet</h2>

      <div className="pet-image-display">
        <img
          // 3. E usamos as constantes com as URLs aqui também
          src={type === 'Cachorro' ? DOG_IMAGE_URL : CAT_IMAGE_URL}
          alt={`Imagem de um ${type}`}
          className="pet-preview-image"
        />
      </div>

      <div className="form-group">
        <label htmlFor="name">Nome *</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>

      <div className="form-group">
        <label htmlFor="type">Espécie *</label>
        <select id="type" value={type} onChange={(e) => setType(e.target.value)} required>
          <option value="Cachorro">Cachorro</option>
          <option value="Gato">Gato</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="breed">Raça</label>
        <input type="text" id="breed" value={breed} onChange={(e) => setBreed(e.target.value)} />
      </div>

      <div className="form-group">
        <label htmlFor="age">Idade *</label>
        <input type="text" id="age" value={age} onChange={(e) => setAge(e.target.value)} required />
      </div>

      <button type="submit" className="submit-btn" disabled={isSubmitting}>
        {isSubmitting ? 'Registrando...' : 'Registrar Pet'}
      </button>
    </form>
  );
}