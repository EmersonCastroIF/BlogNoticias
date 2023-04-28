'use client'

import { useState, useContext } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { MessageCallbackContext } from "../layout";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import BusyButton from "../../componentes/buusybutton";
import { AtualizarComentariosContext } from './page';
import { useCookies } from 'react-cookie';

export default function Comentario(props) {
  const router = useRouter();
  const [comentario, setComentario] = useState('');
  const messageCallback = useContext(MessageCallbackContext);
  const { register, handleSubmit, formState: { errors } } = useForm({
  });
  const [busy, setBusy] = useState(false);
  const atualizarCallback = useContext(AtualizarComentariosContext);
  const [cookies, setCookie, removeCookie] = useCookies();

  const onSubmit = (event) => {
    setBusy(true);
    const formattedDateTime = new Date();
    const url = '/api/Comentario';
    console.log(comentario);
    const textoC = comentario;
    const data = { usuarioId: props.idUsuario, idNoticia: props.idNoticia, texto: textoC, data: formattedDateTime };
    console.log(data);

    var args = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

    fetch(url, args).then((result) => {
      setBusy(false);
      if (result.status === 200) {
        result.json().then((resultData) => {
          atualizarCallback.atualizar(true);
          messageCallback({ tipo: 'sucesso', texto: resultData });
        })
      }
      else {
        messageCallback({ tipo: 'erro', texto: result.statusText });;
      }
    });
  }

  function handleComentarioChange(event) {

    console.log(cookies.id_user)
    console.log(cookies.bloqueado)
    setComentario(event.target.value);
  }

  return (
    <>
   
      {cookies.id_user && parseInt(cookies.bloqueado) !== 1 ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="my-4">
            <FloatingLabel controlId="floatingTextarea2" label="Comentar">
              <Form.Control
                as="textarea"
                placeholder="Leave a comment here"
                value={comentario}
                name="comentario"
                onChange={handleComentarioChange}
                style={{ height: '100px' }}
              />
            </FloatingLabel>
            <div className="my-4">
              <BusyButton variant="primary" type="submit" label="Comentar" busy={busy} />
            </div>
          </div>
        </form>
      ) : (
        <div>
  
        </div>
      )}
    </>
  );
}
















