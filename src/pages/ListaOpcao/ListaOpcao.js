import React from "react";
import { Link } from "react-router-dom";
import logo from "../../resources/images/logo.png";
import "./ListaOpcao.css";

function ListaOpcao() {
  return (
    <div className="tela-iniciall">
      <div className="containerl">
        <img src={logo} alt="Logo" className="logo-inicio" />
        <h1 className="titulo">Lista Prevenção de Perdas</h1>
        <div className="botoesl">
          <Link to="/furto-lista" className="botaol">
            Furtos
          </Link>
          <Link to="/ocorrencia-lista" className="botaol">
            Ocorrências
          </Link>
          <Link to="/equipamentos-lista" className="botaol">
            Equipamentos
          </Link>
          <Link to="/inventario-lista" className="botao1">
            Inventário
          </Link>
          <Link to="/descarte-lista" className="botaofinal">
            Descartes
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ListaOpcao;
