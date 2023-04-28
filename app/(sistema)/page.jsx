'use client';

import Noticia from "./Noticia/page.jsx"
import { useState } from 'react';
import { Button } from "react-bootstrap";
import styles from './../Styles.module.css';
import { useEffect } from "react"
import { useRouter } from 'next/navigation';

export const metadata = {
    title: 'Notícias'
}



export default function Page(props) {
    const router = useRouter();
    const [noticias, setNoticias] = useState([]);

    useEffect(() => {
        var url = ""
        if (!props.apelido) {
            url = '/api/noticia';
        }
        else {
            url = '/api/NoticiaApelido/' + props.apelido;
        }


        fetch('/api/ValidaADM')
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    router.push("/CadastroADM");
                }
            })
            .then(() => {
                fetch(url)
                    .then(response => response.json())
                    .then(data => setNoticias(data))
                    .catch(error => console.log(error));
            })
            .catch(error => console.log(error));
    }, [ props.apelido]);

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