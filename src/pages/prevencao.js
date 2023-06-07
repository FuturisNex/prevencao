import React, { useState, useEffect } from 'react';
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
  const [utilizou, setUtilizou] = useState(false);
  const [produto, setProduto] = useState("");
  const [recuperado, setRecuperado] = useState(false);
  const [resumo, setResumo] = useState(false);
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
    } else if (name === "utilizou") {
      setUtilizou(value);
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
  formData.append("Utilizou", utilizou);
  formData.append("Produto", produto);
  formData.append("Recuperado", recuperado);
  formData.append("Resumo", resumo);

  const response = await axios.post(
    "https://script.google.com/macros/s/AKfycbyaF4yRbmVH-x6SOJz78Ui9O-ua-NuCq-J5SUgo5PofZopLXSvTAha8Ye8SfDQgK2kf/exec",
    formData
  );

  if (response.status === 200) {
    setSuccessMessage(response.data);
    resetForm();
    setIsSubmitted(true);
  } else {
    throw new Error(
      "Erro ao enviar formulário. Tente novamente mais tarde."
    );
  }
} catch (error) {
  console.error(error);
  setErrorMessage(error.message);
} finally {
  setIsSubmitting(false);
}
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
    setUtilizou("");
    setProduto("");
    setRecuperado("");
    setResumo("");
  };
  
    const formatDate = (date) => {
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  };
  
  return (
    <div className="prevencao">
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
                <option value="homem">Homem</option>
                <option value="mulher">Mulher</option>
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
                <option value="Perfumaria">Perfumaria</option>
                <option value="Frios">Frios</option>
                <option value="Comodes">Comodes</option>
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
                <option value="Outro">Outro</option>
              </select>
            </div>

            {identificou === 'Outro' && (
              <div className="prevencao__input-group">
                <label htmlFor="identificou">Outro Colaborador:</label>
                <input
                  type="text"
                  id="identificou"
                  name="identificou"
                  value={identificou}
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
                <option value="Outro">Outro</option>
              </select>
            </div>

            {utilizou === 'Outro' && (
              <div className="prevencao__input-group">
                <label htmlFor="utilizou">Outro Objeto:</label>
                <input
                  type="text"
                  id="utilizou"
                  name="utilizou"
                  value={utilizou}
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
                pattern="[0-9]*([,.][0-9]+)?"
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
      </form>
    </div>
  );
};

export default Prevencao;
