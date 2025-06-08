import React, { useState, useRef } from 'react';
// 1. Importe seu serviço de API
import { cadastrarPetService } from '../../services/petServices.js'; // Corrija o caminho se necessário
import './RegisterPet.css';
import Swal from 'sweetalert2';


export default function RegisterPetForm({ onAddPet, onClose }) {
  const [name, setName] = useState('');
  const [type, setType] = useState('Cachorro');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [photo, setPhoto] = useState(null); // Para o arquivo da foto
  const [photoPreview, setPhotoPreview] = useState(null);
  
  // Novo estado para controlar o envio do formulário
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef(null);

  const handlePhotoClick = () => {
    fileInputRef.current.click();
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  // 2. Modifique a função handleSubmit para ser assíncrona e chamar a API
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name || !age) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor, preencha nome, idade e adicione uma foto.',
        confirmButtonColor: '#60a5fa'
      });
      return;
    }

    // Desabilita o botão para evitar múltiplos envios
    setIsSubmitting(true);

    // 3. Crie um FormData para enviar arquivos e dados
    const formData = new FormData();
    formData.append('name', name);
    formData.append('type', type);
    formData.append('breed', breed);
    formData.append('age', age);
    formData.append('photo', photo); // 'photo' aqui é o objeto do arquivo

    try {
      // 4. Chame o serviço da API
      const pet = Object.fromEntries(formData.entries())
      const response = await cadastrarPetService(pet);

      // 5. Se tiver sucesso, adicione o novo pet (retornado pela API) à lista e feche o modal
      onAddPet(response.data);
      onClose();

    } catch (error) {
      console.error("Erro ao cadastrar pet:", error);
      Swal.fire({
        icon: 'error',
        title: 'Erro no Cadastro',
        text: 'Não foi possível cadastrar o pet. Tente novamente.',
        confirmButtonColor: '#60a5fa'
      });
    } finally {
      // Reabilita o botão no final, tanto em sucesso quanto em erro
      setIsSubmitting(false);
    }
  };

  return (
    // Note que os nomes dos estados e handlers foram atualizados para corresponder à API
    <form onSubmit={handleSubmit} className="register-pet-form">
      <h2>Registrar Novo Pet</h2>

      <div className="foto-uploader" onClick={handlePhotoClick}>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handlePhotoChange}
          style={{ display: 'none' }}
        />
        {photoPreview ? (
          <img src={photoPreview} alt="Preview do pet" className="foto-preview" />
        ) : (
          <div className="foto-placeholder">
            <span>+</span>
            <p>Adicionar Foto</p>
          </div>
        )}
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

      {/* 6. Adicione o estado 'disabled' ao botão */}
      <button type="submit" className="submit-btn" disabled={isSubmitting}>
        {isSubmitting ? 'Registrando...' : 'Registrar Pet'}
      </button>
    </form>
  );
}