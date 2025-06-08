import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';
import './HomePageFuncionario.css';

export default function HomePageFuncionario() {
  return (
    <div className="funcionario-container">
      <Sidebar />
      <main className="content-area">
        <Outlet />
      </main>
    </div>
  );
}