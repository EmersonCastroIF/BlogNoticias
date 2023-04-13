import { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import BootstrapSwitchButton from 'bootstrap-switch-button-react'

export default function BusyButton(props){
    
    const [busy, setBusy] = useState(false);

    useEffect(() => {
        setBusy(props.busy);
    }, [props.busy]);

    return(
        <BootstrapSwitchButton type={props.type} variant={props.variant} disabled={busy}>
            {busy ? <Spinner animation="border" size="sm"/> : null}
            &nbsp;
            {props.label}
        </BootstrapSwitchButton>
    )
}