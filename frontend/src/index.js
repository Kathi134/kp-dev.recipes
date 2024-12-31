import React from 'react';
import ReactDOM from 'react-dom/client';
import './app/global/index.css';
import App from './App';
import { UserProvider } from './context/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
// localStorage.clear()

root.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>
);
