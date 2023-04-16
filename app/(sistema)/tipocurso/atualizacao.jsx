import BusyButton from "@/app/componentes/buusybutton";
import { useEffect, useState, useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from "./novo";
import { MessageCallbackContext } from "../layout";
import { AtualizarTipoCursoContext } from "./page";

export default function TipoCursoAtualizacao(props) {

    const [modalShow, setModalShow] = useState(true);
    const [busy, setBusy] = useState(false);
    const [primeiroAcesso, setPrimeiroAcesso] = useState(null);

    const messageCallback = useContext(MessageCallbackContext);
    const atualizarCallback = useContext(AtualizarTipoCursoContext);

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const handleClose = () => {
        atualizarCallback.fechar();
        setModalShow(false);
    }

    const onSubmit = (data) => {
        setBusy(true);

        data.id = props.id;

        const url = '/api/tipocurso/' + props.id;
        var args = {
            method: 'PUT',
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
                    atualizarCallback.atualizar(true);
                    messageCallback({ tipo: 'sucesso', texto: resultData });
                })
            }
            else{
                messageCallback({tipo: 'erro', texto: result.statusText});
            }
        });
    }

    useEffect(() => {
        if (modalShow === false) {
            reset({ nome: '', descricao: '' })
        }
    }, [modalShow]);

    useEffect(() => {
        if (primeiroAcesso === null)
            setPrimeiroAcesso(true);
        if (primeiroAcesso) {
            setPrimeiroAcesso(false);
            const url = '/api/tipocurso/' + props.id;
            fetch(url).then(
                (result) => {
                    if (result.status === 200) {
                        result.json().then((data) => {
                            reset({ nome: data.nome, descricao: data.descricao });
                        })
                    }
                    else {
                        handleClose();
                        messageCallback({ tipo: 'erro', texto: result.statusText });
                    }
                }
            );
        }
    }, [primeiroAcesso]);

    return (
        <Modal size="md" centered show={modalShow}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Header>
                    <Modal.Title>Atualização de Tipo de Curso</Modal.Title>
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
                    <BusyButton variant="success" type="submit" label="Salvar" busy={busy} />
                    <Button variant="secondary" onClick={handleClose}>Fechar</Button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}