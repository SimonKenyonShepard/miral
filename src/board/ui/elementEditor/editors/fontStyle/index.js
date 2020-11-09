import React, {Component} from 'react';

import './styles.css';

const iconColor = "#333";

const SUBMENU_NAME = "FontStyle";

const FONT_FAMILIES = [
  "Arial",
  "Arial Black",
  "Arial Narrow",
  "Arial Rounded MT Bold",
  "Baskerville",
  "Courier New",
  "Georgia",
  "Lucida Bright",
  "Lucida Sans Typewriter",
  "Palatino",
  "Tahoma",
  "Times New Roman",
  "Trebuchet MS",
  "Verdana"
];

class FontStyle extends Component {

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

    handleFontChange = (e) => {
      let {fontFamily} = this.props.fontStyle;
      if(fontFamily !== e.target.value) {
        this.props.handleUpdateElementProperty({
          property : "fontStyle",
          value : {...this.props.fontStyle, fontFamily : e.target.value}
        });
      }
    }

    handleSizeChange = (e) => {
      this.props.handleUpdateElementProperty({
        property : "fontStyle",
        value : {...this.props.fontStyle, fontSize : (e.target.value*this.props.initialZoomLevel)} 
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
                title={"Change font styles"}
              >
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                  <path fill={iconColor} d="M9 4v3h5v12h3V7h5V4H9zm-6 8h3v7h3v-7h3V9H3v3z"/>
                </svg>
              </div>
              <div 
                  className={submenuCSS}
                >
                    <div className={"arrow"} />
                    <div className="fontFamily">
                        <select 
                          value={this.props.fontStyle.fontFamily}
                          onChange={this.handleFontChange}
                        >
                          {FONT_FAMILIES.map(font => <option key={`fontSelector_${font}`}>{font}</option>)}
                        </select>
                    </div>
                    <div className="picker">
                      <div  className="picker_label" >size:</div>
                      <input 
                        type="number"
                        id="fontSize" 
                        name="fontSize" 
                        step="2"
                        max="104"
                        min="0"
                        onChange={this.handleSizeChange}
                        value={Math.round(this.props.fontStyle.fontSize/this.props.initialZoomLevel)}
                      />
                    </div>
                </div>
            </div>
        );
    }

    
  }

  export default FontStyle;