import { describe, it, expect, vi, beforeEach } from 'vitest'
import { registerUser, findAllUsers, adminUpdateUser, deleteUser } from '../src/controllers/user.controller.js'
import userService from '../src/services/user.service.js'

// Mock simples do userService
vi.mock('../src/services/user.service.js', () => ({
  default: {
    create: vi.fn(),
    findAll: vi.fn(),
    updateRole: vi.fn(),
    delete: vi.fn()
  }
}))

describe('User Controller - Testes Básicos', () => {
  beforeEach(() => {
    vi.clearAllMocks() // Limpa todos os mocks antes de cada teste
    })
  it('deve criar um usuário com sucesso', async () => {
    // Arrange
    const req = {
      body: { name: 'João', email: 'joao@email.com', password: '123456' }
    }
    const res = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn()
    }
    
    userService.create.mockResolvedValue({ token: 'abc123' })
    
    // Act
    await registerUser(req, res)
    
    // Assert
    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.send).toHaveBeenCalledWith({ token: 'abc123' })
  })

  it('deve retornar erro quando faltam campos obrigatórios', async () => {
    // Arrange
    const req = {
      body: { name: 'João' } // faltando email e password
    }
    const res = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn()
    }
    
    // Act
    await registerUser(req, res)
    
    // Assert
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.send).toHaveBeenCalledWith({ message: "Todos campos requiridos!" })
  })

  it('deve listar todos os usuários', async () => {
    // Arrange
    const req = {}
    const res = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn()
    }
    
    const mockUsers = [
      { id: 1, name: 'João', email: 'joao@email.com' },
      { id: 2, name: 'Maria', email: 'maria@email.com' }
    ]
    
    userService.findAll.mockResolvedValue(mockUsers)
    
    // Act
    await findAllUsers(req, res)
    
    // Assert
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith(mockUsers)
  })

  it('deve rejeitar cargo inválido', async () => {
    // Arrange
    const req = {
      body: { role: 'gerente' } // cargo que não existe
    }
    const res = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn()
    }
    
    // Act
    await adminUpdateUser(req, res)
    
    // Assert
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.send).toHaveBeenCalledWith({ message: "Cargo não existente!" })
  })

  it('deve deletar usuário com sucesso', async () => {
    // Arrange
    const req = {
      userId: 1,
      decodedId: 1, // mesmo usuário
      params: { id: 1 }
    }
    const res = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn()
    }
    userService.delete.mockResolvedValue({id: 1})
    
    // Act
    await deleteUser(req, res)
    
    // Assert
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({ message: "Usuario e seus pets deletados!" })
  })

  it('não deve deletar usuário com sucesso', async () => {
    // Arrange
    const req = {
      userId: 1,
      decodedId: 2, // usuário diferente
      params: { id: 1 }
    }
    const res = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn()
    }
    userService.delete.mockResolvedValue({id: 1})
    
    // Act
    await deleteUser(req, res)
    
    // Assert
    expect(res.status).toHaveBeenCalledWith(500)
  })
  
})