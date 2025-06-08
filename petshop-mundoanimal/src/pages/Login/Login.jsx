import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import '../../../styles/Global.css';
import { useState, useRef, useEffect } from 'react';
import { getUserLogged, loginService } from '../../services/userServices';
import Cookies from 'js-cookie';

export default function Login() {
    const [data, setData] = useState({})
    const emailRef = useRef()
    const senhaRef = useRef()

    const navigate = useNavigate();

    useEffect(()=>{
        if (Object.keys(data).length > 0) {
            loginService(data).then(async (response) => {
                if (response.status === 200) {
                    Cookies.set('token', response.data.token)
                    const user = await getUserLogged()
                    const tela = user.data.role == 'cliente' ? 'cliente' : 'funcionario'
                    
                    navigate(`/${tela.toLowerCase()}`)
                }
            }).catch((err) => {
                console.log(err.response)
            })
        }
    }, [ data, navigate ])

    const handleSubmit = (event) => {
        event.preventDefault();
        setData(()=> {
            const data = {
                email: emailRef.current.value,
                password: senhaRef.current.value
            }
            return data
        })
        
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
                    <h2>Login</h2>
                </div>

                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        ref={emailRef}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        ref={senhaRef}
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