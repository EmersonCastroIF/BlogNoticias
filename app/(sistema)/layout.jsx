'use client'

import Link from "next/link";
import { createContext } from "react";
import Image from "next/image";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import logo from "./logo.png";
import { css } from '@emotion/css';

export const MessageCallbackContext = createContext(null);
const MySwal = withReactContent(Swal);

const footerStyles = css`
  padding: 1rem;
  position: fixed;
  bottom: 0;
  text-align: center;
  width: 100%
`;

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
                            <Link href="/Autores" legacyBehavior passHref>
                                <Nav.Link>Autores</Nav.Link>
                            </Link>
                        </Nav>
                        <Nav>
                            <NavDropdown title="Leitores">
                                <Link href="/CadastroLeitor" legacyBehavior passHref>
                                    <NavDropdown.Item>Cadastro</NavDropdown.Item>
                                </Link>
                                <Link href="/EsqueceuSenha" legacyBehavior passHref>
                                    <NavDropdown.Item>Esqueceu a senha ?</NavDropdown.Item>
                                </Link>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <MessageCallbackContext.Provider value={handleMessageCallback}>
                <Container style={{ marginLeft: "3cm", marginRight: "3cm" }}>
                    {children}
                </Container>
                <div className={footerStyles}> © 2023 E.R.System in Barretos, SP - All Rights Reserved </div>
            </MessageCallbackContext.Provider>
        </>
    )
}