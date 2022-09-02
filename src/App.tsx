import React from 'react';
import './App.css';
import MainLayout from './components/mainLayout/MainLayout';

interface Props {
  value: any;
}

function App({ value }: Props) {
  return (
    <div className='App'>
      <MainLayout value={value} />
    </div>
  );
}

export default App;
