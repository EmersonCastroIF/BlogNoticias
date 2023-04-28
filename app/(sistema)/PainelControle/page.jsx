'use client'

import { Button } from "react-bootstrap";
import { useRouter } from 'next/navigation';
import styles from '../../Styles.module.css';
import { useCookies } from 'react-cookie';


export const metadata = {
    title: 'Meus Dados'
}

export default function Page() {
    const router = useRouter();
    const [cookies, setCookie, removeCookie] = useCookies();


    const handleClickSenha = () => {
        router.push("/AlterarSenha");
    };

    const handleClickEmail = () => {
        router.push("/AlterarEmail");
    };


    return (
        <>
            <h2>Manutenção de Dados</h2>

            <div className="row mx-2" style={{ marginBottom: "0.20cm" }}>
                <label>
                    E-mail

                    <input value={cookies.email} className="form-control" disabled />

                </label>
            </div>

            <Button variant="warning" onClick={handleClickEmail}>
                Trocar E-mail
            </Button>

            <div className="row mx-2" style={{ marginBottom: "0.20cm" }}>
                <label>
                    Senha

                    <input value="222222222222" type="password" className="form-control" disabled />

                </label>
            </div>

            <Button variant="primary" onClick={handleClickSenha}>
                Alterar Senha
            </Button>









        </>
    )
}