import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Cabecalho from './components/Cabecalho.jsx'
import Inicio from './telas/Inicio.jsx'
import Login from './telas/Login.jsx'
import Cadastrar from './telas/Cadastrar.jsx'
import Tarefas from './tarefas/Tarefas.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';

const rota = createBrowserRouter([
  {
    path: '/',
    element: <Cabecalho />,
    children: [
      {
        path: '/inicio',
        element: <Inicio />,
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/cadastrar',
        element: <Cadastrar />
      },
      {
        path:'/tarefas',
        element: <Tarefas />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={rota} />
  </React.StrictMode>,
)
