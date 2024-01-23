import React, { useState, useEffect } from 'react';
import './Descarte.css';
import logo from "../../../resources/images/logo.png";
import axios from "axios";

const Descarte = () => {
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");
  const [loja, setLoja] = useState("");
  const [produto, setProduto] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

const handleChange = (event) => {
  const { name, value } = event.target;
  if (name === "data") {
    setData(value);
  } else if (name === "hora") {
    setHora(value);
  } else if (name === "loja") {
    setLoja(value);
  } else if (name === "produto") {
    setProduto(value);
  } else if (name === "departamento") {
    setDepartamento(value);
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
      formData.append("Data", formatDate(data));
      formData.append("Hora", hora);
      formData.append("Loja", loja);
      formData.append("Produto", produto);
      formData.append("Departamento", departamento);
      formData.append("Quantidade", quantidade);
      
      setIsSending(true);

      await axios.post(
        "https://script.google.com/macros/s/AKfycbym0_D6Si7hezVszEO4F7PsWGcI2cmVPZaukz-CFyotuwfbHBe0nPtbbQ39m5A_fuqRUQ/exec",
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
        setData("");
        setHora("");
        setLoja("");
        setProduto("");
        setDepartamento("");
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
      "https://lookerstudio.google.com/reporting/bc184541-8cc5-47c0-9298-e0746dd5a47c",
      "_blank"
    );
  };
  
    const resetForm = () => {
    setData("");
    setHora("");
    setLoja("");
    setProduto("");
    setDepartamento("");
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
            <Link to="/descarte-lista" className="back-button">
            <span>&#8592;</span>   Lista Descarte
          </Link>
      <img src={logo} alt="Logo" className="logo-form" />
      <h3 className="prevencao__subtitulo">Descartes</h3>
      <form className="prevencao__form" onSubmit={handleSubmit}>
        
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
              <label htmlFor="hora">Hora:</label>
              <input
                type="time"
                id="hora"
                name="hora"
                value={hora}
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
              <label htmlFor="produto">Produto Do Descarte:</label>
              <input
                type="text"
                id="produto"
                name="produto"
                value={produto}
                onChange={handleChange}
                required
              />
            </div>

            <div className="prevencao__input-group">
              <label htmlFor="departamento">Departamento:</label>
              <select
                id="departamento"
                name="departamento"
                value={departamento}
                onChange={(event) => setDepartamento(event.target.value)}
                required
              >
                <option value="">Selecione</option>
                <option value="Padaria">Padaria</option>
                <option value="Rotisseria">Rotisseria</option>
                <option value="Salgados">Salgados</option>
              </select>
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

export default Descarte;
