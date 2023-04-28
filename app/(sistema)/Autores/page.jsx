'use client';

import Autor from "./autor"
import { useState } from 'react';
import { useEffect } from "react"

export const metadata = {
    title: 'Autores'
}

export default function Page() {
    const [autores, setAutores] = useState([]);

    useEffect(() => {
        const url = '/api/Autor';
        fetch(url)
            .then(response => response.json()) // Extrai os dados em formato JSON
            .then(data => setAutores(data)) // Atualiza o estado das notícias com os dados obtidos
            .catch(error => console.log(error)); // Lida com possíveis erros na chamada
        console.log(autores)
    }, []);

    return (
        <>
            <h2>Autores</h2>
            <div className="d-flex flex-wrap">
                {autores.map((info) => (
                    <Autor autor={info.nome} qtdPublicacoes={info.quantidadeNoticias} apelido={info.apelido} />
                ))}
            </div>

        </>
    )
}



