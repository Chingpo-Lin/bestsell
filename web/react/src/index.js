import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Login from './Login/Login';
import Registration from './Login/Registration';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Orders from './components/Orders';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route exact path="/" element={<App />}/>
        <Route exact path="/Login" element={<Login />}/>
        <Route exact path="/Registration" element={<Registration />}/>
        <Route exact path='/Orders' element={<Orders />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
