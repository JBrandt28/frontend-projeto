import { useState, useEffect } from 'react'
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import "../App.css"

import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../style/Theme";

import { Container, Switch } from "../style/Style";

const Cabecalho = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [theme, setTheme] = useState("light");
      
      useEffect(() => {
        // Requisição GET para buscar tarefas
        fetch('http://localhost:4300/tarefas', {
            method: 'GET'
        }).then(response => response.json()) // Converte a resposta para JSON
        .then(data => console.log(data)) // Exibe os dados no console
        .catch(error => console.error(error)); // Trata qualquer erro que ocorra na requisição
    
        // Requisição POST para criar uma nova tarefa
        fetch('http://localhost:4300/tarefas', {
            method: 'POST',
            headers: {"Content-type": 'application/json'}, // Define o cabeçalho da requisição
            body: JSON.stringify({descricao: 'teste'}) // Converte os dados para JSON e os envia no corpo da requisição
        }).then(response => response.json()) // Converte a resposta para JSON
        .then(data => console.log(data)) // Exibe os dados no console
        .catch(error => console.error(error)); // Trata qualquer erro que ocorra na requisição
    }, []); // Array vazio como segundo argumento para garantir que o useEffect só seja executado uma vez, após a montagem do componente

    const toggleTheme = () => {
        if (theme === "light") {
            localStorage.setItem("theme", "dark");
            setTheme("dark");
        } else {
            localStorage.setItem("theme", "light");
            setTheme("light");
        }
    };

    useEffect(() => {
        const localTheme = localStorage.getItem("theme");
        localTheme && setTheme(localTheme);
    }, []);

    return (
        <>
            <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
                <Container>

                    <div className="modo">
                        <Switch onClick={() => toggleTheme()}>
                            {theme === "dark" ? (<button>Modo dark</button>) : (<button>Modo Light</button>)}
                        </Switch>
                    </div>

                    {location.pathname !== '/inicio' && location.pathname !== '/login' && location.pathname !== '/cadastrar' && ( // para obter o caminho atual 
                        <div style={{ position: 'relative', 
                        top: '0', 
                        left: '20%', 
                        transform: 'translateX(-50%)',
                        cursor: 'pointer', 
                        textDecoration: 'none', 
                        fontSize: '150px', 
                        fontFamily: 'fantasy', 
                        color: 'red'}}
                            onClick={() => navigate('/inicio')}>
                            NOTAS .app
                        </div>
                    )}
                    <Outlet /> {/* Isso renderizará os componentes filhos */}

                </Container>
            </ThemeProvider>

        </>
    )
}

export default Cabecalho