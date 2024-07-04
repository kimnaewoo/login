import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Member } from './pages/Member';
import Login from './pages/Login';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="login" index element={<Login />} />
        <Route path="member" element={<Member />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
