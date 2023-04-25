'use client'
import { useForm, watch } from "react-hook-form";
import Link from 'next/link'
import { Button, Modal, ProgressBar } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { MessageCallbackContext } from "../layout";
import { useRouter } from 'next/navigation';
import styles from '../../Styles.module.css';

const schema = yup.object({
    nome: yup.string()
        .min(3, 'O nome deve conter, no mínimo, 3 caracteres')
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
    title: 'Meus Dados'
}

export default function Page() {
    const router = useRouter();
    const messageCallback = useContext(MessageCallbackContext);
    const [progressoSenha, setProgressoSenha] = useState(0);
    const [senhaAtendeRequisitos, setSenhaAtendeRequisitos] = useState(false);

    const { register, handleSubmit, reset, formState: { errors }, watch } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        console.log(data);

        if (true) {
            messageCallback({ tipo: 'sucesso', texto: 'Foi enviado um e-mail para o Autor  !' });
            router.push('/');
        }
        else
            messageCallback({ tipo: 'erro', texto: 'Erro ao salvar o cadastro: ' });
    }
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
            <div className={styles.header}>Meus Dados</div>
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
                        E-mail - 
                        <Link
                            href={{
                                pathname: '/AlterarEmail',
                                //query: { id: idNoticia },
                            }}
                            >
                             Alterar E-mail 
                        </Link>
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
                        Senha - 
                        <Link
                            href={{
                                pathname: '/AlterarSenha',
                                //query: { id: idNoticia },
                            }}
                            >
                             Alterar Senha
                        </Link>
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

                <div className="alterarSenha" style={{ display: "flex", justifyContent: "flex-end" }}>
               
                    <Button variant="success" type="submit" style={{ marginRight: "0.90cm" }}>Salvar</Button>
                </div>
            </form>


        </>
    )
}