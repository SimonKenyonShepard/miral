import React, {Component} from 'react';
import {ThemeContext} from '../../../../../theme-context';

import './styles.css';


class PredefinedColorPicker extends Component {

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
                ></div>
                <div className={submenuCSS}>
                    {
                      theme.preDefinedColors.map(color => {
                        return <div className={"availableColor"} style={{backgroundColor: color}} />
                      })
                    }
                </div>
            </div>
        );
    }

    
  }

  PredefinedColorPicker.contextType = ThemeContext;

  export default PredefinedColorPicker;