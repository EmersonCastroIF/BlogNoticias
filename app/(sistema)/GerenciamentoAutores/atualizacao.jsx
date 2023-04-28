import BusyButton from "../../componentes/buusybutton";
import { useEffect, useState, useContext } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { MessageCallbackContext } from "../layout";
import { AtualizarAutoresContext } from "./page";
import * as yup from "yup";

const schema = yup.object({
    nome: yup.string()
        .min(5, 'O nome deve conter, no mínimo, 5 caracteres')
        .max(100, 'O nome deve conter, no máximo, 100 caracteres')
        .required('O nome é obrigatório')
}).required();

export default function AutorAtualizacao(props) {

    const [modalShow, setModalShow] = useState(true);
    const [busy, setBusy] = useState(false);
    const [primeiroAcesso, setPrimeiroAcesso] = useState(null);

    const messageCallback = useContext(MessageCallbackContext);
    const atualizarCallback = useContext(AtualizarAutoresContext);

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const handleClose = () => {
        atualizarCallback.fechar();
        setModalShow(false);
    }

    const onSubmit = (data) => {
        console.log(data)
        const Dados = { idUser: props.usuarioId, nome: data.nome };
        console.log(Dados)
        setBusy(true);

        const url = '/api/RedefineNomeAutor'
        var args = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Dados)
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
            reset({ nome: '' })
        }
    }, [modalShow]);

    useEffect(() => {
        if (primeiroAcesso === null)
            setPrimeiroAcesso(true);
        if (primeiroAcesso) {
            setPrimeiroAcesso(false);
            console.log(props.id);
            const url = '/api/leitor/' + props.id;
            fetch(url).then(
                (result) => {
                    if (result.status === 200) {
                        result.json().then((data) => {
                            reset({ nome: data.nome });
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
                    <div className="row mx-2" style={{ marginBottom: "0.20cm" }}>
                        <label>
                            Nome
                            <input type="text" className="form-control" {...register("nome")} />
                            <span className='text-danger'>{errors.nome?.message}</span>
                        </label>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <BusyButton variant="success" type="submit" label="Salvar" busy={busy} />
                    <Button variant="secondary" onClick={handleClose}>Fechar</Button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}