import React from "react";
import { Link } from "react-router-dom";
import "./home.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="header">
        <h1 className="home-titulo">Portal Prevenção de Percas</h1>
      </div>
      <div className="options">
        <Link to="/enviar" className="option">
          <button className="btn-primary">Enviar</button>
        </Link>
        <Link to="/lista" className="option">
          <button className="btn-secondary">Lista</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
