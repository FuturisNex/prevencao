import React, { useState, useEffect } from 'react';
import './Formulario.css';
import { Link } from "react-router-dom";
import axios from "axios";

const Doações = () => {
    const [nome, setNome] = useState("");
    const [data, setData] = useState("");
    const [loja, setLoja] = useState("");
    const [produto, setProduto] = useState("");
    const [quantidade, setQuantidade] = useState("");
    const [instituicao, setInstituicao] = useState("");
    const [observacao, setObservacao] = useState("");
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
        } else if (name === "loja") {
            setLoja(value);
        } else if (name === "produto") {
            setProduto(value);
        } else if (name === "quantidade") {
            setQuantidade(value);
        } else if (name === "instituicao") {
            setInstituicao(value);
        } else if (name === "observacao") {
            setObservacao(value);
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
            formData.append("Loja", loja);
            formData.append("Produto", produto);
            formData.append("Quantidade", quantidade);
            formData.append("Instituicao", instituicao);
            formData.append("Observacao", observacao);

            setIsSending(true);

            await axios.post(
                "https://script.google.com/macros/s/AKfycbxZy4NbREbl5zCNzeK-sZt_Qm8xAcuKngky_kYd-3KeWnjfw6YSONMfOckD6iAgPe2nrA/exec",
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
                setLoja("");
                setProduto("");
                setQuantidade("");
                setInstituicao("");
                setObservacao("");
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
        setLoja("");
        setProduto("");
        setQuantidade("");
        setInstituicao("");
        setObservacao("");
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
            <h3 className="prevencao__subtitulo">Doações</h3>
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
                    <label htmlFor="data">Data de Saida:</label>
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
                        <option value="Castro Alves">Castro Alves</option>
                        <option value="Fraga Maia">Fraga Maia</option>
                        <option value="Artemia Pires">Artemia Pires</option>
                        <option value="Tomé de Souza">Tomé de Souza</option>
                        <option value="Calamar Express">Calamar Express</option>
                        <option value="Artemia Express">Artemia Express</option>
                        <option value="Santo Estevão">Santo Estevão</option>
                        <option value="Tomba">Tomba</option>
                    </select>
                </div>

                <div className="prevencao__input-group">
                    <label htmlFor="produto">Produto:</label>
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
                    <label htmlFor="quantidade">Quantidade:</label>
                    <input
                        type="text"
                        id="quantidade"
                        name="quantidade"
                        value={quantidade}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="prevencao__input-group">
                    <label htmlFor="instituicao">Instituição:</label>
                    <input
                        type="text"
                        id="instituicao"
                        name="instituicao"
                        value={instituicao}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="prevencao__input-group">
                    <label htmlFor="observacao">Observação:</label>
                    <textarea
                        id="observacao"
                        name="observacao"
                        value={observacao}
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
                        onClick={handleOpenLink}
                    >
                        Lista
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Doações;
