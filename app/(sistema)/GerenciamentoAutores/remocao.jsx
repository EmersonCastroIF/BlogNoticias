import BusyButton from "../../componentes/buusybutton";
import { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { MessageCallbackContext } from "../layout";
import { AtualizarAutoresContext } from "./page";

export default function AutorRemover(props) {

    const [modalShow, setModalShow] = useState(true);
    const [busy, setBusy] = useState(false);

    const atualizarCallback = useContext(AtualizarAutoresContext);
    const messageCallback = useContext(MessageCallbackContext);

    const { handleSubmit } = useForm();

    const handleClose = () => {
        atualizarCallback.fechar();
        setModalShow(false);
    }

    const onSubmit = () => {
        setBusy(true);
        const url = '/api/leitor/' + props.id;
        var args = {
            method: 'DELETE'
        };
    
        fetch(url, args).then((result) => {
            setBusy(false);
            if (result.status === 200) {
                result.text().then((resultData) => {
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

    return (
        <Modal size="md" centered show={modalShow}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Header>
                    <Modal.Title>Remover Autor</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Deseja realmente remover este Autor?
                </Modal.Body>
                <Modal.Footer>
                    <BusyButton variant="danger" type="submit" label="Remover" busy={busy} />
                    <Button variant="secondary" onClick={handleClose}>Fechar</Button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}