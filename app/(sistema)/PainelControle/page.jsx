'use client'

import { Button} from "react-bootstrap";

import { useRouter } from 'next/navigation';
import styles from '../../Styles.module.css';



export const metadata = {
    title: 'Meus Dados'
}

export default function Page() {
    const router = useRouter();
    


    const handleClickSenha = () => {
        router.push("/AlterarSenha");
    };

    const handleClickEmail = () => {
        router.push("/AlterarEmail");
    };

    
    return (
        <>
            <div className={styles.header}>Meus Dados</div>

            <div className="row mx-2" style={{ marginBottom: "0.20cm" }}>
                    <label>
                        E-mail
                        
                        <input type="password" className="form-control"  disabled />
                        
                    </label>
                </div>
            
                <Button variant="warning" onClick={handleClickEmail}>
                    Trocar E-mail
                 </Button>       
           
            <div className="row mx-2" style={{ marginBottom: "0.20cm" }}>
                    <label>
                        Senha
                        
                        <input type="password" className="form-control"  disabled />
                        
                    </label>
                </div>

            <Button variant="primary" onClick={handleClickSenha}>
                Alterar Senha
            </Button>                

                   


               
               
         


        </>
    )
}