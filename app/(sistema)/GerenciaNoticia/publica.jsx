import BusyButton from "@/app/componentes/buusybutton";
import { useContext, useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { MessageCallbackContext } from "../layout";
import { AtualizarTipoCursoContext } from "./page";

export default function NoticiaPublicacao(props) {

    const [modalShow, setModalShow] = useState(true);
    const [busy, setBusy] = useState(false);
    const [primeiroAcesso, setPrimeiroAcesso] = useState(null);
    const [noticia, setNoticia] = useState(null);

    const atualizarCallback = useContext(AtualizarTipoCursoContext);
    const messageCallback = useContext(MessageCallbackContext);

    const { handleSubmit } = useForm();

    const handleClose = () => {
        atualizarCallback.fechar();
        setModalShow(false);
    }

    const onSubmit = (data) => {
        setBusy(true);
         data = noticia;
         noticia.Publicado = true;
         
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
                            setNoticia(data);
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
                    <Modal.Title>Publicação da Notícia</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Deseja realmente confirmar Publicação da Notícia?
                </Modal.Body>
                <Modal.Footer>
                    <BusyButton variant="warning" type="submit" label="Publicar" busy={busy} />
                    <Button variant="secondary" onClick={handleClose}>Fechar</Button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}