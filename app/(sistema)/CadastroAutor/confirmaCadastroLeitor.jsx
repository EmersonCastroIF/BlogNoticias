'use client'

import { Button, Modal } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { MessageCallbackContext } from "../layout";
import { useRouter } from 'next/navigation';


const schema = yup.object({
  codigo: yup.string()
    .min(5, 'O código deve conter, no mínimo, 3 caracteres')
    .required('O código é obrigatório'),
  email: yup.string()
    .min(5, 'O e-mail deve conter, no mínimo, 5 caracteres')
    .required('O e-mail é obrigatório')
}).required();

export function AbrirModal(props) {
  const router = useRouter();
  const messageCallback = useContext(MessageCallbackContext);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data) => {
    console.log(data);

    if (true) {
      messageCallback({ tipo: 'sucesso', texto: 'Cadastro Realizado com Sucesso !' });
      router.push('/Autores');
    }
    else
      messageCallback({ tipo: 'erro', texto: 'Erro ao realizar confirmação de cadastro: ' });
  }

  return (
      <Modal show={props.showModal} onHide={props.handleCloseModal}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmar Cadastro</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label className="row mx-2 mt-2">
              E-mail
              <input type="email" defaultValue={props.emailDigitado} className="form-control"  {...register("email")} />
              <span className='text-danger'>{errors.email?.message}</span>
            </label>
            <label className="row mx-2">
              Código de Ativação
              <input type="text" className="form-control"  {...register("codigo")} />
              <span className='text-danger'>{errors.codigo?.message}</span>
            </label>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" type="submit">Salvar</Button>
            <Button variant="secondary" onClick={props.handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
  );
}