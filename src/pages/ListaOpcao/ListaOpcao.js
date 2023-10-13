import React from "react";
import { Link } from "react-router-dom";
import logo from "../../resources/images/logo.png";
import "./ListaOpcao.css";

function ListaOpcao() {
  return (
    <div className="tela-inicial">
      <div className="container">
        <img src={logo} alt="Logo" className="logo-inicio" />
        <h1 className="titulo">Prevenção de Perdas Lista</h1>
        <div className="botoes">
          <Link to="/furto-lista" className="botao">
            Furtos
          </Link>
          <Link to="/ocorrencia-lista" className="botao">
            Ocorrências
          </Link>
          <Link to="/equipamentos-lista" className="botao">
            Equipamentos
          </Link>
          <Link to="/inventario-lista" className="botao1">
            Inventário
          </Link>
          <Link to="/descarte-lista" className="botao">
            Descartes
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ListaOpcao;
