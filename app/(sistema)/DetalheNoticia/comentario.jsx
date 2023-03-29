'use client'

import Card from 'react-bootstrap/Card';

export default function Comentario() {

    return (
        <div className="my-4">
            <Card>
                <Card.Header>Usuário</Card.Header>
                <Card.Body>
                    <blockquote className="blockquote mb-0">
                        <footer className="blockquote-footer">
                            Comentário do Leitor
                        </footer>
                    </blockquote>
                </Card.Body>
            </Card>
        </div>
    );
}
