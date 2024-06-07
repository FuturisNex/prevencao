import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Form } from 'react-router-dom';
import TelaInicial from './pages/Inicio/TelaInicial';
import NotFound from './pages/NotFound/NotFound';
import LossForm from './pages/Opcoes/LossForm';
import Equipamentos from './pages/Opcoes/Equipamentos';
import FurtoMenu from './pages/Inicio/FurtoMenu';
import DegustacaoMenu from './pages/Inicio/DegustacaoMenu';
import PrevencaoQ from './pages/Opcoes/PreveçãoQ';
import PrevencaoI from './pages/Opcoes/PrevencaoI';
import DegustaçãoQ from './pages/Opcoes/DegustaçãoQ';
import DegustaçãoI from './pages/Opcoes/DegustaçãoI';
import LossVisualization from './pages/Opcoes/DescarteGrafico';
import Descarte from './pages/Inicio/DescarteMenu';

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
          <Route path="/furto" element={<FurtoMenu />} />
          <Route path="/furto-quebra" element={<PrevencaoQ />} />
          <Route path="/furto-inibição" element={<PrevencaoI />} />
          <Route path="/degustação" element={<DegustacaoMenu />} />
          <Route path="/degustação-quebra" element={<DegustaçãoQ />} />
          <Route path="/descarte-visual" element={<LossVisualization />} />
          <Route path="/descarte-form" element={<LossForm />} />
          <Route path="/degustação-inibição" element={<DegustaçãoI />} />
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
