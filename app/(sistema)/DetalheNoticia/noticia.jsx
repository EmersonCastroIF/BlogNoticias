'use client'

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from "next/link";
import Reacoes from "./reacoes"

export default function Noticia() {
  const likes = 10; // exemplo de quantidade de likes
  const dislikes = 5; // exemplo de quantidade de dislikes
  
  return (
    <Card>
      <Link href="/CadastroLeitor" legacyBehavior passHref>
        <Card.Header as="h5">Titulo </Card.Header>
      </Link>

      <Card.Body>
        <Card.Title>Sub Titulo</Card.Title>
        <Card.Text>
          Texto da Noticia
        </Card.Text>
        <Card.Text>
          Data da Publicação :  23/02/02
        </Card.Text>
        <Button variant="primary">Leia Mais</Button>
      </Card.Body>
      <Card.Footer className="text-muted">Autor</Card.Footer>
      <Card.Footer className="text-muted">
        <Reacoes likes={likes} dislikes={dislikes} />
      </Card.Footer>
    </Card>
  );
}
