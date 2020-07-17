import React, {Component} from 'react';

import './styles.css';


class ElementEditorMenu extends Component {

    constructor(props, context) {
      super(props, context);
      this.state = {
        
      };
    }

    render() {
        
      return (
          <div className={"editor_option"}>
            <div 
              className={"editor_icon"}
              title={"More options"}
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                <path d="M0 0h24v24H0V0z" fill="none"/>
                <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
              </svg>
            </div>
          </div>
      );
  }

    
  }

  export default ElementEditorMenu;