import React, { useState } from 'react';
import './Prevencao.css';
import logo from "./grupo.png";

const Prevencao = () => {
  const [caracteristicas, setCaracteristicas] = useState({
    nome: '',
    data: '',
    hora: '',
    idadeHomem: '',
    idadeMulher: '',
    genero: '',
  });

  const [furto, setFurto] = useState({
    utilizouObjeto: '',
    outroObjeto: '',
    produtoFurtado: '',
    resumoFurto: '',
    quemIdentificou: '',
    outroColaborador: '',
  });

  const [inibicao, setInibicao] = useState({
    inibicaoSetor: '',
    inibicaoProduto: '',
    valorRecuperado: '',
    filial: '',
    departamento: '',
  });

  const [etapaAtual, setEtapaAtual] = useState(1);

  const handleChangeCaracteristicas = (event) => {
    const { name, value } = event.target;
    setCaracteristicas((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleChangeFurto = (event) => {
    const { name, value } = event.target;
    setFurto((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleChangeInibicao = (event) => {
    const { name, value } = event.target;
    setInibicao((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleAvancarClick = () => {
    setEtapaAtual((prevEtapa) => prevEtapa + 1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      ...caracteristicas,
      ...furto,
      ...inibicao,
    };

    // Envia os dados para o Apps Script
fetch('https://script.google.com/macros/s/AKfycbzXLnbMafEKplUidQDS6lzeA_Jr_5yfgaJthlnktmlUQTHrP5L4eFAymS8daDT7y2HD/exec', {
  method: 'POST',
  mode: 'no-cors', // Adicione esta linha
  body: JSON.stringify(formData),
})
.then((response) => response.text())
.then((data) => {
  console.log(data);
  // Faça o que for necessário após enviar os dados com sucesso
})
.catch((error) => {
  console.error(error);
});

  return (
    <div className="prevencao">
      <img src={logo} alt="Logo" className="logo-form" />
      <h2 className="prevencao__titulo">Formulário de Prevenção</h2>
      <form className="prevencao__form" onSubmit={handleSubmit}>
        {etapaAtual === 1 && (
          <>
            <h3 className="prevencao__subtitulo">Características</h3>

            <div className="prevencao__input-group">
              <label htmlFor="nome">Nome:</label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={caracteristicas.nome}
                onChange={handleChangeCaracteristicas}
                required
              />
            </div>

            <div className="prevencao__input-group">
              <label htmlFor="data">Data:</label>
              <input
                type="date"
                id="data"
                name="data"
                value={caracteristicas.data}
                onChange={handleChangeCaracteristicas}
                required
              />
            </div>

            <div className="prevencao__input-group">
              <label htmlFor="hora">Hora:</label>
              <input
                type="time"
                id="hora"
                name="hora"
                value={caracteristicas.hora}
                onChange={handleChangeCaracteristicas}
                required
              />
            </div>

            <div className="prevencao__input-group">
              <label htmlFor="genero">Gênero:</label>
              <select
                id="genero"
                name="genero"
                value={caracteristicas.genero}
                onChange={handleChangeCaracteristicas}
                required
              >
                <option value="">Selecione</option>
                <option value="homem">Homem</option>
                <option value="mulher">Mulher</option>
                <option value="ambos">Ambos</option>
              </select>
            </div>

            {caracteristicas.genero === 'ambos' && (
              <>
                <div className="prevencao__input-group">
                  <label htmlFor="idadeHomem">Idade do Homem:</label>
                  <input
                    type="text"
                    id="idadeHomem"
                    name="idadeHomem"
                    pattern="[0-9]*"
                    value={caracteristicas.idadeHomem}
                    onChange={handleChangeCaracteristicas}
                    required
                  />
                </div>

                <div className="prevencao__input-group">
                  <label htmlFor="idadeMulher">Idade da Mulher:</label>
                  <input
                    type="text"
                    id="idadeMulher"
                    name="idadeMulher"
                    pattern="[0-9]*"
                    value={caracteristicas.idadeMulher}
                    onChange={handleChangeCaracteristicas}
                    required
                  />
                </div>
              </>
            )}

            {caracteristicas.genero === 'homem' && (
              <div className="prevencao__input-group">
                <label htmlFor="idadeHomem">Idade do Homem:</label>
                <input
                  type="text"
                  id="idadeHomem"
                  name="idadeHomem"
                  pattern="[0-9]*"
                  value={caracteristicas.idadeHomem}
                  onChange={handleChangeCaracteristicas}
                  required
                />
              </div>
            )}

            {caracteristicas.genero === 'mulher' && (
              <div className="prevencao__input-group">
                <label htmlFor="idadeMulher">Idade da Mulher:</label>
                <input
                  type="text"
                  id="idadeMulher"
                  name="idadeMulher"
                  pattern="[0-9]*"
                  value={caracteristicas.idadeMulher}
                  onChange={handleChangeCaracteristicas}
                  required
                />
              </div>
            )}

            <button type="button" className="prevencao__avancar" onClick={handleAvancarClick}>
              Avançar
            </button>
          </>
        )}

        {etapaAtual === 2 && (
          <>
            <h3 className="prevencao__subtitulo">Furto</h3>

            <div className="prevencao__input-group">
              <label htmlFor="filial">Loja:</label>
              <select
                id="filial"
                name="filial"
                value={inibicao.filial}
                onChange={handleChangeInibicao}
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
                value={inibicao.departamento}
                onChange={handleChangeInibicao}
                required
              >
                <option value="">Selecione um departamento</option>
                <option value="Perfumaria">Perfumaria</option>
                <option value="Frios">Frios</option>
                <option value="Comodes">Comodes</option>
              </select>
            </div>

            <div className="prevencao__input-group">
              <label htmlFor="quemIdentificou">Quem identificou?</label>
              <select
                id="quemIdentificou"
                name="quemIdentificou"
                value={furto.quemIdentificou}
                onChange={handleChangeFurto}
                required
              >
                <option value="">Selecione</option>
                <option value="CFTV">CFTV</option>
                <option value="Prevenção de Piso">Prevenção de Piso</option>
                <option value="Outro">Outro</option>
              </select>
            </div>

            {furto.quemIdentificou === 'Outro' && (
              <div className="prevencao__input-group">
                <label htmlFor="outroColaborador">Outro Colaborador:</label>
                <input
                  type="text"
                  id="outroColaborador"
                  name="outroColaborador"
                  value={furto.outroColaborador}
                  onChange={handleChangeFurto}
                  required
                />
              </div>
            )}

            <div className="prevencao__input-group">
              <label htmlFor="utilizouObjeto">Utilizou algum objeto para praticar o furto?</label>
              <select
                id="utilizouObjeto"
                name="utilizouObjeto"
                value={furto.utilizouObjeto}
                onChange={handleChangeFurto}
                required
              >
                <option value="">Selecione</option>
                <option value="Mochila">Mochila</option>
                <option value="Sacola">Sacola</option>
                <option value="Roupa">Roupa</option>
                <option value="Outro">Outro</option>
              </select>
            </div>

            {furto.utilizouObjeto === 'Outro' && (
              <div className="prevencao__input-group">
                <label htmlFor="outroObjeto">Outro Objeto:</label>
                <input
                  type="text"
                  id="outroObjeto"
                  name="outroObjeto"
                  value={furto.outroObjeto}
                  onChange={handleChangeFurto}
                  required
                />
              </div>
            )}

            <div className="prevencao__input-group">
              <label htmlFor="produtoFurtado">Produto Furtado:</label>
              <input
                type="text"
                id="produtoFurtado"
                name="produtoFurtado"
                value={furto.produtoFurtado}
                onChange={handleChangeFurto}
                required
              />
            </div>

            <div className="prevencao__input-group">
              <label htmlFor="valorRecuperado">Valor Recuperado:</label>
              <input
                type="text"
                id="valorRecuperado"
                name="valorRecuperado"
                pattern="[0-9]*([,.][0-9]+)?"
                value={inibicao.valorRecuperado}
                onChange={handleChangeInibicao}
                required
              />
            </div>

            <div className="prevencao__input-group">
              <label htmlFor="resumoFurto">Resumo do Furto:</label>
              <textarea
                id="resumoFurto"
                name="resumoFurto"
                value={furto.resumoFurto}
                onChange={handleChangeFurto}
                required
              />
            </div>

            <button type="submit" className="prevencao__submit">Enviar</button>
          </>
        )}
      </form>
    </div>
  );
};

export default Prevencao;
