// src/App.tsx
import React from 'react';
import './App.css';
import {Agendamento} from './components/Agendamento'; // Certifique-se de que o caminho está correto

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Agenda da Prefeitura</h1>
      </header>
      
      {/* Componente de Agendamento */}
      <main>
        <Agendamento />
      </main>
    </div>
  );
};

export default App;
