import React from 'react';
import { Link, Outlet } from "react-router-dom";

const Inicio = () => {

    return (
        <>
            <h2>Menu</h2>

                <img src="https://cdn.icon-icons.com/icons2/488/PNG/512/notepad_47704.png" style={{ height: '100px' }} alt="bloco" />
                <br />
                <Link to={'/cadastrar'}>
                    <div>Cadastrar</div>
                </Link>

                <Link to={'/login'}>
                    <div>Login</div>
                </Link>

                <Link to={'/'}>Voltar</Link>

            <Outlet />
        </>
    )
}

export default Inicio