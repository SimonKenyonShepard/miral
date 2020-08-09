import React, {Component} from 'react';
import {ThemeContext} from '../../../../../theme-context';

import './styles.css';

class CustomColorOption extends Component {

  handleSelectColor = () => {
   this.props.handleUpdateColor(this.props.color);
  }

  render() {
      return <div 
              className={"availableColor"} 
              style={{backgroundColor: this.props.color}}
              onClick={this.handleSelectColor}  
            />
  }

}

const SUBMENU_NAME = "CustomColorPicker";

class CustomColorPicker extends Component {

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

    handleUpdateColor = (color) => {
      this.props.handleUpdateElementProperty({
        property : "styles",
        value : {...this.props.currentStyles, "fill" : color, fillOpacity : "1"} 
      });
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
                        return <CustomColorOption 
                                key={('preDefinedColorOption_'+color)}
                                color={color} 
                                colorID={i}
                                handleUpdateColor={this.handleUpdateColor}
                              />
                      })
                    }
                </div>
            </div>
        );
    }

    
  }

  CustomColorPicker.contextType = ThemeContext;

  export default CustomColorPicker;