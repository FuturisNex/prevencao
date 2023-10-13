import React, { useState, useEffect } from "react";
import database from "../../../auth/firebase";
import "../../Lista/lista.css";

const ListaFurto = () => {
  const [avarias, setAvarias] = useState([]);
  const [selectedAvaria, setSelectedAvaria] = useState(null);

  useEffect(() => {
    const avariasRef = database.ref("Prevencao/Furtos");

    const fetchData = async () => {
      try {
        const snapshot = await avariasRef.once("value");
        const avariasData = snapshot.val();

        if (avariasData) {
          const avariasArray = Object.entries(avariasData).map(
            ([key, value]) => ({
              id: key,
              ...value,
            }),
          );
          setAvarias(avariasArray);
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();

    return () => {
      avariasRef.off("value");
    };
  }, []);

  const handleAvariaClick = (avaria) => {
    setSelectedAvaria(avaria);
  };

  const handleCloseDetailCard = () => {
    setSelectedAvaria(null);
  };

  const detalhesOrdenados = [
    "ENVIO",
    "RESPONSAVEL",
    "LOJA",
    "GENERO",
    "IDADE",
    "TIPO",
    "DEPARTAMENTO",
    "PRODUTO",
    "QUEM IDENTIFICOU",
    "UTILIZADO",
    "VALOR RECUPERADO",
    "RESUMO",
  ];

  return (
    <div className="containerLista">
      <div className="form">
        <div className="lista-avarias">
          <h1 className="titulo">Lista de Furtos</h1>
          <ul className="avarias-list">
            {avarias.map((avaria) => (
              <li
                key={avaria.id}
                className="avaria-item"
                onClick={() => handleAvariaClick(avaria)}
              >
                <div>
                  <span className="fornecedor">
                    <b>DEPARTAMENTO:</b> {avaria.DEPARTAMENTO}
                  </span>
                  <br />
                  <span className="nota">
                    <b>UTILIZADO:</b> {avaria["UTILIZADO"]}
                  </span>
                  <br />
                  <span className="perca">
                <b>VALOR RECUPERADO:</b> {avaria.RECUPERADO}
                  </span>
                </div>
              </li>
            ))}
          </ul>
          {selectedAvaria && (
            <div className="avaria-overlay">
              <div className="avaria-card-details">
                <button className="close" onClick={handleCloseDetailCard}>
                  <span>X</span>
                </button>
                <h2 className="titulo-detalhes">Detalhes do Furto</h2>
                <div className="avaria-detalhes">
                  {detalhesOrdenados.map((key) => {
                    if (key !== "id") {
                      return (
                        <div key={key} className="detalhe-item">
                          <span className="detalhe-label">
                            {key.toUpperCase()}:
                          </span>{" "}
                          {selectedAvaria[key]}
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListaFurto;
