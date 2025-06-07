import { useLocation, useNavigate } from 'react-router-dom'
import './LoginPage.css';
import '../../../styles/Global.css';

export default function Login() {
    const location = useLocation()
    const tipoUsuario = (location.state?.tipoUsuario || 'cliente') // Se location.state não existir, o padrão vai ser 'cliente'
        === 'cliente' // Se for 'cliente'
        ? 'Cliente'  // Vai formatar para 'Cliente
        : 'Funcionário' // Caso contrario formata para 'Funcionário'
    const navigate = useNavigate()
    return (
        <div className="login-container">
            <div className="login-card">
                <button className='flex justify-items-start bg-transparent! text-black!' onClick={()=> navigate('/')}>Voltar</button>
                <h2>Login {tipoUsuario}</h2>
                <form>
                <input
                    type="email"
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    placeholder="Senha"
                    required
                />
                <button type="submit" className="btn-funcionario">
                    Entrar
                </button>
                </form>
            </div>
        </div>
    );
}