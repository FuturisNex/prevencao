import React from 'react';
import { Link } from 'react-router-dom';
import { BiSolidDislike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import logo from "../../resources/images/logo.png";
import logo1 from "../../resources/images/logo1.png";
import './TelaInicial.css';

function DegustacaoMenu() {
    return (
        <div className="tela-inicial">
            <div className="container">
                <div className="logos-home">
                    <img src={logo} alt="Logo" className="logo_grupo" />
                    <img src={logo1} alt="Logo" className="logo_prevencao" />
                </div>
                <h1 className="titulo-inicio">Prevenção de Perdas</h1>
                <div className="botoes">
                    <Link to="/degustação-inibição" className="furto-inicio">
                        <BiSolidLike className="icone" /> Degustação Inibição
                    </Link>
                    <Link to="/degustação-quebra" className="furto-inicio">
                        <BiSolidDislike className="icone" /> Degustação Quebra
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default DegustacaoMenu;
