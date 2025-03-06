import React from 'react';
import ReactDOM from 'react-dom/client'; // Importação atualizada
import App from './App';

// Cria a raiz para renderização
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);