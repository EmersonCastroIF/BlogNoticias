import BusyButton from "@/app/componentes/buusybutton";
import { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { MessageCallbackContext } from "../layout";
import { AtualizarTipoCursoContext } from "./page";

export default function TipoCursoRemover(props) {

    const [modalShow, setModalShow] = useState(true);
    const [busy, setBusy] = useState(false);

    const atualizarCallback = useContext(AtualizarTipoCursoContext);
    const messageCallback = useContext(MessageCallbackContext);

    const { handleSubmit } = useForm();

    const handleClose = () => {
        atualizarCallback.fechar();
        setModalShow(false);
    }

    const onSubmit = () => {
        setBusy(true);
        const url = '/api/tipocurso/' + props.id;
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
                    <Modal.Title>Remoção de Tipo de Curso</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Deseja realmente remover este tipo de curso?
                </Modal.Body>
                <Modal.Footer>
                    <BusyButton variant="danger" type="submit" label="Remover" busy={busy} />
                    <Button variant="secondary" onClick={handleClose}>Fechar</Button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}