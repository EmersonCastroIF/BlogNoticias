import TipoCursoNovo from "./novo"

export const metadata = {
    title: 'Autores'
}

export default function Page(){
    return(
        <>
            <h2>Tipo de Curso</h2>
            <h4>Exemplo de CRUD para Tipo de Curso</h4>
            <TipoCursoNovo/>
        </>
    )
}