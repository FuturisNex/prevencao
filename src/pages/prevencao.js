import React, { useState } from 'react';
import './Prevencao.css';
import logo from "./grupo.png";
import axios from "axios";

const Prevencao = () => {
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
  const [OutroObjeto, setOutroObjeto] = useState("");
  const [produto, setProduto] = useState("");
  const [recuperado, setRecuperado] = useState("");
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
    } else if (name === "identificou") {
      setIdentificou(value);
      // Reset the value of outroColaborador when identificou changes
      setOutroColaborador("");
    } else if (name === "outroColaborador") {
      setOutroColaborador(value);
    } else if (name === "utilizou") {
      setUtilizou(value);
      // Reset the value of outroObjeto when utilizou changes
      setOutroObjeto("");
    } else if (name === "outroObjeto") {
      setOutroObjeto(value);
    } else if (name === "produto") {
      setProduto(value);
    } else if (name === "recuperado") {
      setRecuperado(value);
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

    try {
      const formData = {
        Nome: nome,
        Data: formatDate(data),
        Hora: hora,
        Genero: genero,
        Idade: idade,
        Loja: loja,
        Departamento: departamento,
        Identificou: identificou === "Outro" ? outroColaborador : identificou,
        Utilizou: utilizou === "Outros" ? outroObjeto : utilizou,
        Produto: produto,
        Recuperado: recuperado,
        Resumo: resumo,
      };

      const response = await axios.post(
        "https://script-to-save-form-data",
        formData
      );

      console.log(response.data);

      setSuccessMessage("Formulário enviado com sucesso!");

      // Reset form fields after submission
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
      setProduto("");
      setRecuperado("");
      setResumo("");

      setIsSubmitting(false);
    } catch (error) {
      console.error(error);
      setErrorMessage("Ocorreu um erro ao enviar o formulário.");
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return date.toLocaleDateString("pt-BR", options);
  };

  const handleCloseSuccessMessage = () => {
    setSuccessMessage("");
  };

  const handleCloseErrorMessage = () => {
    setErrorMessage("");
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
            <h3 className="prevencao__subtitulo">Características</h3>

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
                  <label htmlFor="idade">Idade:</label>
                  <input
                    type="text"
                    id="idade"
                    name="idade"
                    pattern="[0-9]*"
                    value={idade}
                    onChange={handleChange}
                  />
                </div>
        
            <h3 className="prevencao__subtitulo">Furto</h3>

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
                <option value="Outro">Outro Colaborador</option>
              </select>
            </div>

            {identificou === 'Outro' && (
              <div className="prevencao__input-group">
                <label htmlFor="outroColaborador">Outro Colaborador:</label>
                <input
                  type="text"
                  id="outroColaborador"
                  name="outroColaborador"
                  value={outroColaborador}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

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
                <option value="Outros">Outro</option>
              </select>
            </div>

            {utilizou === 'Outros' && (
              <div className="prevencao__input-group">
                <label htmlFor="OutroObjeto">Outro Objeto:</label>
                <input
                  type="text"
                  id="OutroObjeto"
                  name="OutroObjeto"
                  value={OutroObjeto}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

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
              <label htmlFor="resumo">Resumo do Furto:</label>
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

export default Prevencao;
