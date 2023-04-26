'use client'

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from "next/link";
import { useState } from 'react';
import { useEffect } from "react"
import Reacoes from "./reacoes"


export default function Noticia(props) {
  const likes = 10; // exemplo de quantidade de likes
  const dislikes = 5; // exemplo de quantidade de dislikes
  const [noticia, setNoticia] = useState(null);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    console.log(props.id);
      const url = '/api/noticia/' + props.id;
      fetch(url).then(response => {
          if (!response.ok) {
              throw new Error(response.statusText);
          }
          return response.json();
      }).then(data => {
          setNoticia(data);
      }).catch(error => {
          setErro(error.message);
      });
  }, [props.id]);

  if (erro) {
      return <p>{erro}</p>;
  }

  if (!noticia) {
      return <p>Carregando...</p>;
  }

  const formattedDate = new Date(noticia.dataPublicacao).toLocaleDateString('pt-BR');

  return (
    <Card>
      
        <Card.Header as="h5">{noticia.titulo}</Card.Header>
     

      <Card.Body>
        <Card.Text>
          {noticia.texto}
        </Card.Text>
        <Card.Text>
          Data da Publicação :  {formattedDate}
        </Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">Autor : {noticia.usuario.nome}</Card.Footer>
      <Card.Footer className="text-muted">
        <Reacoes usuarioId={props.idUsuario} noticiaId={props.id} likes={noticia.qtdLike} dislikes={noticia.qtdDesLike} />
      </Card.Footer>
    </Card>
  );
}
