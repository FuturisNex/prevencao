import React from "react";
import { BrowserRouter as Router, Routes, Route, Form } from "react-router-dom";
import TelaInicial from "./pages/Inicio/TelaInicial";
import NotFound from "./pages/NotFound/NotFound";
import Prevencao from "./pages/Opcoes/Prevencao";
import Ocorrencia from "./pages/Opcoes/Ocorrencia";
import Descarte from "./pages/Opcoes/Descarte";
import Equipamentos from "./pages/Opcoes/Equipamentos";

const App = () => {
  return (
    <Router>
      <div className="bg-catskillWhite">
        <Routes>
          <Route path="/furto" element={<Prevencao />} />
          <Route path="/ocorrencia" element={<Ocorrencia />} />
          <Route path="/descarte" element={<Descarte />} />
          <Route path="/equipamentos" element={<Equipamentos />} />
          <Route path="/enviar" element={<TelaInicial />} />
          <Route path="/" element={<TelaInicial />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
