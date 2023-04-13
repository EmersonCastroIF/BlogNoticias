'use client'
import { useForm, watch } from "react-hook-form";
import { Button, Modal, ProgressBar } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { MessageCallbackContext } from "../layout";
import { AbrirModal } from "./confirmaCadastroLeitor";
import { css } from '@emotion/css';
import styles from '../../Styles.module.css';
import BusyButton from "@/app/componentes/buusybutton";


const schema = yup.object({
    nome: yup.string()
        .min(3, 'O nome deve conter, no mínimo, 3 caracteres')
        .max(100, 'O nome deve conter, no máximo, 100 caracteres')
        .required('O nome é obrigatório'),
    email: yup.string()
        .min(5, 'O e-mail deve conter, no mínimo, 5 caracteres')
        .required('O e-mail é obrigatório'),
    dataNascimento: yup.string()
        .min(10, 'Data não preenchida corretamente')
        .max(10, 'Data não preenchida corretamente')
        .required('A Data de Nascimento é obrigatória'),
    senha: yup.string()
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]{3,}).{8,}$/, "A senha deve conter pelo menos 8 caracteres, incluindo pelo menos uma letra maiúscula, uma letra minúscula, e três caracteres especiais")
        .required('A senha é obrigatória')
}).required();

export const metadata = {
    title: 'Cadastro de Leitor'
}

export default function Page() {
    const [modalShow, setModalShow] = useState(false);
    const messageCallback = useContext(MessageCallbackContext);
    const [showAbrirModal, setStatusModal] = useState(false); //Controla Status Modal Confirmação
    const [progressoSenha, setProgressoSenha] = useState(0);
    const [senhaAtendeRequisitos, setSenhaAtendeRequisitos] = useState(false);
    const [busy, setBusy] = useState(false);

    const { register, handleSubmit, reset, formState: { errors }, watch } = useForm({
        resolver: yupResolver(schema)
    });

    //Pega e-mail que o usuário digitou e atribui a váriavel
    const emailValue = watch("email");

    // const onSubmit = (data) => {
    //     console.log(data);

    //     if (true) {
    //         messageCallback({ tipo: 'alerta', texto: 'Foi enviado um e-mail para confirmação de cadastro !' });
    //         setModalShow(false);
    //         //Chamar Modal de Confirmação
    //         setStatusModal(true);
    //     }
    //     else
    //         messageCallback({ tipo: 'erro', texto: 'Erro ao salvar o cadastro: ' });
    // }

    const onSubmit = (data) => {
        setBusy(true);

        const url = '/api/leitor';

        var args = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        fetch(url, args).then((result) => {
            setBusy(false);
            result.json().then((resultData) => {
                
                if (result.status == 200) {
                    messageCallback({ tipo: 'sucesso', texto: resultData });
                }
                else {
                    let errorMessage = '';
                    if (resultData.errors != null) {
                        const totalErros = Object.keys(resultData.errors).length;

                        for (var i = 0; i < totalErros; i++) {
                            errorMessage = errorMessage + Object.values(resultData.errors)[i] + "<br/>";
                        }
                    }
                    else
                        errorMessage = resultData;

                    messageCallback({ tipo: 'erro', texto: errorMessage });
                }
            })
        });
        
    }


    const handleClose = () => {
        setModalShow(false);
    }

    function handleAbreFechaModalConfirmacao() {
        setStatusModal(false);
    }

    useEffect(() => {
        if (modalShow === false) {
            reset({ nome: '', email: '', dataNascimento: '' })
        }
    }, [modalShow]);


    const handleInputChange = (event) => {
        const senha = event.target.value;
        const tamanhoSenha = senha.length;
        let novoProgressoSenha = 0;

        if (/[a-z]/.test(senha)) {
            novoProgressoSenha += 20;
        }
        if (/[A-Z]/.test(senha)) {
            novoProgressoSenha += 20;
        }
        if (/\d/.test(senha)) {
            novoProgressoSenha += 20;
        }
        if (/(?=.*[!@#$%^&*]{3,})/.test(senha)) {
            novoProgressoSenha += 20;
        }

        if (tamanhoSenha >= 8){
            novoProgressoSenha += 20;    
        }

        if (tamanhoSenha >= 8 && novoProgressoSenha === 100) {
            setSenhaAtendeRequisitos(true);
        } else {
            setSenhaAtendeRequisitos(false);
        }
        setProgressoSenha(novoProgressoSenha);
    };

    return (
        <>
            <div className={styles.header}>Cadastro de Leitor</div>

            {showAbrirModal && <AbrirModal showModal={showAbrirModal} handleCloseModal={handleAbreFechaModalConfirmacao} emailDigitado={emailValue} />}
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="row mx-2" style={{ marginBottom: "0.20cm" }}>
                    <label>
                        Nome
                        <input type="text" className="form-control" {...register("nome")} />
                        <span className='text-danger'>{errors.nome?.message}</span>
                    </label>
                </div>
                <div className="row mx-2" style={{ marginBottom: "0.20cm" }}>
                    <label>
                        E-mail
                        <input type="email" className="form-control" {...register("email")} />
                        <span className='text-danger'>{errors.email?.message}</span>
                    </label>
                </div>
                <div className="row mx-2" style={{ marginBottom: "0.20cm" }}>
                    <label>
                        Data de Nascimento
                        <input type="date" className="form-control" {...register("dataNascimento")} />
                        <span className='text-danger'>{errors.dataNascimento?.message}</span>
                    </label>
                </div>
                <div className="row mx-2" style={{ marginBottom: "0.20cm" }}>
                    <label>
                        Senha
                        {/* <input onChange={handleSenhaChange} type="password" className="form-control" {...register("senha")} /> */}
                        <input type="password" className="form-control" {...register("senha")} onChange={handleInputChange} />
                        {senhaAtendeRequisitos ? (
                            <ProgressBar now={100} variant="success" className="mt-2" />
                        ) : (
                            <ProgressBar now={progressoSenha} className="mt-2" />
                        )}
                        <span className='text-danger'>{errors.senha?.message}</span>
                    </label>
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <BusyButton variant="success" type="submit" label="Salvar" style={{ marginRight: "0.90cm" }} busy={busy}/>
                    {/* <Button variant="success" type="submit" style={{ marginRight: "0.90cm" }}>Salvar</Button> */}
                </div>
            </form>


        </>
    )
}