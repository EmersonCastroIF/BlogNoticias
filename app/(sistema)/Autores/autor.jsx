'use client'

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useRouter } from 'next/navigation';



export default function Autor() {
    const router = useRouter();

    function handleNoticasAutor() {
        router.push('/Joao');
    }    

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>Nome Autor</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item>Publicações (10) </ListGroup.Item>
            </ListGroup>
            <Card.Body>
                <Button onClick={handleNoticasAutor}>Publiçãoes do Autor</Button>
            </Card.Body>
        </Card>
    );
}
