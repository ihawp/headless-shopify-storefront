import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css'
import AppRouter from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>,
)