'use client'
import { useForm, watch } from "react-hook-form";
import Link from 'next/link'
import { Button, Modal, ProgressBar, Form, Spinner } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { MessageCallbackContext } from "../layout";
import { useRouter } from 'next/navigation';
import styles from '../../Styles.module.css';
import { useCookies } from 'react-cookie';
import BusyButton from "../../componentes/buusybutton";

const schema = yup.object({
  email: yup.string()
    .min(5, 'O e-mail deve conter, no mínimo, 5 caracteres')
    .required('O e-mail é obrigatório'),
  codigo: yup.string()
    .min(10, 'Mínimo, 10 caracteres'),
}).required();


export const metadata = {
  title: 'Alterar Email'
}

export default function Page() {
  const router = useRouter();
  const messageCallback = useContext(MessageCallbackContext);
  const [progressoSenha, setProgressoSenha] = useState(0);
  const [senhaAtendeRequisitos, setSenhaAtendeRequisitos] = useState(false);
  const [reenviarCodigoBusy, setReenviarCodigoBusy] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies();
  const [busy, setBusy] = useState(false);
  
  const { register, handleSubmit, reset, formState: { errors }, watch } = useForm({
    resolver: yupResolver(schema)
  });

  const handleEnviarCodigo = () => {
    setReenviarCodigoBusy(true);
    const url = '/api/Email';
    const Dados = { idUser: cookies.id_user, tipoCodigo: "Redefinicao-Email" };

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
    var emailNovo = "";
    emailNovo = data.email;
    const url = '/api/RedefineEmail';
    data = { idUser: cookies.id_user, codigoAtivacao: data.codigo, email: emailNovo };
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
          messageCallback({ tipo: 'sucesso', texto: resultData });
        })
      }
      else {
        messageCallback({ tipo: 'erro', texto: result.statusText });;
      }
    });
  }

  const handleClickCancelar = () => {
    router.push("/PainelControle");
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className={styles.header}>Alterar Email</div>
      <form onSubmit={handleSubmit(onSubmit)}>



        <div className="row mx-2" style={{ marginBottom: "0.20cm" }}>
          <label>
            Novo E-mail
            <input className="form-control" {...register("email")} />

            <span className='text-danger'>{errors.senha?.message}</span>
          </label>
        </div>
        <div className="row mx-2" style={{ marginBottom: "0.20cm" }}>
          <label>
            Confirma Novo E-mail
            <input className="form-control" {...register("email")} />
            <span className='text-danger'>{errors.senha?.message}</span>
          </label>
        </div>
        <div className="row mx-2" style={{ marginBottom: "0.20cm" }}>
          <label>
            Código
            <input className="form-control"  {...register("codigo")} />
            <span className='text-danger'>{errors.codigo?.message}</span>
          </label>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button disabled={reenviarCodigoBusy} variant="primary" onClick={handleEnviarCodigo} style={{ marginRight: "0.90cm" }}>Solicitar Código
            &nbsp; {reenviarCodigoBusy ? <Spinner animation="border" size="sm" /> : null} </Button>
          <Button variant="danger" onClick={handleClickCancelar} style={{ marginRight: "0.90cm" }}>Cancelar</Button>
          <BusyButton variant="success" type="submit" label="Salvar" busy={busy} />
        </div>
      </form>
    </>
  )
}
