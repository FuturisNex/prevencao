import React from 'react';
import { BrowserRouter as Router, Routes, Route, Form } from 'react-router-dom';
import Prevencao from './pages/prevencao';


const App = () => {
  return (
    <Router>
      <div className='bg-catskillWhite'>
        <Routes>
          <Route path="/" element={<Prevencao />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;