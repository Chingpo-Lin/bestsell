import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Login from './pages/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
      <Route exact path="/" element={<App />}>
        </Route>
        <Route exact path="/Login" element={<Login />}>
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);
