import React, {Component} from 'react';

import './styles.css';


class ElementLocker extends Component {

    constructor(props, context) {
      super(props, context);
      this.state = {
        isLocked : false
      };
    }

    handleToggleLock = () => {
      this.setState({isLocked : !this.state.isLocked});
    }

    render() {
        
      const {isLocked} = this.state;

      return (
        <div className={"editor_option"}>
          <div 
            className={"editor_icon"} 
            onClick={this.handleToggleLock}
            title={"Lock this element from changes"}
          >
            {isLocked ?
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                <g fill="none">
                  <path d="M0 0h24v24H0V0z"/>
                  <path d="M0 0h24v24H0V0z" opacity=".87"/>
                </g>
                <path d="M20 8h-3V6.21c0-2.61-1.91-4.94-4.51-5.19C9.51.74 7 3.08 7 6v2H4v14h16V8zm-8 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM9 8V6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9z"/>
              </svg>
              :
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                <path d="M0 0h24v24H0V0z" fill="none"/>
                <path d="M20 8h-3V6.21c0-2.61-1.91-4.94-4.51-5.19C9.51.74 7 3.08 7 6h2c0-1.13.6-2.24 1.64-2.7C12.85 2.31 15 3.9 15 6v2H4v14h16V8zm-2 12H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/>
              </svg>
            }
          </div>
        </div>
      );
  }

    
  }

  export default ElementLocker;