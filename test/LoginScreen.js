// src/LoginScreen.js
import React, { useState, useContext } from 'react';
import { DataContext } from './Context/DataContext';
import { useNavigate } from 'react-router-dom';
import './Styles/LoginScreen.css';
import logo from './assets/Logo.PNG'; // Add your logo image here

function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error } = useContext(DataContext); // Access login function and error from context
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = (event) => {
    event.preventDefault();
    login(email, password, navigate); // Pass navigate as an argument
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <div className="logo-form">
            <img src={logo} alt="Logo" className="login-logo" />
        </div>
        <form onSubmit={handleSubmit}>
          <label className='label'>
            E-mail:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className='label'>
            Senha:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {error && <p className="error-message">{error}</p>}
          <button className="button" type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
}

export default LoginScreen;
