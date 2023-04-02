'use client'

import Card from 'react-bootstrap/Card';
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import { Button, Modal, Form } from "react-bootstrap";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import styles from '../../Styles.module.css';

export default function Noticia(noticia) {
  const router = useRouter();
  const idNoticia = noticia.id;
  const [comentario, setComentario] = useState('');

  const schema = yup.object({
    titulo: yup.string()
      .min(10, 'O Titulo deve conter, no mínimo, 3 caracteres')
      .required('O Titulo é obrigatório'),
    subtitulo: yup.string()
      .min(10, 'O SubTitulo deve conter, no mínimo, 3 caracteres')
      .required('O SubTitulo é obrigatório'),
    textoNoticia: yup.string()
      .min(10, 'A Notícia deve conter, no mínimo, 10 caracteres')
      .required('A Notícia é obrigatória')
  }).required();



  const [modalShow, setModalShow] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data) => {
    console.log(data);

    if (true) {
      setModalShow(false);
      Mensagem({ tipo: 'sucesso', texto: 'Login Realizado com Sucesso!' });
    }
    else {
      Mensagem({ tipo: 'erro', texto: 'Erro ao realizar Login. ' });
    }
  }

  const handleClose = () => {
    setModalShow(false);
  }

  function handleComentarioChange(event) {
    setComentario(event.target.value);
  }

  return (
    <>
      <div className="mb-4">
        <Card>

          <Card.Header as="h5">
            <Link
              href={{
                pathname: '/DetalheNoticia',
                query: { id: idNoticia },
              }}
            >
              {noticia.titulo} - {noticia.subtitulo}
            </Link>
          </Card.Header>

          <Card.Body>
            <Card.Title>{noticia.autor}</Card.Title>
            <Card.Text>
              {noticia.data}
            </Card.Text>
            {noticia.publicado !== '' && noticia.origem === 'Publicacoes' && (
              <Button className="mx-1" variant="primary">Publicar Noticia</Button>
            )}

            {noticia.publicado !== '' && noticia.origem === 'Publicacoes' && (
              <Button onClick={() => setModalShow(true)} className="mx-1" variant="warning">Editar</Button>
            )}

            {noticia.publicado !== '' && noticia.origem === 'Publicacoes' && (
              <Button onClick={() => setModalShow(true)} className="mx-1" variant="danger">Excluir</Button>
            )}

            {noticia.origem === 'Home' && (
              <Button className="mx-1" variant="primary">Ler mais</Button>
            )}


          </Card.Body>
        </Card>
      </div >

      <Modal show={modalShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Editar Publicação</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="email" className="row mx-2 mt-2">
              <div className="my-3">
                Titulo
                <input type="titulo" className="form-control"  {...register("titulo")} />
                <span className='text-danger'>{errors.titulo?.message}</span>
              </div>
              <div className="my-3">
                SubTitulo
                <input type="subtitulo" className="form-control"  {...register("subtitulo")} />
                <span className='text-danger'>{errors.subtitulo?.message}</span>
              </div>
              <div className="my-3">
                Texto da Notícia
                <FloatingLabel controlId="floatingTextarea2" label="">
                  <Form.Control {...register("textoNoticia")}
                    as="textarea"
                    placeholder="Digite o texto da Notícia"
                    value={comentario}
                    onChange={handleComentarioChange}
                    style={{ height: '100px' }}
                  />
                  <span className='text-danger'>{errors.textoNoticia?.message}</span>
                </FloatingLabel>
              </div>
            </Form.Group>
            <div className="d-flex justify-content-between align-items-center">
              <Button className={styles.PosicionaDireita} variant="primary" type="submit">
                Salvar
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

    </>

  );
}
