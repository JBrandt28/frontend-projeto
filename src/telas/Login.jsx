import React, { useRef, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'; // Importação do useHistory

const Login = () => {
    const emailInputRef = useRef();
    const senhaInputRef = useRef();
    const [erro, setErro] = useState('');
    const history = useHistory(); // Uso do useHistory

    function fazerLogin() {
        const email = emailInputRef.current.value;
        const senha = senhaInputRef.current.value;

        axios.post('http://localhost:4300/login', { email, senha })
            .then(response => {
                localStorage.setItem('token', response.data.token); // Armazenar token de autenticação no localStorage
                history.push('/tarefas'); // Redirecionar para a página de perfil após o login
            })
            .catch(error => {
                setErro('Erro ao fazer login. Verifique suas credenciais.');
                console.error('Erro ao fazer login:', error);
            });
    }

    return (
        <div>
            <h2>Login</h2>

            <form onSubmit={(e) => { e.preventDefault(); fazerLogin(); }}>
                <label>Email:</label>
                <input type="email" ref={emailInputRef} name="email" />

                <label>Senha:</label>
                <input type="password" ref={senhaInputRef} name="senha" />

                {erro && <p style={{ color: 'red' }}>{erro}</p>}

                <br />
                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
