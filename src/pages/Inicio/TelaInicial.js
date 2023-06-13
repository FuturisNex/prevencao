import React from 'react';
import { Link } from 'react-router-dom';
import logo from "./grupo.png";
import './TelaInicial.css';

function TelaInicial() {
  return (
    <div className="tela-inicial">
      <div className="container">
          <img src={logo} alt="Logo" className="logo-form" />
        <h1>Prevenção de Perdas</h1>
        <div className="botoes">
          <Link to="/furto" className="botao">
            Furto
          </Link>
          <Link to="/ocorrencia" className="botao">
            Ocorrência
          </Link>
          <Link to="/contagens" className="botao">
            Contagens
          </Link>
          <Link to="/descarte" className="botao">
            Descarte
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TelaInicial;
