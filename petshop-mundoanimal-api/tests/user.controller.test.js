import { describe, it, expect, vi } from 'vitest'
import { registerUser, findAllUsers } from '../src/controllers/user.controller.js'
import userService from '../src/services/user.service.js'

// Mock simples do userService
vi.mock('../src/services/user.service.js', () => ({
  default: {
    create: vi.fn(),
    findAll: vi.fn()
  }
}))

describe('User Controller - Testes Básicos', () => {
  
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
})