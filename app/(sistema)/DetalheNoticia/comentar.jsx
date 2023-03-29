'use client'

import { useState,useContext } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { MessageCallbackContext } from "../layout";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';


export default function Comentario() {
  const router = useRouter();
  const [comentario, setComentario] = useState('');
  const messageCallback = useContext(MessageCallbackContext);
  const { register, handleSubmit, formState: { errors } } = useForm({
    
  });

  const onSubmit = (data) => {
    console.log(data);

    if (true) {
        messageCallback({ tipo: 'sucesso', texto: 'Comentário Realizado com Sucesso !' });
        window.location.reload();
    }
    else
      messageCallback({ tipo: 'erro', texto: 'Erro ao realizar confirmação de cadastro: ' });
  }

  function handleComentarioChange(event) {
    setComentario(event.target.value);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="my-4">
        <FloatingLabel controlId="floatingTextarea2" label="Comentar">
          <Form.Control
            as="textarea"
            placeholder="Leave a comment here"
            value={comentario}
            onChange={handleComentarioChange}
            style={{ height: '100px' }}
          />
        </FloatingLabel>
        <Button type="submit" className="mt-3">Enviar Comentário</Button>
      </div>
    </form>
  );
}