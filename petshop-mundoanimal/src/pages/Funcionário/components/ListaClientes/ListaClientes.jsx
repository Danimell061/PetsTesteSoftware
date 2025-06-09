import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { getAllUsers, deleteUser, getUserLogged } from '../../../../services/userServices.js';
import Modal from '../../../../components/Modal/Modal';
import EditUserForm from '../../components/EditUserForm.jsx';
import './ListaClientes.css';

export default function ListaClientes() {
  // --- LÓGICA DE ESTADO ---
  const [clientes, setClientes] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRoles, setSelectedRoles] = useState({ cliente: false, admin: false, funcionario: false });
  
  // Estados para controlar o modal de edição
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // --- LÓGICA DE DADOS E PERMISSÃO ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) throw new Error("Acesso não autorizado.");
        
        const [usersResponse, loggedUserResponse] = await Promise.all([
          getAllUsers(token),
          getUserLogged()
        ]);
        
        setClientes(usersResponse.data);
        setLoggedInUser(loggedUserResponse.data);
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
        setError("Não foi possível carregar os dados. Por favor, faça login novamente.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Decide se o usuário logado pode agir sobre o usuário alvo
  const canPerformAction = (targetUser) => {
    if (!loggedInUser || loggedInUser._id === targetUser._id) return false;
    if (loggedInUser.role === 'admin') return true;
    if (loggedInUser.role === 'funcionario' && targetUser.role === 'cliente') return true;
    return false;
  };

  // --- HANDLERS DE AÇÃO (MODAL, DELETE, FILTROS) ---
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
        await deleteUser(clienteId);
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

  const handleOpenEditModal = (user) => {
    setEditingUser(user);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingUser(null);
  };
  
  const handleUpdateSuccess = (updatedUser) => {
    setClientes(prevClientes => 
      prevClientes.map(cliente => 
        cliente._id === updatedUser._id ? updatedUser : cliente
      )
    );
  };

  // --- LÓGICA DE FILTRO ---
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

  // --- RENDERIZAÇÃO DO COMPONENTE ---
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
    <>
      <div className="view-container">
        <div className="view-header">
          <h1>Lista de Usuários</h1>
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
                  {canPerformAction(cliente) && (
                    <>
                      <button className="btn-alterar" onClick={() => handleOpenEditModal(cliente)}>
                        Alterar
                      </button>
                      <button className="btn-excluir" onClick={() => handleDelete(cliente._id, cliente.name)}>
                        Excluir
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="no-results-message">Nenhum cliente encontrado.</p>
          )}
        </div>
      </div>

      {isEditModalOpen && (
        <Modal onClose={handleCloseEditModal}>
          <EditUserForm
            userToEdit={editingUser}
            onUpdateSuccess={handleUpdateSuccess}
            onClose={handleCloseEditModal}
          />
        </Modal>
      )}
    </>
  );
}