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
import { faUser, faRightFromBracket, faSignOutAlt, faBell, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useCookies } from 'react-cookie';
import BusyButton from "./../componentes/buusybutton";
import ConfirmarCadastro from "./CadastroLeitor/confirmaCadastroLeitor"
import { useRouter } from 'next/navigation';

export const ConfirmarCadastroContext = createContext(null);
export const MessageCallbackContext = createContext(null);
const MySwal = withReactContent(Swal);

export default function Layout({ children }) {
    const messageCallback = useContext(MessageCallbackContext);
    const [busy, setBusy] = useState(false);
    const [ativo, setAtivo] = useState(true);
    const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
    const [cookiesFull, setCookieFull, removeCookieFull] = useCookies();
    const [Logado, setCookieValor] = useState(getLogado());
    const [atualizaBotaoConfirmar, setAtualizaBotaoConfirmar] = useState(null);
    const router = useRouter();
    const [operacao, setOperacao] = useState({ id: null, usuarioId: null, action: null });


    let modal = null;

    if (operacao.action === "confirmar") {
        modal = <ConfirmarCadastro id={operacao.id} usuarioId={operacao.usuarioId} showModal={true} />
    }


    const fecharModals = () => {
        setOperacao({ id: null, usuarioId: null, action: null });
    }


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

    function Mensagem(msg) {
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

    function handleLogout() {
        removeCookie('user');
        removeCookie('bloqueado');
        removeCookie('id_user');
        removeCookie('tipo_usuario');
        removeCookie('ativo');
        removeCookie('email');
        setCookieValor('');
        console.log("teste")
        router.push("/");
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
        setBusy(true);
        console.log(data);
        const url = '/api/Login';

        var args = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            'api-key': 'osidjfs8dfj9h9dfrejhterjhtbre',
            body: JSON.stringify(data)
        };

        fetch(url, args).then((result) => {
            setBusy(false);
            if (result.status === 200) {
                result.json().then((resultData) => {
                    console.log(result);
                    const ativoValue = resultData.ativo ? 1 : 0;
                    const bloqueadoValue = resultData.bloqueado ? 1 : 0;
                    setAtivo(resultData.ativo);
                    setCookie("ativo", ativoValue);
                    setCookie("bloqueado", bloqueadoValue);
                    setCookie("user", resultData.nome);
                    setCookie("id_user", resultData.id);
                    setCookie("tipo_usuario", resultData.tipoUsuario.id);
                    setCookie("email", resultData.email);
                    setCookieValor(resultData.nome);
                    Mensagem({ tipo: 'sucesso', texto: 'Bem Vindo ' + resultData.nome + ' !' });
                    setModalShow(false);
                    console.log(ativo);
                    router.push("/");
                })
            }
            else if (result.status === 400) {
                result.text().then((errorText) => {
                    console.log('erro' + result.statusText)
                    Mensagem({ tipo: 'erro', texto: result.statusText });
                    router.push("/");
                })
            }
            else {
                Mensagem({ tipo: 'erro', texto: 'Erro ao realizar Login. ' });
                router.push("/");
            }

        });

    }

    const handleClose = () => {
        setModalShow(false);
    }

    const handleClickCadastroLeitor = () => {
        router.push("/CadastroLeitor");
    };

    useEffect(() => {
        if (modalShow === false) {
            reset({ email: '', senha: '' })
        }
    }, [modalShow]);

    useEffect(() => {
        const Logado = document.cookie
            .split('; ')
            .find(row => row.startsWith('user='))
            ?.split('=')[1];

        setCookieValor(Logado || '');
    }, []);


    function getLogado() {
        const userId = cookies.idUser;
    }


    useEffect(() => {
        const Confirmar = cookies.ativo;
        setAtivo(Confirmar);
    }, []);


    useEffect(() => {
        if (atualizaBotaoConfirmar === true) {
            setAtivo(true);
            setCookie("ativo", "1");
        }
    }, [atualizaBotaoConfirmar])



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
                                    {cookiesFull.tipo_usuario === "3" ? (
                                        <Link href="/CadastroAutor" legacyBehavior passHref>
                                            <NavDropdown.Item>Cadastro de Autor</NavDropdown.Item>
                                        </Link>
                                    ) : null}
                                    <Link href="/Autores" legacyBehavior passHref>
                                        <NavDropdown.Item>Publicações de Autores</NavDropdown.Item>
                                    </Link>
                                    {cookiesFull.tipo_usuario === "2" || cookiesFull.tipo_usuario === "3" ? (
                                        <Link href="/GerenciaNoticia" legacyBehavior passHref>
                                            <NavDropdown.Item>Gerenciamento de Publicações</NavDropdown.Item>
                                        </Link>
                                    ) : null}
                                    {cookiesFull.tipo_usuario === "3" ? (
                                        <Link href="/GerenciamentoAutores" legacyBehavior passHref>
                                            <NavDropdown.Item>Gerenciamento de Autores</NavDropdown.Item>
                                        </Link>
                                    ) : null}
                                </NavDropdown>
                            </Nav>
                            <Nav>
                                {cookiesFull.tipo_usuario === "3" ? (
                                    <NavDropdown title="Leitores">
                                        <Link href="/GerenciamentoLeitores" legacyBehavior passHref>
                                            <NavDropdown.Item>Gerenciamento de Leitores</NavDropdown.Item>
                                        </Link>
                                    </NavDropdown>
                                ) : null}
                            </Nav>
                            {Logado ? (
                                <Link href="/PainelControle" legacyBehavior passHref>
                                    <Nav.Link>Manutenção</Nav.Link>
                                </Link>
                            ) : (
                                <Nav></Nav>
                            )}
                        </Nav>
                        <Nav>
                            {Logado ? (
                                <Button className="d-inline-block mx-2" onClick={handleLogout}>
                                    <FontAwesomeIcon icon={faSignOutAlt} /> | Sair | {decodeURIComponent(Logado)}
                                </Button>
                            ) : (
                                <Button className="d-inline-block mx-2" onClick={() => setModalShow(true)}>
                                    <FontAwesomeIcon icon={faRightFromBracket} /> | Entrar
                                </Button>
                            )}
                        </Nav>
                        <Nav>
                            {Logado ? (
                                <Nav></Nav>
                            ) : (
                                <Button className="d-inline-block mx-2" variant="success" onClick={handleClickCadastroLeitor}>
                                    <FontAwesomeIcon icon={faUserPlus} /> | Cadastre-se
                                </Button>
                            )}
                        </Nav>
                        <Nav>
                            {ativo == '0' && Logado && cookiesFull.tipo_usuario === "1" ? (
                                <Button className="d-inline-block mx-2" variant="warning" onClick={() => setOperacao({ id: 1, usuarioId: Logado, action: "confirmar" })}>
                                    <FontAwesomeIcon icon={faBell} /> Confirmar Cadastro
                                </Button>
                            ) : null}

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar >
            <MessageCallbackContext.Provider value={handleMessageCallback}>
                <Container style={{ marginLeft: "3cm", marginRight: "3cm" }}>
                    {children}
                    <ConfirmarCadastroContext.Provider value={{ fechar: fecharModals, atualizar: setAtualizaBotaoConfirmar }}>
                        {modal}
                    </ConfirmarCadastroContext.Provider>
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
                            <Form.Control type="password" placeholder="Senha" required title="Digite sua senha" {...register("senha")} />
                            <span className='text-danger'>{errors.senha?.message}</span>
                        </Form.Group>
                        <div className="d-flex justify-content-end my-2">
                            <BusyButton variant="primary" type="submit" label="Login" />
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>


        </>
    )
}