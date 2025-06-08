import React from 'react';
import './Modal.css';

// Recebe 'onClose' para fechar e 'children' para o conteúdo interno
export default function Modal({ onClose, children }) {
  return (
    // O backdrop que escurece o fundo e fecha o modal ao clicar
    <div className="modal-backdrop" onClick={onClose}>
      {/* Evita que o clique no conteúdo feche o modal */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          &times; {/* Símbolo de 'X' para fechar */}
        </button>
        {children}
      </div>
    </div>
  );
}