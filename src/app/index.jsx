import React from "react";
import "./css/index.css";
import 'bootstrap/dist/css/bootstrap.min.css';



export default function index (){
    return (
    <div className="Container"> 
    
    <div className="nav-bar">
      

        <ul className="nav flex-column">
        <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="#">Pagina inicial</a>
        </li>
        <li className="nav-item">
            <a className="nav-link" href="#">Link</a>
        </li>
        <li className="nav-item">
            <a className="nav-link" href="#">Link</a>
        </li>
        <li className="nav-item">
            <a className="nav-link disabled">Disabled</a>
        </li>
        </ul>
       
    </div>

    <div className="text-center">
    
        <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
            <form className="dd-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Oque voce esta pensando" aria-label="Search" />
                <button className="btn btn-outline-success" type="submit">Publicar</button>
            </form>
        </div>
        </nav>
        </div>
    
    <div className="search">
    
        
        <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
            <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Pesquisar publicação" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Pesquisar</button>
            </form>
        </div>
        </nav>
        </div>
    </div>
    
   
)
}