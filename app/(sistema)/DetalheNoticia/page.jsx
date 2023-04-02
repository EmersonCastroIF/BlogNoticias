'use client';

import Noticia from "./noticia"
import Comentario from "./comentario"
import Comentar from "./comentar"

export const metadata = {
    title: 'Notícia'
}

export default function Page(){
    return(
        <>
            <Noticia/>
            <Comentario/>
            <Comentario/>
            <Comentar/>
        </>
    )
}