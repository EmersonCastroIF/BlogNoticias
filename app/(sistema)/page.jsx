'use client';

import Noticia from "./Noticia/page.jsx"
import { useState } from 'react';
import {  Button } from "react-bootstrap";
import styles from './../Styles.module.css';
import { useEffect } from "react"

export const metadata = {
    title: 'Notícias'
}



export default function Page() {

    const [noticias, setNoticias] = useState([]);

    useEffect(() => {
        const url = '/api/noticia';
        fetch(url)
            .then(response => response.json()) // Extrai os dados em formato JSON
            .then(data => setNoticias(data)) // Atualiza o estado das notícias com os dados obtidos
            .catch(error => console.log(error)); // Lida com possíveis erros na chamada
            console.log(noticias)
    }, []);  

    return (
        <>
            <h2>Notícias Publicadas</h2>

            {noticias.map((info) => (
                <Noticia origem={'Home'} id={info.id} titulo={info.titulo} subtitulo={info.subTitulo} data={info.texto} autor={info.usuario.nome} />
            ))}
            <Button variant="light" type="submit" className={styles.PosicionaDireita}>
                Ver Mais
            </Button>

        </>
    )
}