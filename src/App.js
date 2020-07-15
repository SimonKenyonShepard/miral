import React from 'react';
import './App.css';
import Board from './board/';

import {ThemeContext, themes} from './theme-context';

function App() {
  const width = window.innerWidth,
  height = window.innerHeight;

  return (
    <ThemeContext.Provider value={themes.light}>
      <div className="App">
          <Board width={width} height={height} />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
