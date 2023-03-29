'use client'

import Link from "next/link";
import { createContext } from "react";
import Image from "next/image";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import logo from "./logo.png";
import FooterPage from "./footer"

export const MessageCallbackContext = createContext(null);
const MySwal = withReactContent(Swal);

export default function Layout({ children }) {

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
                                    <Link href="/CadastroLeitor" legacyBehavior passHref>
                                        <NavDropdown.Item>Publicações</NavDropdown.Item>
                                    </Link>
                                    <Link href="/EsqueceuSenha" legacyBehavior passHref>
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
                            <Link href="/Login" legacyBehavior passHref>
                                    <Nav.Link>Entrar</Nav.Link>
                                </Link>
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
        </>
    )
}