import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Outlet } from "react-router-dom";

const Cadastrar = () => {
    const [listaUsuarios, setListaUsuarios] = useState([]);
    const primeiroNomeInputRef = useRef();
    const ultimoNomeInputRef = useRef();
    const idadeInputRef = useRef();
    const emailInputRef = useRef();
    const senhaInputRef = useRef();

    function adicionaUsuario() {
        const usuario = {
            primeiro_nome: primeiroNomeInputRef.current.value,
            ultimo_nome: ultimoNomeInputRef.current.value,
            idade: parseInt(idadeInputRef.current.value, 10),
            email: emailInputRef.current.value,
            senha: senhaInputRef.current.value,
        };

        if (!usuario.primeiro_nome || !usuario.ultimo_nome || !usuario.idade || !usuario.email || !usuario.senha) {
            console.error('Todos os campos são obrigatórios.');
            return;
        }

        try {
            axios.post('http://localhost:4300/usuarios', usuario)
                .then(response => {
                    setListaUsuarios([...listaUsuarios, response.data]);
                    limparCampos();
                })
        } catch (error) {
            console.error('Erro ao adicionar usuário:', error);
        }
    }

    function limparCampos() {
        primeiroNomeInputRef.current.value = '';
        ultimoNomeInputRef.current.value = '';
        idadeInputRef.current.value = '';
        emailInputRef.current.value = '';
        senhaInputRef.current.value = '';
    }

    return (
        <div className="containerCadastrar">
            <h2 style={{ padding: '0 25px', fontFamily: 'fantasy', color: 'red' }}> Cadastrar Usuário </h2>

            <form onSubmit={(e) => { e.preventDefault(); adicionaUsuario(); }} className="mb-4">
                <label className="form-label" >Primeiro nome:</label>
                <input type="text" ref={primeiroNomeInputRef} name="primeiroNome" className="form-control" />

                <label className="form-label" >Último nome:</label>
                <input type="text" ref={ultimoNomeInputRef} name="ultimoNome" className="form-control" />

                <label className="form-label" >Idade:</label>
                <input type="text" ref={idadeInputRef} name="idade" className="form-control" />

                <label className="form-label" >Email:</label>
                <input type="email" ref={emailInputRef} name="email" className="form-control" />

                <label className="form-label" >Senha:</label>
                <input type="password" ref={senhaInputRef} name="password" className="form-control" />
                <br />

                <div className="d-flex justify-content-center mb-2" style={{ gap: '10px' }}>
                    <button type="submit" className="btn btn-primary">Cadastrar</button>
                    <button type="button" className="btn btn-primary" onClick={limparCampos}>Cancelar</button>
                </div>
            </form>
        
            <div className="d-flex justify-content-end mt-2">
                <Link to={'/login'} className="mx-2">
                    <input type="button" value="login" className="btn btn-secondary" />
                </Link>
                <Link to={'/'} className="mx-2">
                    <input type="button" value="voltar" className="btn btn-danger" />
                </Link>
                <Outlet />
            </div>
        </div>
    );
};

export default Cadastrar;
