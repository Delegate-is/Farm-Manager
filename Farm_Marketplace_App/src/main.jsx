import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { AuthProvider } from './auth/AuthContext.jsx'; // CORRECTED PATH

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider> {/* Now we can uncomment this */}
      <App />
    </AuthProvider>
  </React.StrictMode>,
);