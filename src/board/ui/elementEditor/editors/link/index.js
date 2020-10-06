import React, {Component} from 'react';

import './styles.css';

const iconColor = "#333";

const SUBMENU_NAME = "LINK";

class Link extends Component {

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

  handleLinkChange = (e) => {
    
    this.props.handleUpdateElementProperty({
      property : "link",
      value : e.target.value
    });
  }

  render() {

      let submenuCSS = "predefinedColorPicker_submenu";
      if(this.state.subMenuOpen) {
        submenuCSS += " isVisible";
      }
      
      return (
          <div className={"editor_option"}>
            <div 
              className={"editor_icon"} 
              onClick={this.handleOpenSubMenu}
              title={"Add link to this element"}
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                <path fill={iconColor} d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>
              </svg>
            </div>
            <div 
                  className={submenuCSS}
                >   
                    <div className={"arrow"} />
                    <div className="urlLocation">
                      <div  className="urlLocation_label" >link:</div>
                      <input  
                        name="link" 
                        onChange={this.handleLinkChange}
                        value={this.props.link}
                        list={"frameNames"}
                      />
                      <datalist id="frameNames">
                        {this.props.slides.map((slideName) =>  <option value={slideName} />)}
                      </datalist>
                    </div>
                </div>
          </div>
      );
  }

    
  }

  export default Link;