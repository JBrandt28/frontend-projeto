import { useRef, useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Link, Outlet } from "react-router-dom";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import axios from "axios";
import '../style/Style.css'

Chart.register(ArcElement, Tooltip, Legend);

function Tarefas() {
    const [listaTarefas, setListarefas] = useState([]);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [descricaoEditada, setDescricaoEditada] = useState(null);
    const [indiceEditado, setIndiceEditado] = useState(null);
    const descricaoTarefaInputRef = useRef();

    useEffect(() => {
        console.log("Consulta API");
        fetch("http://localhost:4300/tarefa")
            .then((resposta) => resposta.json())
            .then((resultadoConsulta) => {
                setListarefas([...resultadoConsulta]);
            });
    }, []);

    function adicionaTarefa() {
        if (modoEdicao) {
            const novasTarefas = [...listaTarefas];
            novasTarefas[indiceEditado].descricao = descricaoTarefaInputRef.current.value;
            setListarefas(novasTarefas);
            setModoEdicao(false);
            setDescricaoEditada("");
            setIndiceEditado(null);
        } else {
            const novaTarefa = { descricao: descricaoTarefaInputRef.current.value };
            axios.post(`http://localhost:4300/tarefa`, novaTarefa)
                .then(response => {
                    setListarefas([...listaTarefas, response.data]);
                }).catch((error) => console.log(error));
        }
    };

    function editarTarefa(indice, descricao) {
        setModoEdicao(true);
        setDescricaoEditada(descricao);
        setIndiceEditado(indice);
        descricaoTarefaInputRef.current.value = descricao;
    }

    function excluirTarefa(id) {
        axios.delete(`http://localhost:4300/tarefa/${id}`)
            .then(() => {
                setListarefas(listaTarefas.filter(tarefa => tarefa.id !== id));
            })
            .catch(error => {
                console.error('Erro ao excluir:', error);
            });
    }

    function atualizarTarefa(tarefaAtual) {
        const novasTarefas = listaTarefas.map(tarefa => {
            if (tarefa === tarefaAtual) {
                return { ...tarefa, finalizado: !tarefa.finalizado };
            }
            return tarefa;
        });
        setListarefas(novasTarefas);
    }

    function pegaEstilo(tarefaAtual) {
        return tarefaAtual.finalizado ? 'line-through' : 'none';
    }

    // GRAFICO
    const tarefasFinalizadas = listaTarefas.filter(tarefa => tarefa.finalizado).length;
    const tarefasNaoFinalizadas = listaTarefas.length - tarefasFinalizadas;
    const data = {
        labels: ['Concluídas', 'Não Concluídas'],
        datasets: [
            {
                data: [tarefasFinalizadas, tarefasNaoFinalizadas],
                backgroundColor: ['#36A2EB', '#FF6384'],
                hoverBackgroundColor: ['#36A2EB', '#FF6384'],
            },
        ],
    };

    function limparCampos() {
        descricaoTarefaInputRef.current.value = '';
    }

    return (
        <div className="container">
            <div className="containerDescricaoEGrafico">
                <h2 className="tituloCadastrarTarefa">Cadastrar Tarefa</h2>

                <div style={{ marginBottom: '20px' }}> {/* espaço entre a caixa de texto de inserir tarefas e a caixa que armazena as tarefas */}
                    <input type="text" ref={descricaoTarefaInputRef} style={{ marginRight: '10px' }} />
                    <button onClick={() => { adicionaTarefa(); limparCampos(); }}>{modoEdicao ? "Salvar" : "Cadastrar"}</button>
                </div>


                <div className="containerDescricaoTarefas"> {/* tarefa que armazena as tarefas */}
                    {listaTarefas.map((tarefaAtual, index) => (
                        <div key={tarefaAtual.descricao} className="inputEBotaoDescricao">
                            <div className="caixaDeTextoDescricao" style={{ textDecoration: pegaEstilo(tarefaAtual) }} onClick={() => atualizarTarefa(tarefaAtual)}> {tarefaAtual.descricao} </div>
                            <button onClick={() => editarTarefa(index, tarefaAtual.descricao)} style={{ marginRight: '5px' }}>Editar</button>
                            <button onClick={() => excluirTarefa(tarefaAtual.id)}>Excluir</button>
                        </div>
                    ))}
                </div>
            </div>

            {/* GRAFICO */}
            <div className="grafico">
                <Pie data={data} />
            </div>

            {/* Link para voltar */}
            <div style={{ marginTop: '350px' }}>
                <Link to={'/'}>
                    <input type="button" value="Voltar" className="btn btn-danger" />
                </Link>
            </div>
        </div>
    );
}

export default Tarefas;
