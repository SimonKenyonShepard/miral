import React from 'react';
import './App.css';
import Board from './board/';

import {ThemeContext, themes} from './theme-context';
import { ToolsProvider } from './board/context/tools.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: document.body.clientWidth,
      height : document.body.clientHeight
    };
  }

  handleWindowResize = () => {
    this.setState({
      width: document.body.clientWidth,
      height : document.body.clientHeight
    });
  }

  render() {
    const { height, width } = this.state;

    return (
      <ThemeContext.Provider value={themes.light}>
        <ToolsProvider>
          <div className="App">
              <Board width={width} height={height} />
          </div>
        </ToolsProvider>
      </ThemeContext.Provider>
    );
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleWindowResize);
  }

}

export default App;
