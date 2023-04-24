import BusyButton from "@/app/componentes/buusybutton";
import { useEffect, useState, useContext } from "react";
import { Button, Modal, Form } from "react-bootstrap";
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
        data.UsuarioId = props.usuarioId;

        const url = '/api/noticia/' + props.id;
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
            else {
                messageCallback({ tipo: 'erro', texto: result.statusText });
            }
        });
    }

    useEffect(() => {
        if (modalShow === false) {
            reset({ titulo: '', subTitulo: '', texto: '' })
        }
    }, [modalShow]);

    useEffect(() => {
        if (primeiroAcesso === null)
            setPrimeiroAcesso(true);
        if (primeiroAcesso) {
            setPrimeiroAcesso(false);
            console.log(props.id);
            const url = '/api/noticia/' + props.id;
            fetch(url).then(
                (result) => {
                    if (result.status === 200) {
                        result.json().then((data) => {
                            reset({ titulo: data.titulo, subTitulo: data.subTitulo, texto: data.texto });
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
                    <Modal.Title>Atualização de Notícia</Modal.Title>
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
    )
}