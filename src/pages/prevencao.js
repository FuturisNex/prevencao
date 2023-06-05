import React, { useState } from 'react';
import './Prevencao.css';

const Prevencao = () => {
  const [caracteristicas, setCaracteristicas] = useState({
    nome: '',
    idade: '',
    genero: '',
    cor: '',
    outroCor: '',
  });

  const [furto, setFurto] = useState({
    utilizouObjeto: '',
    outroObjeto: '',
    produtoFurtado: '',
    resumoFurto: '',
  });

  const [inibicao, setInibicao] = useState({
    inibicaoSetor: '',
    inibicaoProduto: '',
    valorRecuperado: '',
    filial: '',
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
              <label htmlFor="idade">Idade:</label>
              <input
                type="text"
                id="idade"
                name="idade"
                value={caracteristicas.idade}
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
                <option value="masculino">Masculino</option>
                <option value="feminino">Feminino</option>
                <option value="outro">Outro</option>
              </select>
            </div>

            {caracteristicas.genero === 'outro' && (
              <div className="prevencao__input-group">
                <label htmlFor="outroGenero">Outro Gênero:</label>
                <input
                  type="text"
                  id="outroGenero"
                  name="outroGenero"
                  value={caracteristicas.outroGenero}
                  onChange={handleChangeCaracteristicas}
                  required
                />
              </div>
            )}

            <div className="prevencao__input-group">
              <label htmlFor="cor">Cor:</label>
              <select
                id="cor"
                name="cor"
                value={caracteristicas.cor}
                onChange={handleChangeCaracteristicas}
                required
              >
                <option value="">Selecione</option>
                <option value="azul">Azul</option>
                <option value="vermelho">Vermelho</option>
                <option value="amarelo">Amarelo</option>
                <option value="outro">Outro</option>
              </select>
            </div>

            {caracteristicas.cor === 'outro' && (
              <div className="prevencao__input-group">
                <label htmlFor="outroCor">Outra Cor:</label>
                <input
                  type="text"
                  id="outroCor"
                  name="outroCor"
                  value={caracteristicas.outroCor}
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
                <option value="mochila">Mochila</option>
                <option value="sacola">Sacola</option>
                <option value="roupa">Roupa</option>
                <option value="outro">Outro</option>
              </select>
            </div>

            {furto.utilizouObjeto === 'outro' && (
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
              <label htmlFor="resumoFurto">Resumo do Furto:</label>
              <textarea
                id="resumoFurto"
                name="resumoFurto"
                value={furto.resumoFurto}
                onChange={handleChangeFurto}
                required
              />
            </div>

            <button type="button" className="prevencao__avancar" onClick={handleAvancarClick}>
              Avançar
            </button>
          </>
        )}

        {etapaAtual === 3 && (
          <>
            <h3 className="prevencao__subtitulo">Inibição</h3>

            <div className="prevencao__input-group">
              <label htmlFor="inibicaoSetor">Setor:</label>
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
              <label htmlFor="inibicaoProduto">Produto:</label>
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
              <label htmlFor="valorRecuperado">Valor Recuperado:</label>
              <input
                type="text"
                id="valorRecuperado"
                name="valorRecuperado"
                value={inibicao.valorRecuperado}
                onChange={handleChangeInibicao}
                required
              />
            </div>

            <button type="submit" className="prevencao__submit">
              Enviar
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default Prevencao;
