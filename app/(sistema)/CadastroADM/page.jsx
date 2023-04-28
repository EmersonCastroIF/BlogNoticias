'use client'
import { useForm, watch } from "react-hook-form";
import { Button, Modal, ProgressBar } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { MessageCallbackContext } from "../layout";
import { css } from '@emotion/css';
import styles from '../../Styles.module.css';
import BusyButton from "../../componentes/buusybutton";
import { useRouter } from 'next/navigation';


const schema = yup.object({
    nome: yup.string()
        .min(5, 'O nome deve conter, no mínimo, 5 caracteres')
        .max(100, 'O nome deve conter, no máximo, 100 caracteres')
        .required('O nome é obrigatório'),
    email: yup.string()
        .min(5, 'O e-mail deve conter, no mínimo, 5 caracteres')
        .required('O e-mail é obrigatório'),
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
    const [progressoSenha, setProgressoSenha] = useState(0);
    const [senhaAtendeRequisitos, setSenhaAtendeRequisitos] = useState(false);
    const [busy, setBusy] = useState(false);
    const router = useRouter();

    const { register, handleSubmit, reset, formState: { errors }, watch } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        setBusy(true);

        const formattedDateTime = new Date();
        const url = '/api/leitor';
        data.tipoUsuario = { id: 3, descricao: "Administrador" };
        data.codigoAtivacao = "";
        data.apelido = "";
        data.ativo = false;
        data.bloqueado = false;
        data.dataNascimento = formattedDateTime;
        data.codigoAtivacao = "da41sd1f9as5df91915d9f";
        data.codigoRedefineEmail = "da41sd1f9as5df91915d9f"
        data.codigoRedefineSenha = "da41sd1f9as5df91915d9f"        
        console.log(data)
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
                    handleClose();
                    messageCallback({ tipo: 'sucesso', texto: resultData });
                    router.push('/');
                })
            }
            else{
                messageCallback({tipo: 'erro', texto: result.statusText});
            }
        
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
            reset({ nome: '', email: '' })
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
            <div className={styles.header}>Cadastro de ADM</div>

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
                </div>
            </form>


        </>
    )
}