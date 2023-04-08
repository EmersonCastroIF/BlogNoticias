'use client';

import Autor from "./autor"
import { useState } from 'react';

export const metadata = {
    title: 'Autores'
}

export default function Page() {
    const [autores, setAutores] = useState([
        { id: '1', autor: 'João Matos', qtdPublicacoes: '10', apelido: 'João' },
        { id: '2', autor: 'Zeca Pacheco', qtdPublicacoes: '20', apelido: 'Zeca' },
        { id: '3', autor: 'Tião do Mato', qtdPublicacoes: '30', apelido: 'Tião' },
        { id: '4', autor: 'Rafael do Sertão', qtdPublicacoes: '40', apelido: 'Rafael' },
        { id: '5', autor: 'Tiago Nunes', qtdPublicacoes: '40', apelido: 'Tiago' },
    ]);

    return (
        <>
            <h2>Autores</h2>
            <div className="d-flex flex-wrap">

                {autores.map((info) => (
                    <div className="w-25 mb-4">
                        <Autor autor={info.autor} qtdPublicacoes={info.qtdPublicacoes} apelido={info.apelido} />
                    </div>
                ))}

            </div>
        </>
    )
}