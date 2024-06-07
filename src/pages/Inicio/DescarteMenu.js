import React from 'react';
import { Link } from 'react-router-dom';
import { TbChartInfographic } from "react-icons/tb";
import { FaWpforms } from "react-icons/fa";
import logo from "../../resources/images/logo.png";
import logo1 from "../../resources/images/logo1.png";
import './TelaInicial.css';

function Descarte() {
    return (
        <div className="tela-inicial">
            <div className="container">
                <div className="logos-home">
                    <img src={logo} alt="Logo" className="logo_grupo" />
                    <img src={logo1} alt="Logo" className="logo_prevencao" />
                </div>
                <h1 className="titulo-inicio">Prevenção de Perdas</h1>
                <div className="botoes">
                    <Link to="/descarte-form" className="furto-inicio">
                        <FaWpforms className="icone" /> Enviar Descartes
                    </Link>
                    <Link to="/descarte-visual" className="furto-inicio">
                        <TbChartInfographic className="icone" /> Gráfico Descares
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Descarte;
