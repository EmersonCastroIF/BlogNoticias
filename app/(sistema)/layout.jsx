'use client'

import Link from "next/link";
import { createContext, useContext, useEffect, useState } from "react";
import Image from "next/image";
import { Container, Nav, Navbar, NavDropdown, Button, Modal, Form } from "react-bootstrap";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import logo from "./logo.png";
import FooterPage from "./footer"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

export const MessageCallbackContext = createContext(null);
const MySwal = withReactContent(Swal);

export default function Layout({ children }) {
    const [Logado, setLogado] = useState(false);
    const messageCallback = useContext(MessageCallbackContext);

    const handleMessageCallback = (msg) => {
        if (msg.tipo !== 'nada') {
            let icon = '';
            if (msg.tipo === 'sucesso')
                icon = 'success';
            if (msg.tipo === 'alerta')
                icon = 'warning';
            else if (msg.tipo === 'erro')
                icon = 'error';

            MySwal.fire({
                position: 'top-end',
                icon: icon,
                title: msg.texto,
                showConfirmButton: false,
                timer: 5000,
                toast: true
            })
        }
    }

    function Mensagem(msg){
        if (msg.tipo !== 'nada') {
            let icon = '';
            if (msg.tipo === 'sucesso')
                icon = 'success';
            if (msg.tipo === 'alerta')
                icon = 'warning';
            else if (msg.tipo === 'erro')
                icon = 'error';

            MySwal.fire({
                position: 'top-end',
                icon: icon,
                title: msg.texto,
                showConfirmButton: false,
                timer: 5000,
                toast: true
            })
        }
    }


    const schema = yup.object({
        email: yup.string()
            .min(3, 'O E-mail deve conter, no mínimo, 3 caracteres')
            .max(100, 'O E-mail deve conter, no máximo, 100 caracteres')
            .required('O E-mail é obrigatório'),
        senha: yup.string()
            .min(5, 'A senha deve conter, no mínimo, 5 caracteres')
            .required('A senha é obrigatória')
    }).required();



    const [modalShow, setModalShow] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        console.log(data);

        if (true) {
            setModalShow(false);
            Mensagem({ tipo: 'sucesso', texto: 'Login Realizado com Sucesso!' });
        }
        else {
            Mensagem({ tipo: 'erro', texto: 'Erro ao realizar Login. ' });
        }
    }

    const handleClose = () => {
        setModalShow(false);
    }

    useEffect(() => {
        if (modalShow === false) {
            reset({ email: '', senha: '' })
        }
    }, [modalShow]);


    return (
        <>
            <Navbar bg="light" variant="light" expand="lg">
                <Container>
                    <Navbar.Brand>
                        <Image src={logo} alt="Logo" width={40} height={40} />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Link href="/" legacyBehavior passHref>
                                <Nav.Link>Noticias</Nav.Link>
                            </Link>
                            <Nav>
                                <NavDropdown title="Autores">
                                    <Link href="/CadastroAutor" legacyBehavior passHref>
                                        <NavDropdown.Item>Cadastro de Autor</NavDropdown.Item>
                                    </Link>
                                    <Link href="/Autores" legacyBehavior passHref>
                                        <NavDropdown.Item>Publicações</NavDropdown.Item>
                                    </Link>
                                    <Link href="/GerenciamentoPublicacoes" legacyBehavior passHref>
                                        <NavDropdown.Item>Gerenciamento</NavDropdown.Item>
                                    </Link>
                                </NavDropdown>
                            </Nav>
                            <Nav>
                                <NavDropdown title="Leitores">
                                    <Link href="/CadastroLeitor" legacyBehavior passHref>
                                        <NavDropdown.Item>Cadastro de Leitor</NavDropdown.Item>
                                    </Link>
                                    <Link href="/CadastroLeitor" legacyBehavior passHref>
                                        <NavDropdown.Item>Gerenciamento</NavDropdown.Item>
                                    </Link>
                                </NavDropdown>
                            </Nav>
                        </Nav>
                        <Nav>
                            <Button onClick={() => setModalShow(true)}>
                                <FontAwesomeIcon icon={faUser} /> | Entrar
                            </Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <MessageCallbackContext.Provider value={handleMessageCallback}>
                <Container style={{ marginLeft: "3cm", marginRight: "3cm" }}>
                    {children}
                </Container>
                <FooterPage />
            </MessageCallbackContext.Provider>


            <Modal show={modalShow}>
                <Modal.Header closeButton onClick={handleClose} >
                </Modal.Header>
                <Modal.Header className="row mx-2 justify-content-center" >
                    <Image src={logo} alt="Logo" width={100} height={100} className="mx-auto" style={{ maxWidth: '30.6%', maxHeight: '66.6%' }} />
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group controlId="email" className="row mx-2 mt-2">
                            <Form.Control type="email" placeholder="Email" required title="Digite seu endereço de e-mail" {...register("email")} />
                            <span className='text-danger'>{errors.email?.message}</span>
                        </Form.Group>
                        <Form.Group controlId="senha" className="row mx-2 mt-2">
                            <Form.Control type="senha" placeholder="Senha" required title="Digite sua senha" {...register("senha")} />
                            <span className='text-danger'>{errors.senha?.message}</span>
                        </Form.Group>
                        <div className="d-flex justify-content-between align-items-center">
                            <Button className="row mx-2 mt-2 mr-auto" variant="warning" onClick={() => console.log('Forgot password')}>
                                Esqueceu a senha?
                            </Button>
                            <Button className="row mx-2 mt-2 ml-2 mr-2" variant="primary" type="submit">
                                Login
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}