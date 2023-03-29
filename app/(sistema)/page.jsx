import Noticia from "./noticia"

export const metadata = {
    title: 'Notícias'
}

export default function Page(){
    return(
        <>
            <h2>Notícias</h2>
            <Noticia/>
            <Noticia/>
            <Noticia/>
        </>
    )
}