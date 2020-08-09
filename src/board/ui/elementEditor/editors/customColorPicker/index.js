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

class TransparentColorOption extends Component {

  handleSelectColor = () => {
   this.props.handleOpacityChange({target : { value : 0 }});
  }

  render() {
      return <div 
              className={"availableColor"} 
              style={{backgroundColor: "#fff", border: "1px solid #999"}}
              onClick={this.handleSelectColor}  
            >
            <div className="transparentLine" />
            </div>
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
      let newFillOpacity = this.props.currentStyles.fillOpacity;
      if (newFillOpacity === 0) {
        newFillOpacity = 1;
      }
      this.props.handleUpdateElementProperty({
        property : "styles",
        value : {...this.props.currentStyles, "fill" : color, fillOpacity : newFillOpacity} 
      });
    }

    handleOpacityChange = (e) => {
      this.props.handleUpdateElementProperty({
        property : "styles",
        value : {...this.props.currentStyles, fillOpacity : e.target.value} 
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
          backgroundColor : this.props.currentStyles.fill 
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
                >
                    <div className={"arrow"} />
                    <TransparentColorOption 
                      key={('customColorOption_transparent')}
                      handleOpacityChange={this.handleOpacityChange}
                    />
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
                    <div
                     className="opacityPicker"
                    >
                      <div  className="opacityLabel" >Opacity:</div>
                      <input 
                        type="number" 
                        id="opacity" 
                        name="opacity" 
                        min="0" 
                        max="1"
                        step="0.1"
                        onChange={this.handleOpacityChange}
                        value={(this.props.currentStyles.fillOpacity || 0)}
                      />
                    </div>
                </div>
            </div>
        );
    }

    
  }

  CustomColorPicker.contextType = ThemeContext;

  export default CustomColorPicker;