// src/App.tsx
import React from 'react';
import './App.css';
import {Agendamento} from './components/Agendamento'; // Certifique-se de que o caminho está correto


const App: React.FC = () => {
  // Definindo a data atual com o tipo `string`
  const dataAtual: string = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long', // Exibe o dia da semana
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  return (
    <div className="App">
      <header className="App-header">
      <img src="/src/assets/titulo.png" alt="Logo Prefeitura" className='logo' />
      
      <div className='Titulo'>
        <h2>SECRETARIA MUNICIPAL DE PLANEJAMENTO E FAZENDA</h2>
        <h3> Sistema de Agendamento para Atendimento Presencial</h3>
        <p>{dataAtual}</p>
        </div>
        
      </header>
      
      {/* Componente de Agendamento */}
      <main>
        <Agendamento />
      </main>
    </div>
  );
};

export default App;
