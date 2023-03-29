'use client'

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from "next/link";

export default function Noticia() {
  return (
    <Card>
      <Link href="/DetalheNoticia" legacyBehavior passHref>
        <Card.Header as="h5">Titulo</Card.Header>
      </Link>

      <Card.Body>
        <Card.Title>Data da Publicação :  23/02/02</Card.Title>
        <Card.Text>
          Sub Titulo
        </Card.Text>
        <Button variant="primary">Leia Mais</Button>
      </Card.Body>
    </Card>
  );
}
