'use client'

import Card from 'react-bootstrap/Card';
import { AtualizarComentariosContext } from './page';
import { useState, useContext } from 'react';
import { MessageCallbackContext } from '../layout';
import { useCookies } from 'react-cookie';

export default function Comentario(props) {
    const atualizarCallback = useContext(AtualizarComentariosContext);
    const messageCallback = useContext(MessageCallbackContext);
    const [cookies, setCookie, removeCookie] = useCookies();

    const handleDelete = () => {
        console.log("ID DELETAR = " + props.idComentario)
        const url = '/api/Comentario/' + props.idComentario;
        var args = {
            method: 'DELETE'
        };

        fetch(url, args).then((result) => {
            if (result.status === 200) {
                result.json().then((resultData) => {
                    atualizarCallback.atualizar(true);
                    messageCallback({ tipo: 'sucesso', texto: resultData });
                })
            }
            else {
                messageCallback({ tipo: 'erro', texto: result.statusText });;
            }
        });
    }

    return (
        <div className="my-4">
            <Card>
                <Card.Header>{props.usuario}</Card.Header>
                <Card.Body>
                    <blockquote className="blockquote mb-0">
                        <footer className="blockquote-footer">
                            {props.texto}
                        </footer>
                    </blockquote>
                </Card.Body>
                <Card.Footer>
                    {cookies.tipo_usuario == "3" ? (
                        <div className="d-flex justify-content-end">
                            <button onClick={handleDelete} className="btn btn-light mx-2">Excluir</button>
                        </div>
                    ) : (
                        <div>

                        </div>
                    )}
                </Card.Footer>
            </Card>
        </div>
    );
}
