import React, { useState } from 'react';
import './Prevencao.css';

const Prevencao = () => {
  const [caracteristicas, setCaracteristicas] = useState({
    genero: '',
    idadeHomem: '',
    idadeMulher: ''
  });

  const [furto, setFurto] = useState({
    utilizouObjeto: '',
    outroObjeto: '',
    produtoFurtado: '',
    resumoFurto: ''
  });

  const [inibicao, setInibicao] = useState({
    inibicaoSetor: '',
    inibicaoProduto: '',
    valorRecuperado: '',
    filial: ''
  });

  const [etapaAtual, setEtapaAtual] = useState(1);

  const handleChangeCaracteristicas = (event) => {
    const { name, value } = event.target;
    setCaracteristicas((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };

  const handleChangeFurto = (event) => {
    const { name, value } = event.target;
    setFurto((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };

  const handleChangeInibicao = (event) => {
    const { name, value } = event.target;
    setInibicao((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };

  const handleAvancarClick = () => {
    setEtapaAtual((prevEtapa) => prevEtapa + 1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aqui você pode adicionar a lógica para enviar os dados do formulário
    // e redefinir o estado do formulário, se necessário.
  };

  return (
    <div className="prevencao">
      <h2 className="prevencao__titulo">Formulário de Prevenção</h2>

      <form className="prevencao__form" onSubmit={handleSubmit}>
        {etapaAtual === 1 && (
          <>
            <h3 className="prevencao__subtitulo">Características</h3>

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

            <div className="prevencao__btn-container">
              <button
                type="button"
                className="prevencao__btn"
                onClick={handleAvancarClick}
              >
                Avançar
              </button>
            </div>
          </>
        )}

        {etapaAtual === 2 && (
          <>
            <h3 className="prevencao__subtitulo">Furto</h3>

            <div className="prevencao__input-group">
              <label htmlFor="utilizouObjeto">
                Utilizou algum objeto para praticar o furto?
              </label>
              <select
                id="utilizouObjeto"
                name="utilizouObjeto"
                value={furto.utilizouObjeto}
                onChange={handleChangeFurto}
                required
              >
                <option value="">Selecione</option>
                <option value="CFTV">CFTV</option>
                <option value="Prevenção de Piso">Prevenção de Piso</option>
                <option value="Outro colaborador">Outro colaborador</option>
              </select>
            </div>

            {furto.utilizouObjeto === 'Outro colaborador' && (
              <div className="prevencao__input-group">
                <label htmlFor="outroObjeto">Descreva o outro colaborador:</label>
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

            <div className="prevencao__btn-container">
              <button
                type="button"
                className="prevencao__btn"
                onClick={() => setEtapaAtual((prevEtapa) => prevEtapa - 1)}
              >
                Voltar
              </button>
              <button type="submit" className="prevencao__btn">
                Enviar
              </button>
            </div>
          </>
        )}

        {etapaAtual === 3 && (
          <>
            <h3 className="prevencao__subtitulo">Inibição</h3>

            <div className="prevencao__input-group">
              <label htmlFor="inibicaoSetor">Setor da inibição:</label>
              <input
                type="text"
                id="inibicaoSetor"
                name="inibicaoSetor"
                value={inibicao.inibicaoSetor}
                onChange={handleChangeInibicao}
                required
              />
            </div>

            <div className="prevencao__input-group">
              <label htmlFor="inibicaoProduto">Produto da inibição:</label>
              <input
                type="text"
                id="inibicaoProduto"
                name="inibicaoProduto"
                value={inibicao.inibicaoProduto}
                onChange={handleChangeInibicao}
                required
              />
            </div>

            <div className="prevencao__input-group">
              <label htmlFor="valorRecuperado">Valor recuperado:</label>
              <input
                type="text"
                id="valorRecuperado"
                name="valorRecuperado"
                pattern="[0-9]*"
                value={inibicao.valorRecuperado}
                onChange={handleChangeInibicao}
                required
              />
            </div>

            <div className="prevencao__input-group">
              <label htmlFor="filial">Filial:</label>
              <input
                type="text"
                id="filial"
                name="filial"
                value={inibicao.filial}
                onChange={handleChangeInibicao}
                required
              />
            </div>

            <div className="prevencao__btn-container">
              <button
                type="button"
                className="prevencao__btn"
                onClick={() => setEtapaAtual((prevEtapa) => prevEtapa - 1)}
              >
                Voltar
              </button>
              <button type="submit" className="prevencao__btn">
                Enviar
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default Prevencao;
