import React, { useState, useEffect } from 'react';
import database from '../auth/firebase';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; // Verifique se o caminho do arquivo CSS está correto

const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    // Verifica se o usuário já está autenticado ao montar o componente
    const checkAuthentication = () => {
      const isAuthenticated = Cookies.get('authenticated');
      if (isAuthenticated === 'true') {
        navigate('/'); // Redireciona para a tela inicial se já estiver autenticado
      }
    };

    checkAuthentication();
  }, [navigate]); // Executa quando o componente é montado ou quando 'navigate' muda

  const handleLogin = async (event) => {
    event.preventDefault();
    setError(null);
    
    try {
      const snapshot = await database.ref('users').orderByChild('username').equalTo(username).once('value');
      const userData = snapshot.val();

      if (userData) {
        // Obter a chave do primeiro usuário encontrado
        const userKey = Object.keys(userData)[0];
        const user = userData[userKey];

        if (user.password === password) {
          // Login bem-sucedido
          console.log('Login bem-sucedido para usuário:', username);
          Cookies.set('authenticated', 'true', { expires: 1, path: '/' }); // Salva o cookie por 1 dia
          onLogin(); // Chama a função passada para definir authenticated como true
          navigate('/'); // Redireciona para a tela inicial após o login
        } else {
          setError('Senha incorreta.');
        }
      } else {
        setError('Usuário não encontrado.');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setError('Erro ao fazer login. Tente novamente mais tarde.');
    }
  };

  return (
    <div className="login-container"> {/* Aplica o estilo do container */}
      <div className="login-form"> {/* Aplica o estilo do formulário */}
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <label>
            Nome de usuário:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Senha:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <br />
          <button type="submit">Entrar</button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
