import React, { useState } from 'react';
import './Prevencao.css';

const Prevencao = () => {
  const [caracteristicas, setCaracteristicas] = useState({
    genero: '',
    idadeHomem: '',
    idadeMulher: '',
  });

  const [furto, setFurto] = useState({
    utilizouObjeto: '',
    quemIdentificou: '',
    outroColaborador: '',
  });

  const handleChangeCaracteristicas = (event) => {
    const { name, value } = event.target;
    setCaracteristicas((prevCaracteristicas) => ({
      ...prevCaracteristicas,
      [name]: value,
    }));
  };

  const handleChangeFurto = (event) => {
    const { name, value } = event.target;
    setFurto((prevFurto) => ({
      ...prevFurto,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Lógica para enviar os dados
  };

  return (
    <div className="prevencao">
      <h2 className="prevencao__titulo">Formulário de Prevenção</h2>

      <form className="prevencao__form" onSubmit={handleSubmit}>
        <h3>Gênero</h3>
        <div>
          <label>
            <input
              type="checkbox"
              name="genero"
              value="homem"
              checked={caracteristicas.genero === 'homem'}
              onChange={handleChangeCaracteristicas}
            />{' '}
            Homem
          </label>
          <label>
            <input
              type="checkbox"
              name="genero"
              value="mulher"
              checked={caracteristicas.genero === 'mulher'}
              onChange={handleChangeCaracteristicas}
            />{' '}
            Mulher
          </label>
        </div>

        {caracteristicas.genero && (
          <>
            {caracteristicas.genero.includes('homem') && (
              <div>
                <label>Idade do Homem:</label>
                <input
                  type="text"
                  name="idadeHomem"
                  pattern="[0-9]*"
                  value={caracteristicas.idadeHomem}
                  onChange={handleChangeCaracteristicas}
                  required
                />
              </div>
            )}

            {caracteristicas.genero.includes('mulher') && (
              <div>
                <label>Idade da Mulher:</label>
                <input
                  type="text"
                  name="idadeMulher"
                  pattern="[0-9]*"
                  value={caracteristicas.idadeMulher}
                  onChange={handleChangeCaracteristicas}
                  required
                />
              </div>
            )}
          </>
        )}

        <div>
          <label>
            Utilizou algum objeto para praticar o furto?
            <select
              name="utilizouObjeto"
              value={furto.utilizouObjeto}
              onChange={handleChangeFurto}
              required
            >
              <option value="">Selecione</option>
              <option value="CFTV">CFTV</option>
              <option value="Prevenção de Piso">Prevenção de Piso</option>
              <option value="Outro">Outro</option>
            </select>
          </label>
        </div>

        {furto.utilizouObjeto === 'Outro' && (
          <div>
            <label>Outro Objeto:</label>
            <input
              type="text"
              name="outroObjeto"
              value={furto.outroObjeto}
              onChange={handleChangeFurto}
              required
            />
          </div>
        )}

        <div>
          <label>
            Quem identificou?
            <select
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
          </label>
        </div>

        {furto.quemIdentificou === 'Outro' && (
          <div>
            <label>Outro Colaborador:</label>
            <input
              type="text"
              name="outroColaborador"
              value={furto.outroColaborador}
              onChange={handleChangeFurto}
              required
            />
          </div>
        )}

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Prevencao;
