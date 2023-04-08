'use client'

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useRouter } from 'next/navigation';



export default function Autor(autores) {
    const router = useRouter();

    function handleNoticasAutor() {
        router.push('/'+autores.apelido);
    }    

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{autores.autor}</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item>Publicações ({autores.qtdPublicacoes}) </ListGroup.Item>
            </ListGroup>
            <Card.Body>
                <Button onClick={handleNoticasAutor}>Publiçãoes do Autor</Button>
            </Card.Body>
        </Card>
    );
}
