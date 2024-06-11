import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Outlet } from "react-router-dom";

const Cadastrar = () => {
    const [listaUsuarios, setListaUsuarios] = useState([]);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [usuarioEditado, setUsuarioEditado] = useState(null);
    const [indiceEditado, setIndiceEditado] = useState(null);
    const primeiroNomeInputRef = useRef();
    const ultimoNomeInputRef = useRef();
    const idadeInputRef = useRef();
    const emailInputRef = useRef();
    const senhaInputRef = useRef();

    useEffect(() => {
        axios.get('http://localhost:4300/usuarios')
            .then(response => {
                setListaUsuarios(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar usuários:', error);
            });
    }, []);

    function adicionaUsuario() {
        const usuario = {
            primeiroNome: primeiroNomeInputRef.current.value,
            ultimoNome: ultimoNomeInputRef.current.value,
            idade: idadeInputRef.current.value,
            email: emailInputRef.current.value,
            senha: senhaInputRef.current.value,
        };

        if (modoEdicao) {
            // Lógica para edição do usuário
        } else {
            axios.post('http://localhost:4300/usuarios', usuario)
                .then(response => {
                    setListaUsuarios([...listaUsuarios, response.data]);
                })
                .catch(error => {
                    console.error('Erro ao adicionar usuário:', error);
                });
        }
    };

    function editarUsuario(indice, usuario) {
        // Lógica para editar usuário
    }

    function excluirUsuario(id) {
        // Lógica para excluir usuário
    }

    return (
        <div>
            <h2>Cadastrar</h2>

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
            </form>

            <div>
                {listaUsuarios.map((usuario, index) => (
                    <div key={usuario.id} style={{ display: 'flex', alignItems: 'center', margin: '10px' }}>
                        <div style={{ flex: '1', marginRight: '10px', padding: '5px' }}>
                            {usuario.primeiroNome} {usuario.ultimoNome} - {usuario.idade} anos - {usuario.email}
                        </div>
                        <button onClick={() => editarUsuario(index, usuario)}>Editar</button>
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
