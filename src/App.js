import React from 'react';
import './App.css';
import Board from './board/';

function App() {
  const width = window.innerWidth,
  height = window.innerHeight;

  return (
    <div className="App">
        <Board width={width} height={height} />
    </div>
  );
}

export default App;
