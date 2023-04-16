'use client'

import { useEffect, useContext } from "react"
import { createContext } from "react"
import { useState } from "react"
import { Table } from "react-bootstrap"
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import BusyButton from "@/app/componentes/buusybutton";
import { MessageCallbackContext } from "../layout";

export const metadata = {
    title: 'Leitores'
}

export const LeitoresContext = createContext(null);

export default function Page() {

    const [grid, setGrid] = useState(null);
    const [atualizarGrid, setAtualizarGrid] = useState(null);
    const messageCallback = useContext(MessageCallbackContext);
    const [busy, setBusy] = useState(false);

    const handleBloqueadoChange = (value, p) => {
        p.bloqueado = value;
        verificarBloqueado(p);
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
                    // handleClose();
                    // atualizarCallback.atualizar(true);
                    messageCallback({ tipo: 'sucesso', texto: resultData });
                })
            }
            else{
                messageCallback({tipo: 'erro', texto: result.statusText});
            }
        });

        // fetch(url, { ...args, timeout: 30 }).then((result) => {
        //     result.json().then((resultData) => {
        //         setBusy(false);
        //         if (result.status == 200) {
        //             messageCallback({ tipo: 'sucesso', texto: resultData });
        //         } else {
        //             let errorMessage = '';
        //             if (resultData.errors != null) {
        //                 const totalErros = Object.keys(resultData.errors).length;
        //                 for (var i = 0; i < totalErros; i++)
        //                     errorMessage = errorMessage + Object.values(resultData.errors)[i] + "<br/>";
        //             } else
        //                 errorMessage = resultData;

        //             messageCallback({ tipo: 'erro', texto: errorMessage });
        //         }
        //     });
        // }).catch((error) => {
        //     messageCallback({ tipo: 'erro', texto: 'Tempo limite excedido. Tente novamente.' });
        //     setBusy(false);

        // });
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
            <Table striped hover>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Bloqueado</th>
                    </tr>
                </thead>
                <tbody>
                    {grid}
                </tbody>
            </Table>
        </>
    )
}