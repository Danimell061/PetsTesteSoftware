import { useLocation, useNavigate } from 'react-router-dom';
import './LoginPage.css';
import '../../../styles/Global.css';

export default function Login() {
    const location = useLocation();
    const tipoUsuario = (location.state?.tipoUsuario || 'cliente') === 'cliente'
        ? 'Cliente'
        : 'Funcionario';

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate(`/${tipoUsuario.toLowerCase()}`)
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <button
                        className="voltar-btn"
                        onClick={() => navigate('/')}
                        title="Voltar" // Adiciona um tooltip para acessibilidade
                    >
                        &larr; {/* Este é o código HTML para uma seta para a esquerda */}
                    </button>
                    <h2>Login {tipoUsuario}</h2>
                </div>

                <form onSubmit={handleSubmit}>
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