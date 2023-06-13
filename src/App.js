import React from 'react';
import { BrowserRouter as Router, Routes, Route, Form } from 'react-router-dom';
import Prevencao from './pages/prevencao';
import Prevencao from './pages/Inicio/TelaInicial';
import Prevencao from './pages/Ocorrencia/Ocorrencia';

const App = () => {
  return (
    <Router>
      <div className='bg-catskillWhite'>
        <Routes>
          <Route path="/" element={<Prevencao />} />
          <Route path="/ocorrencia" element={<Ocorrencia />} />
          <Route path="/i" element={<TelaInicial />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
