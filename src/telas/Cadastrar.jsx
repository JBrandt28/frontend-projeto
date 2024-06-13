import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Outlet } from "react-router-dom";

const Cadastrar = () => {
    const [listaUsuarios, setListaUsuarios] = useState([]);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [usuarioEditado, setUsuarioEditado] = useState(null);
    const primeiroNomeInputRef = useRef();
    const ultimoNomeInputRef = useRef();
    const idadeInputRef = useRef();
    const emailInputRef = useRef();
    const senhaInputRef = useRef();

    useEffect(() => {
        axios.get('http://localhost:4300/usuarios')
            .then(response => {
                if (Array.isArray(response.data)) {
                    setListaUsuarios(response.data);
                } else {
                    console.error('A resposta da API não é um array:', response.data);
                }
            })
            .catch(error => {
                console.error('Erro ao buscar usuários:', error);
            });
    }, []);

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

        if (modoEdicao) {
            axios.put(`http://localhost:4300/usuarios/${usuarioEditado.id}`, usuario)
                .then(response => {
                    setListaUsuarios(listaUsuarios.map(user => user.id === usuarioEditado.id ? response.data : user));
                    limparCampos();
                })
                .catch(error => {
                    console.error('Erro ao atualizar usuário:', error);
                });
        } else {
            axios.post('http://localhost:4300/usuarios', usuario)
                .then(response => {
                    setListaUsuarios([...listaUsuarios, response.data]);
                    limparCampos();
                })
                .catch(error => {
                    console.error('Erro ao adicionar usuário:', error);
                });
        }
    }

    function editarUsuario(usuario) {
        setModoEdicao(true);
        setUsuarioEditado(usuario);
        primeiroNomeInputRef.current.value = usuario.primeiro_nome;
        ultimoNomeInputRef.current.value = usuario.ultimo_nome;
        idadeInputRef.current.value = usuario.idade;
        emailInputRef.current.value = usuario.email;
        senhaInputRef.current.value = usuario.senha;
    }

    function excluirUsuario(id) {
        axios.delete(`http://localhost:4300/usuarios/${id}`)
            .then(() => {
                setListaUsuarios(listaUsuarios.filter(user => user.id !== id));
            })
            .catch(error => {
                console.error('Erro ao excluir usuário:', error);
            });
    }

    function limparCampos() {
        setModoEdicao(false);
        setUsuarioEditado(null);
        primeiroNomeInputRef.current.value = '';
        ultimoNomeInputRef.current.value = '';
        idadeInputRef.current.value = '';
        emailInputRef.current.value = '';
        senhaInputRef.current.value = '';
    }

    return (
        <div>
            <h2>{modoEdicao ? "Editar Usuário" : "Cadastrar"}</h2>

            <form onSubmit={(e) => { e.preventDefault(); adicionaUsuario(); }}>
                <label className='teste'>Primeiro nome:</label>
                <input type="text" ref={primeiroNomeInputRef} name="primeiroNome" />

                <label className='teste'>Último nome:</label>
                <input type="text" ref={ultimoNomeInputRef} name="ultimoNome" />

                <label className='teste'>Idade:</label>
                <input type="number" ref={idadeInputRef} name="idade" />

                <label className='teste'>Email:</label>
                <input type="email" ref={emailInputRef} name="email" />

                <label className='teste'>Senha:</label>
                <input type="password" ref={senhaInputRef} name="senha" />

                <br />
                <br />
                <button type="submit">{modoEdicao ? "Salvar" : "Cadastrar"}</button>
                {modoEdicao && <button type="button" onClick={limparCampos}>Cancelar</button>}
            </form>

            <div>
                <h3>Lista de Usuários</h3>
                {listaUsuarios.map(usuario => (
                    <div key={usuario.id} style={{ display: 'flex', alignItems: 'center', margin: '10px' }}>
                        <div style={{ flex: '1', marginRight: '10px', padding: '5px' }}>
                            {usuario.primeiro_nome} {usuario.ultimo_nome} - {usuario.idade} anos - {usuario.email}
                        </div>
                        <button onClick={() => editarUsuario(usuario)}>Editar</button>
                        <button onClick={() => excluirUsuario(usuario.id)}>Excluir</button>
                    </div>
                ))}
            </div>

            <Link to={'/login'}> <div>Login</div> </Link>
            <Link to={'/'}>Voltar</Link>
            <Outlet />
        </div>
    );
};

export default Cadastrar;
