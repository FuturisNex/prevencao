import React from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaExclamationCircle, FaToolbox, FaTrashAlt, FaList } from 'react-icons/fa';
import logo from "../../resources/images/logo.png";
import './TelaInicial.css';

function TelaInicial() {
  return (
    <div className="tela-inicial">
      <div className="container">
        <img src={logo} alt="Logo" className="logo-inicial" />
        <h1 className="titulo-inicio">Prevenção de Perdas</h1>
        <div className="botoes">
          <Link to="/furto" className="botao-inicio">
            <FaEye className="icone" /> Furtos
          </Link>
          <Link to="/ocorrencia" className="botao-inicio">
            <FaExclamationCircle className="icone" /> Ocorrências
          </Link>
          <Link to="/equipamentos" className="botao-inicio">
            <FaToolbox className="icone" /> Equipamentos
          </Link>
          <Link to="/descarte" className="botao-inicio">
            <FaTrashAlt className="icone" /> Descartes
          </Link>
          <Link to="/inventario" className="botao-inicio">
            <FaList className="icone" /> Inventário
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TelaInicial;
