import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Form } from 'react-router-dom';
import TelaInicial from './pages/Inicio/TelaInicial';
import NotFound from './pages/NotFound/NotFound';
import Prevencao from './pages/Opcoes/Prevencao';
import Ocorrencia from './pages/Opcoes/Ocorrencia';
import Descarte from './pages/Opcoes/Descarte';
import Equipamentos from './pages/Opcoes/Equipamentos';

const App = () => {
  const [newVersionAvailable, setNewVersionAvailable] = useState(false);

  useEffect(() => {
    const checkForNewVersion = async () => {
      try {
        const response = await fetch('/api/check-for-update');
        const data = await response.json();
        if (data.newVersionAvailable) {
          setNewVersionAvailable(true);
        }
      } catch (error) {
        console.error('Erro ao verificar nova versão:', error);
      }
    };

    const interval = setInterval(checkForNewVersion, 86400000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Router>
      <div className="bg-catskillWhite">
        {newVersionAvailable && (
          <div>
            Uma nova versão do aplicativo está disponível. Por favor, atualize a página.
          </div>
        )}
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
