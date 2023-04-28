'use client'

import { useEffect } from "react"
import { useContext } from "react"
import { createContext } from "react"
import { useState } from "react"
import { Dropdown, Table } from "react-bootstrap"
import { MessageCallbackContext } from "../layout"
import TipoCursoAtualizacao from "./atualizacao"
import TipoCursoNovo from "./novo"
import TipoCursoRemover from "./remocao"
import PublicaNoticia from "./publica"

export const metadata = {
    title: 'Tipo de Curso'
}

export const AtualizarTipoCursoContext = createContext(null);

export default function Page() {

    const [grid, setGrid] = useState(null);
    const [atualizarGrid, setAtualizarGrid] = useState(null);
    const [operacao, setOperacao] = useState({ id: null, usuarioId: null, action: null });
    const messageCallback = useContext(MessageCallbackContext);

    let modal = null;

    if (operacao.action === "update") {
        modal = <TipoCursoAtualizacao id={operacao.id} usuarioId={operacao.usuarioId} />
    }
    else if (operacao.action === "delete") {
        modal = <TipoCursoRemover id={operacao.id} usuarioId={operacao.usuarioId} />
    }
    else if (operacao.action === "publicar") {
        modal = <PublicaNoticia id={operacao.id} usuarioId={operacao.usuarioId} />
    }

    const fecharModals = () => {
        setOperacao({ id: null, usuarioId: null, action: null });
    }

    const pesquisar = () => {
        fetch('/api/NoticiaPublicadaGeral').then((result) => {
            if (result.status === 200) {
                result.json().then((data) => {
                    let finalGrid = data.map((p) =>
                        <tr key={p.id}>
                            <td>{p.usuario.nome}</td>
                            <td>{p.titulo}</td>
                            <td>{p.subTitulo}</td>
                            <td>{p.texto}</td>
                            <td>
                                <Dropdown>
                                    <Dropdown.Toggle>Opção</Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => setOperacao({ id: p.id, usuarioId: p.usuarioId, action: "update" })}>Atualizar</Dropdown.Item>
                                        {p.publicado ? null : <Dropdown.Item onClick={() => setOperacao({ id: p.id, usuarioId: p.usuarioId, action: "delete" })}>Remover</Dropdown.Item>}
                                        {p.publicado ? null : <Dropdown.Item onClick={() => setOperacao({ id: p.id, usuarioId: p.usuarioId, action: "publicar" })}>Publicar</Dropdown.Item>}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </td>
                        </tr >
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

    return (
        <>
            <h2>Notícias</h2>

            <AtualizarTipoCursoContext.Provider value={{ atualizar: setAtualizarGrid, fechar: fecharModals }}>
                <TipoCursoNovo />
                {modal}
            </AtualizarTipoCursoContext.Provider>

            <Table striped hover>
                <thead>
                    <tr>
                        <th>Autor</th>
                        <th>Titulo</th>
                        <th>Sub-Titulo</th>
                        <th>Texto</th>
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