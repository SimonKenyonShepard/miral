import React, {Component} from 'react';

import './styles.css';

const iconColor = "#333";

const SUBMENU_NAME = "URL";

class URL extends Component {

    constructor(props, context) {
      super(props, context);
      this.state = {
        subMenuOpen : false
      };
    }

    handleOpenSubMenu = () => {
      this.setState({subMenuOpen : !this.state.subMenuOpen});
      this.props.handleSetCurrentOpenSubMenu(SUBMENU_NAME);
    }

    componentDidUpdate() {
      if(this.state.subMenuOpen && this.props.currentOpenSubMenu !== SUBMENU_NAME) {
        this.setState({subMenuOpen : false});
      }
    }

    handleURLChange = (e) => {
      
      this.props.handleUpdateElementProperty({
        property : "imgURL",
        value : e.target.value
      });
    }

    render() {
        
        let submenuCSS = "predefinedColorPicker_submenu";
        if(this.state.subMenuOpen) {
          submenuCSS += " isVisible";
        }

        return (
            <div className={"fontStyle"}>
              <div 
                className={"editor_icon"} 
                onClick={this.handleOpenSubMenu}
                title={"Change image URL"}
              >
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                  <path fill={iconColor} d="M4.5 11h-2V9H1v6h1.5v-2.5h2V15H6V9H4.5v2zm2.5-.5h1.5V15H10v-4.5h1.5V9H7v1.5zm5.5 0H14V15h1.5v-4.5H17V9h-4.5v1.5zM23 9h-5v6h1.5v-2H23V9zm-1.5 2.5h-2v-1h2v1z"/>
                </svg>
              </div>
              <div 
                  className={submenuCSS}
                >   
                    <div className={"arrow"} />
                    <div className="urlLocation">
                      <div  className="urlLocation_label" >URL:</div>
                      <input  
                        name="imgURL" 
                        onChange={this.handleURLChange}
                        value={this.props.imgURL}
                      />
                    </div>
                </div>
            </div>
        );
    }

    
  }

  export default URL;