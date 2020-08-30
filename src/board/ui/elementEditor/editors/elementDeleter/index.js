import React, {Component} from 'react';

import './styles.css';

const iconColor = "#333";

class ElementDeleter extends Component {

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
              title={"Delete this element"}
              onClick={this.props.handleDeleteElements}
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                <path d="M0 0h24v24H0V0z" fill="none"/>
                <path fill={iconColor} d="M6 21h12V7H6v14zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
              </svg>
            </div>
          </div>
      );
  }

    
  }

  export default ElementDeleter;