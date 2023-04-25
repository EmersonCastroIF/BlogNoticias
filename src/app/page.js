'use cliente'

import Index from "./index";
import './globals.css';
import Logo from "../../public/images/logo.png";



export default function Home() {
  return (<>
   <img src={Logo}  />
    <Index/>
    
  </> 
  

);
}
