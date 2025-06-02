import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './stores'; // Store của Redux
import { ThemeProvider } from '@/themes/ThemeContext.jsx'; // Import ThemeProvider của bạn
import { BrowserRouter } from 'react-router-dom'; // Nếu bạn đang dùng react-router-dom

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}> {/* Nếu bạn đang dùng Redux */}
        <BrowserRouter> 
          <App />
        </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);