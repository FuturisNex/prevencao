import React, { useState, useEffect } from 'react';
import './Equipamentos.css';
import logo from "./grupo.png";
import axios from "axios";

const Equipamentos = () => {
  const [nome, setNome] = useState("");
  const [data, setData] = useState("");
  const [loja, setLoja] = useState("");
  const [defeito, setDefeito] = useState("");
  const [equipamentos, setEquipamentos] = useState("");
  const [observacao, setObservacao] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

const handleChange = (event) => {
  const { name, value } = event.target;
  if (name === "nome") {
    setNome(value);
  } else if (name === "data") {
    setData(value);
  } else if (name === "loja") {
    setLoja(value);
  } else if (name === "defeito") {
    setDefeito(value);
  } else if (name === "equipamentos") {
    setEquipamentos(value);
  } else if (name === "observacao") {
    setObservacao(value);
  } else if (name === "quantidade") {
    setQuantidade(value);
  }
};

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const formData = new FormData();
      formData.append("Nome", nome);
      formData.append("Data", formatDate(data));
      formData.append("Loja", loja);
      formData.append("Defeito", defeito);
      formData.append("Equipamentos", equipamentos);
      formData.append("Observacao", observacao);
      formData.append("Quantidade", quantidade);

      setIsSending(true);

      await axios.post(
        "https://script.google.com/macros/s/AKfycbwqYxQMoNI2yBq0weK8HifCdB2lyvgo14w5h8Y9PA4PGNr7cqIV6WH86RtCPK0stIgLcw/exec",
        formData
      );

      setSuccessMessage("Formulário enviado com sucesso!");
      setIsSubmitted(true);
    } catch (error) {
      setErrorMessage("Ocorreu um erro ao enviar o formulário.");
    }

    setIsSending(false);
    setIsSubmitting(false);
  };

  useEffect(() => {
    if (isSubmitted) {
      const timer = setTimeout(() => {
        setIsSubmitted(false);
        setNome("");
        setData("");
        setLoja("");
        setDefeito("");
        setEquipamentos("");
        setObservacao("");
        setQuantidade("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isSubmitted]);
  
    const formatDate = (date) => {
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  };
  
    const handleCloseSuccessMessage = () => {
    setIsSubmitted(false);
    setSuccessMessage("");
  };
  
    const handleOpenExcelLink = () => {
    window.open(
      "https://docs.google.com/spreadsheets/d/18mM2pToUkB7qZBAFzc4T658midBbTaDOxTumtGmU3a0/edit?usp=sharing",
      "_blank"
    );
  };
  
    const resetForm = () => {
    setNome("");
    setData("");
    setLoja("");
    setDefeito("");
    setEquipamentos("");
    setObservacao("");
    setQuantidade("");
  };
  
  return (
    <div className="prevencao">
      {isSubmitted && successMessage && (
        <div className="successMessage">
          <span>{successMessage}</span>
          <button onClick={handleCloseSuccessMessage}>OK</button>
        </div>
      )}    
      <img src={logo} alt="Logo" className="logo-form" />
      <h2 className="prevencao__titulo">Formulário de Prevenção</h2>
      <form className="prevencao__form" onSubmit={handleSubmit}>
            <h3 className="prevencao__subtitulo">Equipamentos de Segurança</h3>

            <div className="prevencao__input-group">
              <label htmlFor="nome">Seu Nome:</label>
              <input
                type="text"
                id="nome"
                name="nome"
                onChange={handleChange}
                value={nome}
              />
            </div>

            <div className="prevencao__input-group">
              <label htmlFor="data">Data:</label>
              <input
                type="date"
                id="data"
                name="data"
                value={data}
                onChange={handleChange}
                required
              />
            </div>

            <div className="prevencao__input-group">
              <label htmlFor="loja">Loja:</label>
              <select
                id="loja"
                name="loja"
                value={loja}
                onChange={(event) => setLoja(event.target.value)}
                required
              >
                <option value="">Selecione</option>
                <option value="1">Santa Mônica</option>
                <option value="11">Tomé de Souza</option>
                <option value="2">Castro Alves</option>
                <option value="3">Tomba</option>
                <option value="4">Fraga Maia</option>
                <option value="5">Artemia Pires</option>
              </select>
            </div>

            <div className="prevencao__input-group">
              <label htmlFor="defeito">Equipamento com defeito:</label>
              <select
                id="defeito"
                name="defeito"
                value={defeito}
                onChange={(event) => setDefeito(event.target.value)}
                required
              >
                <option value="">Selecione</option>
                <option value="Sim">Sim</option>
                <option value="Não">Não</option>
              </select>
            </div>

            <div className="prevencao__input-group">
              <label htmlFor="equipamentos">Equipamentos de Segurança:</label>
              <select
                id="equipamentos"
                name="equipamentos"
                value={equipamentos}
                onChange={(event) => setEquipamentos(event.target.value)}
                required
              >
                <option value="">Selecione</option>
                <option value="Monitor">Monitor</option>
                <option value="Rádio">Rádio</option>
                <option value="Câmeras">Câmeras</option>
                <option value="Antenas">Antenas</option>
                <option value="Sensores">Sensores</option>
                <option value="Alarmes">Alarmes</option>
              </select>
            </div>

            <div className="prevencao__input-group">
              <label htmlFor="observacao">Observações:</label>
              <textarea
                id="observacao"
                name="observacao"
                value={observacao}
                onChange={handleChange}
                required
              />
            </div>

            <div className="prevencao__input-group">
              <label htmlFor="quantidade">Quantidade de Descarte:</label>
              <input
                type="text"
                id="quantidade"
                name="quantidade"
                value={quantidade}
                onChange={handleChange}
                required
              />
            </div>

        <button
          type="submit"
          className="prevencao__submit"
          disabled={isLoading || isSending || isSubmitting}
        >
          {isSubmitting ? "Enviando..." : "Enviar"}
        </button>
        <button
          type="button"
          className="prevencao__avancar"
          onClick={handleOpenExcelLink}
        >
          Lista
        </button>
      </form>
    </div>
  );
};

export default Equipamentos;
