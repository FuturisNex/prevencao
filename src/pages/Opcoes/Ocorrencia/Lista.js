import React, { useState, useEffect } from "react";
import database from "../../../auth/firebase";
import "../../Lista/lista.css";

const ListaOcorrencia = () => {
  const [avarias, setAvarias] = useState([]);
  const [selectedAvaria, setSelectedAvaria] = useState(null);

  useEffect(() => {
    const avariasRef = database.ref("Prevencao/Ocorrencia");

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
    "OCORRENCIA",
    "LOJA",
    "IDADE",
    "GENERO",
    "RESUMO",
  ];

  return (
    <div className="containerLista">
      <div className="form">
        <div className="lista-avarias">
          <h1 className="titulo">Lista de Ocorrencia</h1>
          <ul className="avarias-list">
            {avarias.map((avaria) => (
              <li
                key={avaria.id}
                className="avaria-item"
                onClick={() => handleAvariaClick(avaria)}
              >
                <div>
                  <span className="fornecedor">
                    <b>OCORRENCIA:</b> {avaria.OCORRENCIA}
                  </span>
                  <br />
                  <span className="nota">
                    <b>LOJA:</b> {avaria["LOJA"]}
                  </span>
                  <br />
                  <span className="perca">
                    <b>RESUMO:</b> {avaria.RESUMO}
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
                <h2 className="titulo-detalhes">Detalhes da Ocorrencia</h2>
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

export default ListaOcorrencia;
