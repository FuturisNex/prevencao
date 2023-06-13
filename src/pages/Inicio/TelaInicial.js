import React from 'react';
import { Link } from 'react-router-dom';
import logo from "./grupo.png";
import './TelaInicial.css';

function TelaInicial() {
  return (
    <div className="tela-inicial">
      <div className="container">
          <img src={logo} alt="Logo" className="logo-inicio" />
        <h1 className="titulo">Prevenção de Perdas</h1>
        <div className="botoes">
          <Link to="/furto" className="botao">
            Furtos
          </Link>
          <Link to="/ocorrencia" className="botao">
            Ocorrências
          </Link>
          <Link to="/controles" className="botao">
            Controles
          </Link>
          <Link to="/inventario" className="botao">
            Inventário
          </Link>
          <Link to="/descarte" className="botao">
            Descartes
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TelaInicial;
