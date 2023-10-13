import React from "react";
import { BrowserRouter as Router, Routes, Route, Form } from "react-router-dom";
import TelaInicial from "./pages/Inicio/TelaInicial";
import NotFound from "./pages/NotFound/NotFound";
import Home from "./pages/home/home";
import ListaOpcao from "./pages/ListaOpcao/ListaOpcao";

import Prevencao from "./pages/Opcoes/Prevencao/prevencao";
import ListaPrevencao from "./pages/Opcoes/Prevencao/Lista";

import Ocorrencia from "./pages/Opcoes/Ocorrencia/Ocorrencia";
import ListaOcorrencia from "./pages/Opcoes/Ocorrencia/Lista";

import Descarte from "./pages/Opcoes/Descarte/Descarte";
import ListaDescarte from "./pages/Opcoes/Descarte/Lista";

import Equipamentos from "./pages/Opcoes/Equipamentos/Equipamentos";
import ListaEquipamentos from "./pages/Opcoes/Equipamentos/Lista";

const App = () => {
  return (
    <Router>
      <div className="bg-catskillWhite">
        <Routes>
          <Route path="/furto" element={<Prevencao />} />
          <Route path="/furto-lista" element={<ListaPrevencao />} />

          <Route path="/ocorrencia" element={<Ocorrencia />} />
          <Route path="/ocorrencia-lista" element={<ListaOcorrencia />} />

          <Route path="/descarte" element={<Descarte />} />
          <Route path="/descarte-lista" element={<ListaDescarte />} />

          <Route path="/equipamentos" element={<Equipamentos />} />
          <Route path="/equipamentos-lista" element={<ListaEquipamentos />} />

          <Route path="/lista" element={<ListaOpcao />} />
          <Route path="/enviar" element={<TelaInicial />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
