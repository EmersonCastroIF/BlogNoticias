'use client'

import { Button, Modal } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { MessageCallbackContext } from "../layout";

const schema = yup.object({
    nome: yup.string()
        .min(3, 'O nome deve conter, no mínimo, 3 caracteres')
        .max(100, 'O nome deve conter, no máximo, 100 caracteres')
        .required('O nome é obrigatório'),
    descricao: yup.string()
        .min(5, 'A descrição deve conter, no mínimo, 5 caracteres')
        .required('A descrição é obrigatória')
}).required();

export default function TipoCursoNovo() {
    const [modalShow, setModalShow] = useState(false);
    const messageCallback = useContext(MessageCallbackContext);

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        console.log(data);
        setModalShow(false);

        if (true)
            messageCallback({ tipo: 'sucesso', texto: 'Tipo de Curso salvo com sucesso!' });
        else
            messageCallback({ tipo: 'erro', texto: 'Erro ao salvar o tipo de curso: ' });
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
                        <Modal.Title>Novo Tipo de Curso</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label className="row mx-2">
                            Nome
                            <input type="text" className="form-control"  {...register("nome")} />
                            <span className='text-danger'>{errors.nome?.message}</span>
                        </label>
                        <label className="row mx-2 mt-2">
                            Descrição
                            <textarea className="form-control" style={{ height: '120px' }}  {...register("descricao")} />
                            <span className='text-danger'>{errors.descricao?.message}</span>
                        </label>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" type="submit">Salvar</Button>
                        <Button variant="secondary" onClick={handleClose}>Fechar</Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    )
}