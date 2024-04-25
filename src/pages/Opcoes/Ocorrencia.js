import React, { useState, useEffect } from 'react';
import './Formulario.css';
import { Link } from "react-router-dom";
import logo from "../../resources/images/logo.png";
import axios from "axios";

const Ocorrencia = () => {
  const [nome, setNome] = useState("");
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");
  const [genero, setGenero] = useState("");
  const [idade, setIdade] = useState("");
  const [loja, setLoja] = useState("");
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
      formData.append("Data", formatDate(data));
      formData.append("Hora", hora);
      formData.append("Genero", genero);
      formData.append("Idade", idade);
      formData.append("Loja", loja);
      formData.append("Ocorrencia", ocorrencia);
      formData.append("Resumo", resumo);

      setIsSending(true);

      await axios.post(
        "https://script.google.com/macros/s/AKfycbwZb6Ru5J-aWJlpbC_8b-llXALERIF8QlyjGQpsoPETNMHDctCJ6Q1PxaL8kOAUFKZy/exec",
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
        setOcorrencia("");
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
      "https://lookerstudio.google.com/reporting/bc184541-8cc5-47c0-9298-e0746dd5a47c",
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
      <Link to="/" className="back-button">
        <span>Voltar</span>
      </Link>
      <img src={logo} alt="Logo" className="logo-form" />
      <h3 className="prevencao__subtitulo">Ocorrência</h3>
      <form className="prevencao__form" onSubmit={handleSubmit}>

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
            <option value="">Selecione</option>
            <option value="De 10 a 15 Anos">De 10 a 15 Anos</option>
            <option value="De 15 a 18 Anos">De 15 a 18 Anos</option>
            <option value="De 18 a 20 Anos">De 18 a 20 Anos</option>
            <option value="De 20 a 30 Anos">De 20 a 30 Anos</option>
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
          <label htmlFor="ocorrencia">Ocorrência</label>
          <select
            id="ocorrencia"
            name="ocorrencia"
            value={ocorrencia}
            onChange={(event) => setOcorrencia(event.target.value)}
            required
          >
            <option value="">Selecione</option>
            <option value="Cliente">Com Cliente</option>
            <option value="Colaborador">Com Colaborador</option>
            <option value="Cliente e Colaborador">Com Cliente e Colaborador</option>
          </select>
        </div>

        <div className="prevencao__input-group">
          <label htmlFor="resumo">Resumo da Ocorrência:</label>
          <textarea
            id="resumo"
            name="resumo"
            value={resumo}
            onChange={handleChange}
            required
          />
        </div>
        <div className='button_lista'>
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
        </div>
      </form>
    </div>
  );
};

export default Ocorrencia;
