'use client';

import Noticia from "./noticia"
import Comentario from "./comentario"
import Comentar from "./comentar"
import { useSearchParams } from 'next/navigation';
import { useEffect } from "react"
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { createContext } from "react"

export const metadata = {
    title: 'Autor'
}

export const AtualizarComentariosContext = createContext(null);

export default function Page() {
    const searchParams = useSearchParams();
    const [comentarios, setComentarios] = useState([]);
    const [cookies, setCookie, removeCookie] = useCookies();
    const [atualizarComentarios, setAtualizarComentarios] = useState(null);
    const id = searchParams.get('id');
    
    const pesquisar = () => {
        console.log("pesquisouuu");
        const url = '/api/Comentario/' + id;
        fetch(url)
            .then(response => response.json()) // Extrai os dados em formato JSON
            .then(data => setComentarios(data)) // Atualiza o estado das notícias com os dados obtidos
            .catch(error => console.log(error)); // Lida com possíveis erros na chamada
        console.log(comentarios)
    }

    useEffect(() => {
        if (atualizarComentarios === null)
            setAtualizarComentarios(true);
        if (atualizarComentarios) {
            setAtualizarComentarios(false);
            pesquisar();
        }

    }, [atualizarComentarios])


    return (
        <>
            <AtualizarComentariosContext.Provider value={{ atualizar: setAtualizarComentarios }}>
                {id !== null ? <Noticia id={id} idUsuario={cookies.id_user}/> : <p>Carregando...</p>}
                {comentarios.map((info) => (
                    <Comentario idComentario={info.id} texto={info.texto} usuario={info.usuario.nome} idNoticia={id} />
                ))}
                <Comentar idNoticia={id} idUsuario={cookies.id_user} />
            </AtualizarComentariosContext.Provider>
        </>
    )
}