import React from 'react';
import ReactDOM from 'react-dom/client';
import { DarkModeContextProvider } from './agentProfile/context/darkModeContext';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
// import { RegisterContextProvider } from './context/RegisterContext';
import { SearchContextProvider } from './context/SearchContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <SearchContextProvider>
      <DarkModeContextProvider>
        <App />
      </DarkModeContextProvider>
      </SearchContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
