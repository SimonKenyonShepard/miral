import React, {Component} from 'react';

import './styles.css';

const iconColor = "#333";

const SUBMENU_NAME = "TextFormat";

class TextFormat extends Component {

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

    handleBoldChange = () => {
      let newFontWeight = "normal";
      if(this.props.fontStyle.fontWeight === "normal") {
        newFontWeight = "bold";
      }
      this.props.handleUpdateElementProperty({
        property : "fontStyle",
        value : {...this.props.fontStyle, "fontWeight" : newFontWeight}
      });
    }

    handleItalicChange = () => {
      let newFontStyle = "normal";
      if(this.props.fontStyle.fontStyle === "normal") {
        newFontStyle = "italic";
      }
      this.props.handleUpdateElementProperty({
        property : "fontStyle",
        value : {...this.props.fontStyle, "fontStyle" : newFontStyle}
      });
    }

    handleUnderlineChange = () => {
      let textDecorationLine = this.props.fontStyle.textDecorationLine;
      if(this.props.fontStyle.textDecorationLine.indexOf("underline") === -1) {
        textDecorationLine = "underline " + textDecorationLine;
      } else {
        textDecorationLine = textDecorationLine.replace("underline", "");
      }
      this.props.handleUpdateElementProperty({
        property : "fontStyle",
        value : {...this.props.fontStyle, textDecorationLine}
      });
    }

    handleStrikeThroughChange = () => {
      let textDecorationLine = this.props.fontStyle.textDecorationLine;
      if(this.props.fontStyle.textDecorationLine.indexOf("line-through") === -1) {
        textDecorationLine = textDecorationLine + " line-through";
      } else {
        textDecorationLine = textDecorationLine.replace("line-through", "");
      }
      this.props.handleUpdateElementProperty({
        property : "fontStyle",
        value : {...this.props.fontStyle, textDecorationLine}
      });
    }

    render() {
        
        let submenuCSS = "predefinedColorPicker_submenu";
        if(this.state.subMenuOpen) {
          submenuCSS += " isVisible";
        }

        let boldSelected = (this.props.fontStyle.fontWeight === "bold") ? "selected" : null,
            italicSelected = (this.props.fontStyle.fontStyle === "italic") ? "selected" : null,
            underlineSelected = (this.props.fontStyle.textDecorationLine.indexOf("underline") !== -1) ? "selected" : null,
            strikeThroughSelected = (this.props.fontStyle.textDecorationLine.indexOf("line-through") !== -1) ? "selected" : null;

        return (
            <div className={"fontStyle"}>
              <div 
                className={"editor_icon"} 
                onClick={this.handleOpenSubMenu}
                title={"Change text format"}
              >
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                  <path fill={iconColor} d="M5 17v2h14v-2H5zm4.5-4.2h5l.9 2.2h2.1L12.75 4h-1.5L6.5 15h2.1l.9-2.2zM12 5.98L13.87 11h-3.74L12 5.98z"/>
                </svg>
              </div>
              <div 
                  className={submenuCSS}
                >
                    <div className={"arrow"} />
                    <div className={`editor_subMenu_icon ${boldSelected}`} onClick={this.handleBoldChange}>
                      <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                        <path fill={iconColor} d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"/>
                      </svg>
                    </div>
                    <div className={`editor_subMenu_icon ${italicSelected}`} onClick={this.handleItalicChange}>
                      <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                        <path fill={iconColor} d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4h-8z"/>
                      </svg>
                    </div>
                    <div className={`editor_subMenu_icon ${underlineSelected}`} onClick={this.handleUnderlineChange}>
                      <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                        <path fill={iconColor} d="M12 17c3.31 0 6-2.69 6-6V3h-2.5v8c0 1.93-1.57 3.5-3.5 3.5S8.5 12.93 8.5 11V3H6v8c0 3.31 2.69 6 6 6zm-7 2v2h14v-2H5z"/>
                      </svg>
                    </div>
                    <div className={`editor_subMenu_icon ${strikeThroughSelected}`} onClick={this.handleStrikeThroughChange}>
                      <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                        <path fill={iconColor} d="M10 19h4v-3h-4v3zM5 4v3h5v3h4V7h5V4H5zM3 14h18v-2H3v2z"/>
                      </svg>
                    </div>
                </div>
            </div>
        );
    }

    
  }

  export default TextFormat;