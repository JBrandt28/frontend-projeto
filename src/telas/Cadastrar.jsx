import React, { useRef, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Style.css'; // Importando o arquivo de estilos CSS

const Cadastrar = () => {
    const [listaUsuarios, setListaUsuarios] = useState([]);
    const primeiroNomeInputRef = useRef();
    const ultimoNomeInputRef = useRef();
    const idadeInputRef = useRef();
    const emailInputRef = useRef();
    const passwordInputRef = useRef(); // Renomeando para passwordInputRef

    const adicionaUsuario = async () => {
        const usuario = {
            primeiro_nome: primeiroNomeInputRef.current.value,
            ultimo_nome: ultimoNomeInputRef.current.value,
            idade: parseInt(idadeInputRef.current.value, 10),
            email: emailInputRef.current.value,
            password: passwordInputRef.current.value, // Alterado para password
        };
    
        if (!usuario.primeiro_nome || !usuario.ultimo_nome || !usuario.idade || !usuario.email || !usuario.password) {
            console.error('Todos os campos são obrigatórios.');
            return;
        }
    
        try {
            const response = await axios.post('http://localhost:4300/usuarios', usuario);
            setListaUsuarios([...listaUsuarios, response.data]);
            limparCampos();
        } catch (error) {
            console.error('Erro ao adicionar usuário:', error);
        }
    };

    const limparCampos = () => {
        primeiroNomeInputRef.current.value = '';
        ultimoNomeInputRef.current.value = '';
        idadeInputRef.current.value = '';
        emailInputRef.current.value = '';
        passwordInputRef.current.value = ''; // Alterando para passwordInputRef
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4" style={{ fontFamily: 'fantasy', color: 'grey' }}>
                Cadastrar Usuário
            </h2>

            <form onSubmit={(e) => { e.preventDefault(); adicionaUsuario(); }} className="mb-4" style={{ fontFamily: 'fantasy', color: 'grey' }}>
                <div className="mb-3">
                    <label className="form-label">Primeiro nome:</label>
                    <input type="text" ref={primeiroNomeInputRef} className="form-control" name="primeiroNome" />
                </div>

                <div className="mb-3">
                    <label className="form-label">Último nome:</label>
                    <input type="text" ref={ultimoNomeInputRef} className="form-control" name="ultimoNome" />
                </div>

                <div className="mb-3">
                    <label className="form-label">Idade:</label>
                    <input type="number" ref={idadeInputRef} className="form-control" name="idade" />
                </div>

                <div className="mb-3">
                    <label className="form-label">Email:</label>
                    <input type="email" ref={emailInputRef} className="form-control" name="email" />
                </div>

                <div className="mb-3">
                    <label className="form-label">Senha:</label>
                    <input type="password" ref={passwordInputRef} className="form-control" name="senha" />
                </div>

                <div className="d-flex justify-content-between">
                    <button type="submit" className="btn btn-primary">
                        Cadastrar
                    </button>
                </div>
            </form>

            <div className="d-flex justify-content-end mt-4">
                <Link to={'/login'} className="btn btn-primary mx-2">Login</Link>
                <Link to={'/'} className="btn btn-danger">Voltar</Link>
            </div>
        </div>
    );
};

export default Cadastrar;
