import React, { useState, useRef } from 'react';
import './RegisterPet.css';

// Recebe a função para adicionar o pet e a função para fechar o modal
export default function RegisterPetForm({ onAddPet, onClose }) {
  const [nome, setNome] = useState('');
  const [especie, setEspecie] = useState('Cachorro'); // Valor padrão
  const [raca, setRaca] = useState('');
  const [idade, setIdade] = useState('');
  const [foto, setFoto] = useState(null); // Para o arquivo da foto
  const [fotoPreview, setFotoPreview] = useState(null); // Para a URL de preview

  // Ref para acessar o input de arquivo escondido
  const fileInputRef = useRef(null);

  const handleFotoClick = () => {
    fileInputRef.current.click(); // Abre o seletor de arquivos
  };

  const handleFotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFoto(file);
      setFotoPreview(URL.createObjectURL(file)); // Cria uma URL temporária para preview
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!nome || !idade || !foto) {
      alert('Por favor, preencha todos os campos obrigatórios e adicione uma foto.');
      return;
    }

    const novoPet = {
      id: Date.now(), // ID único baseado no tempo atual
      nome,
      especie,
      raca: raca || 'Não informada',
      idade,
      foto: fotoPreview, // Usamos a URL de preview para a exibição
    };

    onAddPet(novoPet); // Adiciona o novo pet na lista da página principal
    onClose(); // Fecha o modal
  };

  return (
    <form onSubmit={handleSubmit} className="register-pet-form">
      <h2>Registrar Novo Pet</h2>

      <div className="foto-uploader" onClick={handleFotoClick}>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFotoChange}
          style={{ display: 'none' }}
        />
        {fotoPreview ? (
          <img src={fotoPreview} alt="Preview do pet" className="foto-preview" />
        ) : (
          <div className="foto-placeholder">
            <span>+</span>
            <p>Adicionar Foto</p>
          </div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="nome">Nome *</label>
        <input type="text" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
      </div>

      <div className="form-group">
        <label htmlFor="especie">Espécie *</label>
        <select id="especie" value={especie} onChange={(e) => setEspecie(e.target.value)} required>
          <option value="Cachorro">Cachorro</option>
          <option value="Gato">Gato</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="raca">Raça</label>
        <input type="text" id="raca" value={raca} onChange={(e) => setRaca(e.target.value)} />
      </div>

      <div className="form-group">
        <label htmlFor="idade">Idade *</label>
        <input type="text" id="idade" value={idade} onChange={(e) => setIdade(e.target.value)} required />
      </div>

      <button type="submit" className="submit-btn">Registrar Pet</button>
    </form>
  );
}