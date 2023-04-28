'use client'
import { useForm, watch } from "react-hook-form";
import Link from 'next/link'
import { Button, Modal, ProgressBar, Spinner } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { MessageCallbackContext } from "../layout";
import { useRouter } from 'next/navigation';
import styles from '../../Styles.module.css';
import { useCookies } from 'react-cookie';
import BusyButton from "../../componentes/buusybutton";

const schema = yup.object({
    senha: yup.string()
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]{3,}).{8,}$/, "A senha deve conter pelo menos 8 caracteres, incluindo pelo menos uma letra maiúscula, uma letra minúscula, e três caracteres especiais")
        .required('A senha é obrigatória'),
    codigo: yup.string()
        .min(10, 'Mínimo, 10 caracteres'),
}).required();


export const metadata = {
    title: 'Alterar Senha'
}

export default function Page() {
    const router = useRouter();
    const messageCallback = useContext(MessageCallbackContext);
    const [reenviarCodigoBusy, setReenviarCodigoBusy] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies();
    const [busy, setBusy] = useState(false);

    const { register, handleSubmit, reset, formState: { errors }, watch } = useForm({
        resolver: yupResolver(schema)
    });


    const handleEnviarCodigo = () => {
        setReenviarCodigoBusy(true);
        const url = '/api/Email';
        const Dados = { idUser: cookies.id_user, tipoCodigo: "Redefinicao-Senha" };

        var args = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Dados)
        };

        fetch(url, args).then((result) => {
            setReenviarCodigoBusy(false);
            if (result.status === 200) {
                result.json().then((resultData) => {
                    messageCallback({ tipo: 'sucesso', texto: resultData });
                })
            }
            else {
                messageCallback({ tipo: 'erro', texto: result.statusText });;
            }
        });
    }

    const onSubmit = (data) => {
        setBusy(true);
        var senhaNova = "";
        senhaNova = data.senha;
        const url = '/api/RedefineSenha';
        data = { idUser: cookies.id_user, codigoAtivacao: data.codigo, senha: senhaNova };
        console.log(data);
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
            if (result.status === 200) {
                result.json().then((resultData) => {
                    messageCallback({ tipo: 'sucesso', texto: resultData });
                })
            }
            else {
                messageCallback({ tipo: 'erro', texto: result.statusText });;
            }
        });
    }


    const handleClickCancelar = () => {
        router.push("/PainelControle");
    };
    return (
        <>
            <div className={styles.header}>Alterar Senha</div>
            <form onSubmit={handleSubmit(onSubmit)}>


                <div className="row mx-2" style={{ marginBottom: "0.20cm" }}>
                    <label>
                        Código

                        <input className="form-control"  {...register("codigo")} /> 
                        <span className='text-danger'>{errors.codigo?.message}</span>
                    </label>
                </div>
                <div className="row mx-2" style={{ marginBottom: "0.20cm" }}>
                    <label>
                        Senha
                        {/* <input onChange={handleSenhaChange} type="password" className="form-control" {...register("senha")} /> */}
                        <input type="password" className="form-control" {...register("senha")} />
                        <span className='text-danger'>{errors.senha?.message}</span>
                    </label>
                </div>
                <div className="row mx-2" style={{ marginBottom: "0.20cm" }}>
                    <label>
                        Nova Senha
                        {/* <input onChange={handleSenhaChange} type="password" className="form-control" {...register("senha")} /> */}
                        <input type="password" className="form-control" {...register("senha")} />
                        <span className='text-danger'>{errors.senha?.message}</span>
                    </label>
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button disabled={reenviarCodigoBusy} variant="primary" onClick={handleEnviarCodigo} style={{ marginRight: "0.90cm" }}>Solicitar Código
                        &nbsp; {reenviarCodigoBusy ? <Spinner animation="border" size="sm" /> : null} </Button>
                    <Button variant="danger" onClick={handleClickCancelar} style={{ marginRight: "0.90cm" }}>Cancelar</Button>
                    <BusyButton variant="success" type="submit" label="Salvar" busy={busy} />
                </div>
            </form>


        </>
    )
}