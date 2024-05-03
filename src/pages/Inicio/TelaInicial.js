import React from 'react';
import { Link } from 'react-router-dom';
import { FaToolbox } from 'react-icons/fa';
import { GiPoliceOfficerHead } from "react-icons/gi";
import { BsClipboard2Fill } from "react-icons/bs";
import { PiSirenFill } from "react-icons/pi";
import { GiCardDiscard } from "react-icons/gi";
import logo from "../../resources/images/logo.png";
import logo1 from "../../resources/images/logo1.png";
import './TelaInicial.css';

function TelaInicial() {
  return (
    <div className="tela-inicial">
      <div className="container">
        <div className="logos-home">
          <img src={logo} alt="Logo" className="logo_grupo" />
          <img src={logo1} alt="Logo" className="logo_prevencao" />
        </div>
        <h1 className="titulo-inicio">Prevenção de Perdas</h1>
        <div className="botoes">
          <Link to="/furto" className="botao-inicio">
            <GiPoliceOfficerHead className="icone" /> Furtos
          </Link>
          <Link to="/ocorrencia" className="botao-inicio">
            <PiSirenFill className="icone" /> Ajustando
          </Link>
          <Link to="/descarte" className="botao-inicio">
            <GiCardDiscard className="icone" /> Descartes
          </Link>
          <Link to="/equipamentos" className="botao-inicio">
            <FaToolbox className="icone" /> Equipamentos
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TelaInicial;
