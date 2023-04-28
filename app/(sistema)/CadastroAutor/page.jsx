'use client'
import { useForm, watch } from "react-hook-form";
import { Button, Modal } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { MessageCallbackContext } from "../layout";
import { useRouter } from 'next/navigation';
import styles from '../../Styles.module.css';
import BusyButton from "../../componentes/buusybutton";

const schema = yup.object({
    nome: yup.string()
        .min(5, 'O nome deve conter, no mínimo, 5 caracteres')
        .max(100, 'O nome deve conter, no máximo, 100 caracteres')
        .required('O nome é obrigatório'),
    apelido: yup.string()
        .min(3, 'O apelido deve conter, no mínimo, 3 caracteres')
        .max(100, 'O apelido deve conter, no máximo, 50 caracteres')
        .required('O apelido é obrigatório'),
    email: yup.string()
        .min(5, 'O e-mail deve conter, no mínimo, 5 caracteres')
        .required('O e-mail é obrigatório'),
    dataNascimento: yup.string()
        .min(10, 'Data não preenchida corretamente')
        .max(10, 'Data não preenchida corretamente')
        .required('A Data de Nascimento é obrigatória')
}).required();

export const metadata = {
    title: 'Cadastro de Autor'
}

export default function Page() {
    const router = useRouter();
    const messageCallback = useContext(MessageCallbackContext);
    const [busy, setBusy] = useState(false);

    const { register, handleSubmit, reset, formState: { errors }, watch } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        setBusy(true);

        const url = '/api/leitor';
        data.tipoUsuario = { id: 2, descricao: "Autor" };
        data.codigoAtivacao = "";
        data.apelido = data.apelido;
        data.ativo = false;
        data.bloqueado = false;
        data.senha = "SENHAPADRAO"
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
                    messageCallback({ tipo: 'sucesso', texto: resultData });
                    reset({ nome: '', apelido: '', email: '', dataNascimento: '' })
                })
            }
            else {
                messageCallback({ tipo: 'erro', texto: result.statusText });
            }

        });

    }

    return (
        <>
            <div className={styles.header}>Cadastro de Autor</div>
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
                        Apelido
                        <input type="text" className="form-control" {...register("apelido")} />
                        <span className='text-danger'>{errors.apelido?.message}</span>
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

                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <BusyButton variant="success" type="submit" label="Salvar" style={{ marginRight: "0.90cm" }} busy={busy} />
                </div>
            </form>


        </>
    )
}