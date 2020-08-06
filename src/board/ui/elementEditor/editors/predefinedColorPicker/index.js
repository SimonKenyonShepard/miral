import React, {Component} from 'react';
import {ThemeContext} from '../../../../../theme-context';

import './styles.css';

class PredefinedColorOption extends Component {

  handleSelectColor = () => {
    this.props.handleUpdateElementProperty({
      property : "predefinedColor",
      value : this.props.colorID
    })
  }

  render() {
      return <div 
              className={"availableColor"} 
              style={{backgroundColor: this.props.color}}
              onClick={this.handleSelectColor}  
            />
  }

}

const SUBMENU_NAME = "PredefinedColorPicker";

class PredefinedColorPicker extends Component {

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

    render() {
        const theme = this.context;
        const selectedColor = {
          backgroundColor : theme.preDefinedColors[this.props.fillColor] 
        };
        let submenuCSS = "predefinedColorPicker_submenu";
        if(this.state.subMenuOpen) {
          submenuCSS += " isVisible";
        }
        
        return (
            <div className={"predefinedColorPicker"}>
                <div 
                  className={"selectedColor"}
                  style={selectedColor}
                  onClick={this.handleOpenSubMenu}
                  title={"Change color"}
                ></div>
                <div 
                  className={submenuCSS}
                  onClick={this.handleOpenSubMenu}
                >
                    <div className={"arrow"} />
                    {
                      theme.preDefinedColors.map((color, i) => {
                        return <PredefinedColorOption 
                                key={('preDefinedColorOption_'+color)}
                                color={color} 
                                colorID={i}
                                handleUpdateElementProperty={this.props.handleUpdateElementProperty}
                              />
                      })
                    }
                </div>
            </div>
        );
    }

    
  }

  PredefinedColorPicker.contextType = ThemeContext;

  export default PredefinedColorPicker;