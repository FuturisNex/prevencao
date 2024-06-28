import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './User/LoginPage';
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
import Doações from './pages/Opcoes/Doação';
import Cookies from 'js-cookie';

const App = () => {
  const [newVersionAvailable, setNewVersionAvailable] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = () => {
      const isAuthenticated = Cookies.get('authenticated');
      setAuthenticated(isAuthenticated === 'true'); // Converte para booleano
    };

    checkAuthentication();
  }, []);

  const handleLogin = () => {
    setAuthenticated(true);
  };

  const handleLogout = () => {
    Cookies.remove('authenticated', { path: '/' }); // Remove o cookie
    setAuthenticated(false);
  };

  return (
    <Router>
      <div className="bg-catskillWhite">
        {newVersionAvailable && (
          <div>
            Uma nova versão do aplicativo está disponível. Por favor, atualize a página.
          </div>
        )}
        <Routes>
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/furto" element={<FurtoMenu />} />
          <Route path="/furto-quebra" element={<PrevencaoQ />} />
          <Route path="/furto-inibição" element={<PrevencaoI />} />
          <Route path="/degustação" element={<DegustacaoMenu />} />
          <Route path="/degustação-quebra" element={<DegustaçãoQ />} />
          <Route path="/descarte-visual" element={<LossVisualization />} />
          <Route path="/descarte-form" element={<LossForm />} />
          <Route path="/degustação-inibição" element={<DegustaçãoI />} />
          <Route path="/descarte" element={<Descarte />} />
          <Route path="/doacao" element={<Doações />} />
          <Route path="/equipamentos" element={<Equipamentos />} />
          <Route path="/" element={authenticated ? <TelaInicial /> : <Navigate to="/login" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
