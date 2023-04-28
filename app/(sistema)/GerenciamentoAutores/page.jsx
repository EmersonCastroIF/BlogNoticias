'use client'

import { useEffect, useContext } from "react"
import { useState } from "react"
import { Table, Dropdown } from "react-bootstrap"
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import BusyButton from "../../componentes/buusybutton";
import { MessageCallbackContext } from "../layout";
import AutorAtualizacao from "./atualizacao"
import AutorRemover from "./remocao"
import { createContext } from "react"

export const metadata = {
    title: 'Leitores'
}

export const AtualizarAutoresContext = createContext(null);

export default function Page() {

    const [grid, setGrid] = useState(null);
    const [atualizarGrid, setAtualizarGrid] = useState(null);
    const messageCallback = useContext(MessageCallbackContext);
    const [busy, setBusy] = useState(false);
    const [operacao, setOperacao] = useState({ id: null, usuarioId: null, action: null });

    let modal = null;

    if (operacao.action === "update") {
        modal = <AutorAtualizacao id={operacao.id} usuarioId={operacao.usuarioId} />
    }
    else if (operacao.action === "delete") {
        modal = <AutorRemover id={operacao.id} usuarioId={operacao.usuarioId} />
    }  

    const handleBloqueadoChange = (value, p) => {
        p.bloqueado = value;
        verificarBloqueado(p);
    }

   const fecharModals = () => {
        setOperacao({ id: null, usuarioId: null, action: null });
    }    

    const verificarBloqueado = (data) => {
        setBusy(true);

        console.log(data);
        const url = '/api/leitor/' + data.id;
        var args = {
            method: 'PUT', 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        fetch(url, args).then((result) => {
            setBusy(false);
            if (result.status === 200) {
                result.json().then((resultData) => {                    
                    messageCallback({ tipo: 'sucesso', texto: resultData });
                })
            }
            else{
                messageCallback({tipo: 'erro', texto: result.statusText});
            }
        });
    }

    const pesquisar = () => {
        fetch('/api/leitor').then((result) => {
            if (result.status === 200) {
                result.json().then((data) => {
                let finalGrid = data.map((p) =>
                    <tr key={p.id}>
                        <td>{p.nome}</td>
                        <td>

                            <BootstrapSwitchButton

                                checked={p.bloqueado}
                                onlabel='Sim'
                                offlabel='Não'
                                onChange={(value) => handleBloqueadoChange(value, p)}
                            />

                        </td>
                        <td>
                                <Dropdown>
                                    <Dropdown.Toggle>Opção</Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => setOperacao({ id: p.id, usuarioId: p.id, action: "update" })}>Atualizar</Dropdown.Item>
                                        {p.publicado ? null : <Dropdown.Item onClick={() => setOperacao({ id: p.id, usuarioId: p.usuarioId, action: "delete" })}>Remover</Dropdown.Item>}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </td>                        
                    </tr>
                );
                setGrid(finalGrid);
            })
        }
        else
            messageCallback({ tipo: 'erro', texto: result.statusText });
    });
}

    useEffect(() => {
        if (atualizarGrid === null)
            setAtualizarGrid(true);
        if (atualizarGrid) {
            setAtualizarGrid(false);
            pesquisar();
        }
    }, [atualizarGrid])

    useEffect(() => {
        setBusy(busy);
    }, [busy]);

    return (
        <>
            <h2>Leitores {busy ? <BusyButton variant="" type="submit" label="Processando ..." busy={busy} /> : null}</h2>

            <AtualizarAutoresContext.Provider value={{ atualizar: setAtualizarGrid, fechar: fecharModals }}>
                {modal}
            </AtualizarAutoresContext.Provider>

            <Table striped hover>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Bloqueado</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {grid}
                </tbody>
            </Table>
        </>
    )
}