import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { getAllUsers, deleteUserService } from '../../../../services/userServices.js';
import './ListaClientes.css';

export default function ListaClientes() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [selectedRoles, setSelectedRoles] = useState({
    cliente: false,
    admin: false,
    funcionario: false,
  });

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) {
          setError("Acesso não autorizado. Por favor, faça login.");
          setLoading(false);
          return;
        }
        const response = await getAllUsers(token);
        setClientes(response.data);
        setError(null);
      } catch (err) {
        console.error("Erro ao buscar usuários:", err);
        setError("Não foi possível carregar a lista de clientes.");
      } finally {
        setLoading(false);
      }
    };
    fetchAllUsers();
  }, []);

  const handleDelete = async (clienteId, clienteName) => {
    const result = await Swal.fire({
      title: `Tem certeza que deseja excluir ${clienteName}?`,
      text: "Você não poderá reverter esta ação!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3b82f6",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Sim, excluir!",
      cancelButtonText: "Cancelar"
    });

    if (result.isConfirmed) {
      try {
        const token = Cookies.get("token");
        await deleteUserService(clienteId, token);
        setClientes(prevClientes => prevClientes.filter(c => c._id !== clienteId));
        Swal.fire({
          title: "Excluído!",
          text: `O cliente ${clienteName} foi excluído com sucesso.`,
          icon: "success",
          confirmButtonColor: "#3b82f6"
        });
      } catch (error) {
        console.error("Erro ao excluir cliente:", error);
        Swal.fire({
          title: "Erro!",
          text: "Não foi possível excluir o cliente.",
          icon: "error",
          confirmButtonColor: "#3b82f6"
        });
      }
    }
  };

  const handleRoleChange = (event) => {
    const { name, checked } = event.target;
    setSelectedRoles(prevRoles => ({
      ...prevRoles,
      [name]: checked,
    }));
  };

  const filteredClientes = clientes.filter(cliente => {
    const matchesSearchTerm =
      cliente?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente?.email?.toLowerCase().includes(searchTerm.toLowerCase());

    const activeRoles = Object.keys(selectedRoles).filter(role => selectedRoles[role]);
    
    if (activeRoles.length === 0) {
      return matchesSearchTerm;
    }

    const matchesRole = activeRoles.includes(cliente?.role?.toLowerCase());

    return matchesSearchTerm && matchesRole;
  });

  // CORREÇÃO 1: Lógica de exibição de loading e erro que faltava
  if (loading) { 
    return (
      <div className="view-container">
        <h2>Carregando clientes...</h2>
      </div>
    );
  }

  if (error) { 
    return (
      <div className="view-container error-message">
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <div className="view-container">
      <div className="view-header">
        <h1>Lista de Clientes</h1>
        <div className="search-and-filters">
          <input
            type="text"
            placeholder="Pesquisar por nome ou e-mail..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="filter-group">
            <label>
              <input type="checkbox" name="cliente" checked={selectedRoles.cliente} onChange={handleRoleChange} />
              Cliente
            </label>
            <label>
              <input type="checkbox" name="admin" checked={selectedRoles.admin} onChange={handleRoleChange} />
              Admin
            </label>
            <label>
              <input type="checkbox" name="funcionario" checked={selectedRoles.funcionario} onChange={handleRoleChange} />
              Funcionário
            </label>
          </div>
        </div>
      </div>

      {/* CORREÇÃO 2: Tabela completa com cabeçalho e map para as linhas */}
      <div className="clientes-table">
        <div className="clientes-header">
          <div>ID do Cliente</div>
          <div>Nome</div>
          <div>E-mail</div>
          <div>Cargo</div>
          <div>Ações</div>
        </div>
        
        {filteredClientes.length > 0 ? (
          filteredClientes.map((cliente) => (
            <div key={cliente._id} className="cliente-row">
              <div>{cliente._id}</div>
              <div>{cliente.name}</div>
              <div>{cliente.email}</div>
              <div>{cliente.role}</div>
              <div className="cliente-actions">
                <button className="btn-alterar">Alterar</button>
                <button 
                  className="btn-excluir" 
                  onClick={() => handleDelete(cliente._id, cliente.name)}
                >
                  Excluir
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results-message">Nenhum cliente encontrado.</p>
        )}
      </div>
    </div>
  );
}