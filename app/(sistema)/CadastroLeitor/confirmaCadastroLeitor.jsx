'use client'

import BusyButton from "@/app/componentes/buusybutton";
import { useEffect, useState, useContext } from "react";
import { Button, Modal, Form, Div, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { MessageCallbackContext } from "../layout";
import { ConfirmarCadastroContext } from "../layout";
import { useCookies } from 'react-cookie';

export const schema = yup.object({
  codigoAtivacao: yup.string()
    .min(10, 'O Código deve conter, no mínimo, 10 caracteres')
    .required('O Código é obrigatório'),
}).required();

export default function ConfirmarCadastro(props) {

  const [modalShow, setModalShow] = useState(true);
  const [busy, setBusy] = useState(false);
  const messageCallback = useContext(MessageCallbackContext);
  const atualizarCallback = useContext(ConfirmarCadastroContext);
  const [reenviarCodigoBusy, setReenviarCodigoBusy] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const handleClose = () => {
    atualizarCallback.fechar();
    setModalShow(false);
  }

  const handleReenviarCodigo = () => {
    setReenviarCodigoBusy(true);
    const url = '/api/Email';
    const Dados = { idUser: 15 };

    var args = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(Dados)
    };

    fetch(url, args).then((result) => {
      setReenviarCodigoBusy(false);
      if (result.status === 200) {
        result.json().then((resultData) => {
          handleClose();
          messageCallback({ tipo: 'sucesso', texto: resultData });
        })
      }
      else {
        messageCallback({ tipo: 'erro', texto: result.statusText });;
      }
    });
  }

  const onSubmit = (data) => {
    setBusy(true);

    const url = '/api/ConfirmaCadastro';
    data = { idUser: 15 , codigoAtivacao: data.codigoAtivacao };

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
          handleClose();
          messageCallback({ tipo: 'sucesso', texto: resultData });
        })
      }
      else {
        messageCallback({ tipo: 'erro', texto: result.statusText });;
      }
    });
  }

  useEffect(() => {
    if (modalShow === false) {
      reset({ titulo: '', subTitulo: '', texto: '' })
    }
  }, [modalShow]);


  return (
    <Modal size="md" centered show={modalShow}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header>
          <Modal.Title>Confirmar Cadastro</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <label className="row mx-2">
            Código de Confirmação
            <input type="text" className="form-control"  {...register("codigoAtivacao")} />
            <span className='text-danger'>{errors.codigoAtivacao?.message}</span>
          </label>
        </Modal.Body>
        <Modal.Footer>
          <Button disabled={reenviarCodigoBusy} variant="primary" onClick={handleReenviarCodigo}>Re-enviar Código
          &nbsp; {reenviarCodigoBusy ? <Spinner animation="border" size="sm" /> : null} </Button>
          <BusyButton variant="success" type="submit" label="Validar" busy={busy} />
          <Button variant="secondary" onClick={handleClose}>Fechar</Button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}