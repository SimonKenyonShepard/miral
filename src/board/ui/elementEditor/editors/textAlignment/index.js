import React, {Component} from 'react';

import './styles.css';


class TextAlignment extends Component {

    constructor(props, context) {
      super(props, context);
      this.state = {
        subMenuOpen : false
      };
    }

    handleOpenSubMenu = () => {
      this.setState({subMenuOpen : !this.state.subMenuOpen});
    }

    render() {
        
        return (
            <div className={"editor_option"}>
              <div 
                className={"editor_icon"} 
                onClick={this.handleOpenSubMenu}
                title={"Change text alignment"}
              >
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                  <path d="M7 15v2h10v-2H7zm-4 6h18v-2H3v2zm0-8h18v-2H3v2zm4-6v2h10V7H7zM3 3v2h18V3H3z"/>
                </svg>
              </div>
            </div>
        );
    }

    
  }

  export default TextAlignment;