import React from 'react'
import { Link, Outlet } from "react-router-dom";
import "./Style.css"

const Login = () => {
    return (
        <>
            <h2>Login</h2>

            <form>
                <label className='teste'>User:</label>
                <input  type="text" name="nome" />
                <label className='teste'>Senha:</label>
                <input  type="password" id="senha" />
                <br />
                <br />
                <Link to={'/tarefas'}>
                    <input type="submit" value="enviar" />
                </Link>
            </form>

            <br /><br />

            <Link to={'/cadastrar'}> <div>Cadastrar</div> </Link>
            <Link to={'/'}>Voltar</Link>
            <Outlet />
        </>
    )
}

export default Login