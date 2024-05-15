import React, { useState, useEffect } from 'react';
import './Formulario.css';
import { Link } from "react-router-dom";
import axios from "axios";

const PrevencaoI = () => {
  const [nome, setNome] = useState("");
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");
  const [genero, setGenero] = useState("");
  const [idade, setIdade] = useState("");
  const [loja, setLoja] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [identificou, setIdentificou] = useState("");
  const [outroColaborador, setOutroColaborador] = useState("");
  const [utilizou, setUtilizou] = useState("");
  const [outroObjeto, setOutroObjeto] = useState("");
  const [ocorrencia, setOcorrencia] = useState("");
  const [produto, setProduto] = useState("");
  const [recuperado, setRecuperado] = useState("");
  const [resumo, setResumo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [outroColaboradorText, setOutroColaboradorText] = useState("");
  const [outroObjetoText, setOutroObjetoText] = useState("");

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
    } else if (name === "identificou") {
      setIdentificou(value);
    } else if (name === "outroColaborador") {
      setOutroColaborador(value);
    } else if (name === "outroObjeto") {
      if (value !== "Outro") {
        setOutroObjetoText("");
      }
      setOutroObjeto(value);
    } else if (name === "produto") {
      setProduto(value);
    } else if (name === "ocorrencia") {
      setOcorrencia(value);
    } else if (name === "recuperado") {
      setRecuperado(value);
    } else if (name === "resumo") {
      setResumo(value);
    } else if (name === "outroColaboradorText") {
      setOutroColaboradorText(value);
    } else if (name === "outroObjetoText") {
      setOutroObjetoText(value);
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
      formData.append("Departamento", departamento);
      formData.append("Identificou", identificou);
      formData.append("OutroColaborador", outroColaborador === "outroColaborador" ? outroColaboradorText : "");
      formData.append("Utilizou", utilizou);
      formData.append("OutroObjeto", utilizou === "outroObjeto" ? outroObjetoText : "");
      formData.append("Produto", produto);
      formData.append("Ocorrencia", ocorrencia);
      formData.append("Recuperado", recuperado);
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
        setOutroColaborador("");
        setUtilizou("");
        setOutroObjeto("");
        setOcorrencia("");
        setProduto("");
        setRecuperado("");
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

  const resetForm = () => {
    setNome("");
    setData("");
    setHora("");
    setGenero("");
    setIdade("");
    setLoja("");
    setDepartamento("");
    setIdentificou("");
    setOcorrencia("");
    setUtilizou("");
    setProduto("");
    setRecuperado("");
    setResumo("");
  };

  const handleOpenLink = () => {
    const isMobile = window.innerWidth <= 768;
    const link = isMobile ? "https://lookerstudio.google.com/reporting/6ee0737d-4039-45dd-a9c6-565508546dda" : "https://lookerstudio.google.com/reporting/bc184541-8cc5-47c0-9298-e0746dd5a47c";

    window.open(link, "_blank");
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
      <h3 className="prevencao__subtitulo">Furtos e Inibição</h3>
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
            <option value="">Selecione</option>
            <option value="Santa Mônica">Santa Mônica</option>
            <option value="Tomé de Souza">Tomé de Souza</option>
            <option value="Castro Alves">Castro Alves</option>
            <option value="Tomba">Tomba</option>
            <option value="Fraga Maia">Fraga Maia</option>
            <option value="Artemia Pires">Artemia Pires</option>
            <option value="Calamar Express">Calamar Express</option>
            <option value="Artemia Express">Artemia Express</option>
            <option value="Santo Estevão">Santo Estevão</option>
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
            <option value="">Selecione</option>
            <option value="Commodities">Commodities</option>
            <option value="Frios e Laticinios">Frios e Laticinios</option>
            <option value="Higiene">Higiene</option>
            <option value="Perfumaria">Perfumaria</option>
            <option value="Hortifruti">Hortifruti</option>
            <option value="Doces">Doces</option>
          </select>
        </div>

        <div className="prevencao__input-group">
          <label htmlFor="identificou">Quem identificou?</label>
          <select
            id="identificou"
            name="identificou"
            value={identificou}
            onChange={(event) => setIdentificou(event.target.value)}
            required
          >
            <option value="">Selecione</option>
            <option value="CFTV">CFTV</option>
            <option value="Prevenção de Piso">Prevenção de Piso</option>
            <option value="Cliente">Cliente</option>
            <option value="Colaborador">Colaborador</option>
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
          <label htmlFor="utilizou">Utilizou algum objeto para praticar o furto?</label>
          <select
            id="utilizou"
            name="utilizou"
            value={utilizou}
            onChange={(event) => setUtilizou(event.target.value)}
            required
          >
            <option value="">Selecione</option>
            <option value="Mochila">Mochila</option>
            <option value="Sacola">Sacola</option>
            <option value="Roupa">Roupa</option>
            <option value="Caixa de Papelão">Caixa de Papelão</option>
            <option value="Nenhum objeto foi utilizado">Nenhum objeto foi utilizado</option>
          </select>
        </div>

        <div className="prevencao__input-group">
          <label htmlFor="produto">Produto Furtado:</label>
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
          <label htmlFor="recuperado">Valor Recuperado:</label>
          <input
            type="text"
            id="recuperado"
            name="recuperado"
            value={recuperado}
            onChange={handleChange}
            required
          />
        </div>

        <div className="prevencao__input-group">
          <label htmlFor="resumo">Resumo da Ocorrencia:</label>
          <textarea
            id="resumo"
            name="resumo"
            value={resumo}
            onChange={handleChange}
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
            onClick={handleOpenLink}
          >
            Lista
          </button>
        </div>
      </form>
    </div>
  );
};

export default PrevencaoI;
