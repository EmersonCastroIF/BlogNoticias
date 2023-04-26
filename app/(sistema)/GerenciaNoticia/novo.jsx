'use client'

import { Button, Modal } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { MessageCallbackContext } from "../layout";
import BusyButton from "@/app/componentes/buusybutton";
import { AtualizarTipoCursoContext } from "./page";

export const schema = yup.object({
    titulo: yup.string()
        .min(5, 'O Titulo deve conter, no mínimo, 3 caracteres')
        .max(100, 'O Titulo deve conter, no máximo, 100 caracteres')
        .required('O Titulo é obrigatório'),
        subTitulo: yup.string()
        .min(5, 'O Sub-Titulo deve conter, no mínimo, 5 caracteres')
        .max(100, 'O Sub-Titulo deve conter, no máximo, 100 caracteres')
        .required('O Sub-Titulo  é obrigatório'),
        texto: yup.string()
        .min(5, 'O Texto da notícia deve conter, no mínimo, 5 caracteres')
        .required('O Texto é obrigatória')        
}).required();

export default function TipoCursoNovo() {
    const [modalShow, setModalShow] = useState(false);
    const [busy, setBusy] = useState(false);

    const messageCallback = useContext(MessageCallbackContext);
    const atualizarCallback = useContext(AtualizarTipoCursoContext);

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        setBusy(true);

        const url = '/api/noticia';
        data.UsuarioId = 1;

        var args = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            'api-key': 'osidjfs8dfj9h9dfrejhterjhtbre',
            body: JSON.stringify(data)
        };

        fetch(url, args).then((result) => {
            setBusy(false);
            if (result.status === 200) {
                result.json().then((resultData) => {
                    handleClose();
                    atualizarCallback.atualizar(true);
                    messageCallback({ tipo: 'sucesso', texto: resultData });
                })
            }
            else{
                messageCallback({tipo: 'erro', texto: result.statusText});
            }
        
        });
        
    }

    const handleClose = () => {
        setModalShow(false);
    }

    useEffect(() => {
        if (modalShow === false) {
            reset({ nome: '', descricao: '' })
        }
    }, [modalShow]);

    return (
        <>
            <Button onClick={() => setModalShow(true)}>Novo</Button>

            <Modal size="md" centered show={modalShow}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Header>
                    <Modal.Title>Nova Notícia</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label className="row mx-2">
                        Titulo
                        <input type="text" className="form-control"  {...register("titulo")} />
                        <span className='text-danger'>{errors.titulo?.message}</span>
                    </label>
                    <label className="row mx-2 mt-2">
                        Sub-Titulo
                        <textarea className="form-control" style={{ height: '120px' }}  {...register("subTitulo")} />
                        <span className='text-danger'>{errors.subTitulo?.message}</span>
                    </label>
                    <label className="row mx-2 mt-2">
                        Texto da Notícia
                        <textarea className="form-control" style={{ height: '120px' }}  {...register("texto")} />
                        <span className='text-danger'>{errors.texto?.message}</span>
                    </label>
                </Modal.Body>
                <Modal.Footer>
                    <BusyButton variant="success" type="submit" label="Salvar" busy={busy} />
                    <Button variant="secondary" onClick={handleClose}>Fechar</Button>
                </Modal.Footer>
            </form>
        </Modal>
        </>
    )
}