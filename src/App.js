import React from 'react';
import { BrowserRouter as Router, Routes, Route, Form } from 'react-router-dom';
import Prevencao from './pages/prevencao';
import TelaInicial from './pages/Inicio/TelaInicial';
import Ocorrencia from './pages/Ocorrencia/Ocorrencia';
import Descarte from './pages/Descarte/Descarte';
import NotFound from './pages/NotFound/NotFound';

const App = () => {
  return (
    <Router>
      <div className='bg-catskillWhite'>
        <Routes>
          <Route path="/furto" element={<Prevencao />} />
          <Route path="/ocorrencia" element={<Ocorrencia />} />
          <Route path="/descarte" element={<Descarte />} />
          <Route path="/" element={<TelaInicial />} />
            
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
