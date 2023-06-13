import React, { useState, useEffect } from 'react';
import './Prevencao.css';
import logo from "./grupo.png";
import axios from "axios";

const Ocorrencia = () => {
  const [nome, setNome] = useState("");
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");
  const [genero, setGenero] = useState("");
  const [idade, setIdade] = useState("");
  const [loja, setLoja] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [ocorrencia, setOcorrencia] = useState("");
  const [resumo, setResumo] = useState("");
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
  } else if (name === "hora") {
    setHora(value);
  } else if (name === "genero") {
    setGenero(value);
  } else if (name === "idade") {
    setIdade(value);
  } else if (name === "loja") {
    setLoja(value);
  } else if (name === "departamento") {
    setDepartamento(value);
  } else if (name === "ocorrencia") {
    setOcorrencia(value);
  } else if (name === "resumo") {
    setResumo(value);
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
      formData.append("Data", data);
      formData.append("Hora", hora);
      formData.append("Genero", genero);
      formData.append("Idade", idade);
      formData.append("Loja", loja);
      formData.append("Departamento", departamento);
      formData.append("Ocorrencia", ocorrencia);
      formData.append("Resumo", resumo);

      setIsSending(true);

      await axios.post(
        "https://script.google.com/macros/s/AKfycbwN-86reWdbhE0_ZW8zK-vA7lU2eLr5L1OIRRT7xGe_DcPx0Hkt9SybVCx-lO4kisgPcA/exec",
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
        setHora("");
        setGenero("");
        setIdade("");
        setLoja("");
        setDepartamento("");
        setIdentificou("");
        setResumo("");
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
    setHora("");
    setGenero("");
    setIdade("");
    setLoja("");
    setDepartamento("");
    setOcorrencia("");
    setResumo("");
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
            <h3 className="prevencao__subtitulo">Furto</h3>

            <div className="prevencao__input-group">
              <label htmlFor="nome">Nome:</label>
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
              <label htmlFor="genero">Gênero:</label>
              <select
                id="genero"
                name="genero"
                value={genero}
                onChange={(event) => setGenero(event.target.value)}
                required
              >
                <option value="">Selecione</option>
                <option value="Homem">Homem</option>
                <option value="Mulher">Mulher</option>
              </select>
            </div>

            <div className="prevencao__input-group">
              <label htmlFor="idade">Idade Aproximada:</label>
              <select
                id="idade"
                name="idade"
                value={idade}
                onChange={(event) => setIdade(event.target.value)}
                required
              >
                <option value="">Selecione a Idade</option>
                <option value="10 a 15 Anos">10 a 15 Anos</option>
                <option value="15 a 18 Anos">15 a 18 Anos</option>
                <option value="18 a 20 Anos">18 a 20 Anos</option>
                <option value="20 a 30 Anos">20 a 30 Anos</option>
                <option value="Maior que 30 Anos">Maior que 30 Anos</option>
                <option value="Maior que 40 Anos">Maior que 40 Anos</option>
                <option value="Maior que 50 Anos">Maior que 50 Anos</option>
              </select>
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
                <option value="">Selecione uma loja</option>
                <option value="1">Santa Mônica</option>
                <option value="11">Tomé de Souza</option>
                <option value="2">Castro Alves</option>
                <option value="3">Tomba</option>
                <option value="4">Fraga Maia</option>
                <option value="5">Artemia Pires</option>
              </select>
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
                <option value="">Selecione um departamento</option>
                <option value="Commodities">Commodities</option>
                <option value="Frios e Laticinios">Frios e Laticinios</option>
                <option value="Higiene">Higiene</option>
                <option value="Perfumaria">Perfumaria</option>
                <option value="Hortifruti">Hortifruti</option>
                <option value="Doces">Doces</option>
              </select>
            </div>

            <div className="prevencao__input-group">
              <label htmlFor="ocorrencia">Ocorrência</label>
              <select
                id="ocorrencia"
                name="ocorrencia"
                value={ocorrencia}
                onChange={(event) => setOcorrencia(event.target.value)}
                required
              >
                <option value="">Selecione</option>
                <option value="Cliente">Cliente</option>
                <option value="Colaborador">Colaborador</option>
                <option value="Cliente e Colaborador">Cliente e Colaborador</option>
                <option value="Cliente">Cliente</option>
              </select>
            </div>

            <div className="prevencao__input-group">
              <label htmlFor="resumo">Resumo da Ocorrência:</label>
              <textarea
                id="resumo"
                name="resumo"
                value={resumo}
                onChange={handleChange}
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

export default Ocorrencia;
