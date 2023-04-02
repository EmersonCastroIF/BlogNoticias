'use client';

import Noticia from "../Noticia/page.jsx"
import { useState } from 'react';
import { Button } from "react-bootstrap";
import styles from '../../Styles.module.css';

export const metadata = {
    title: 'Notícias'
}



export default function Page() {
    const [noticias, setNoticias] = useState([
        { id: '1', titulo: 'A vaca morreu', subtitulo: 'No Mato', data: '10/01/01', autor: 'Matheus Borges', publicado: '02/04/2023' },
        { id: '2', titulo: 'A zebra é preta ou branca', subtitulo: 'Deve ser preta', data: '15/02/01', autor: 'João Castro', publicado: '' },
        { id: '3', titulo: 'A onça é braba', subtitulo: 'Matou o joãozim', data: '20/03/01', autor: 'Zacarias Matos', publicado: '02/04/2023' },
    ]);

    return (
        <>
            <h2>Publicações de Notícias</h2>

            {noticias.map((info) => (
                <Noticia origem={'Publicacoes'} id={info.id} titulo={info.titulo} subtitulo={info.subtitulo} data={info.data} autor={info.autor} publicado={info.publicado} />
            ))}


            <Button variant="light" type="submit" className={styles.PosicionaDireita}>
                Ver Mais
            </Button>
        </>
    )
}