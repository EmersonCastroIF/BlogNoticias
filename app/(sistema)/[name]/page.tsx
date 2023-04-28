'use client';

import NoticiasAutor from "../page.jsx"
import { useRouter } from 'next/navigation.js';

export const metadata = {
    title: 'Notícias do Autors'
}


export default  function Page(
    {
    params,
}: {
    params: { name: string };
}) {
    const router = useRouter();

    return (
        <>
            <NoticiasAutor apelido={params.name}/>
        </>
    )
}