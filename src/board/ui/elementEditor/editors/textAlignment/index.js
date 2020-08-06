import React, {Component} from 'react';

import './styles.css';

const iconColor = "#333";

const SUBMENU_NAME = "TextAlignment";

function CenterIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
      <path fill={props.iconColor} d="M7 15v2h10v-2H7zm-4 6h18v-2H3v2zm0-8h18v-2H3v2zm4-6v2h10V7H7zM3 3v2h18V3H3z"/>
    </svg>
  );
}

function LeftIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
      <path fill={props.iconColor} d="M15 15H3v2h12v-2zm0-8H3v2h12V7zM3 13h18v-2H3v2zm0 8h18v-2H3v2zM3 3v2h18V3H3z"/>
    </svg>
  );
}

function RightIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
      <path fill={props.iconColor} d="M3 21h18v-2H3v2zm6-4h12v-2H9v2zm-6-4h18v-2H3v2zm6-4h12V7H9v2zM3 3v2h18V3H3z"/>
    </svg>
  );
}

function JustifyIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
      <path fill={props.iconColor} d="M3 21h18v-2H3v2zm0-4h18v-2H3v2zm0-4h18v-2H3v2zm0-4h18V7H3v2zm0-6v2h18V3H3z"/>
    </svg>
  );
}


class TextAlignment extends Component {

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

    handleLeftChange = () => {
      this.props.handleUpdateElementProperty({
        property : "fontStyle",
        value : {...this.props.fontStyle, "textAlign" : "left"}
      });
    }

    componentDidUpdate() {
      if(this.state.subMenuOpen && this.props.currentOpenSubMenu !== SUBMENU_NAME) {
        this.setState({subMenuOpen : false});
      }
    }

    handleRightChange = () => {
      this.props.handleUpdateElementProperty({
        property : "fontStyle",
        value : {...this.props.fontStyle, "textAlign" : "right"}
      });
    }

    handleCenterChange = () => {
      this.props.handleUpdateElementProperty({
        property : "fontStyle",
        value : {...this.props.fontStyle, "textAlign" : "center"}
      });
    }

    handleJustifyChange = () => {
      this.props.handleUpdateElementProperty({
        property : "fontStyle",
        value : {...this.props.fontStyle, "textAlign" : "justify"}
      });
    }

    render() {

        let submenuCSS = "predefinedColorPicker_submenu";
        if(this.state.subMenuOpen) {
          submenuCSS += " isVisible";
        }

        let leftSelected = (this.props.fontStyle.textAlign === "left") ? "selected" : null,
            centerSelected = (this.props.fontStyle.textAlign === "center") ? "selected" : null,
            rightSelected = (this.props.fontStyle.textAlign === "right") ? "selected" : null,
            justifySelected = (this.props.fontStyle.textAlign === "justify") ? "selected" : null;
        
        let currentIcon = <CenterIcon iconColor={iconColor} />;

        if(leftSelected) {
          currentIcon = <LeftIcon iconColor={iconColor} />;
        } else if (rightSelected) {
          currentIcon = <RightIcon iconColor={iconColor} />;
        } else if (justifySelected) {
          currentIcon = <JustifyIcon iconColor={iconColor} />;
        }
        
        return (
            <div className={"editor_option"}>
              <div 
                className={"editor_icon"} 
                onClick={this.handleOpenSubMenu}
                title={"Change text alignment"}
              >
                {currentIcon}
              </div>
              <div 
                  className={submenuCSS}
                  onClick={this.handleOpenSubMenu}
                >
                    <div className={"arrow"} />
                    <div className={`editor_subMenu_icon ${leftSelected}`} onClick={this.handleLeftChange}>
                      <LeftIcon iconColor={iconColor} />
                    </div>
                    <div className={`editor_subMenu_icon ${centerSelected}`} onClick={this.handleCenterChange}>
                      <CenterIcon iconColor={iconColor} />
                    </div>
                    <div className={`editor_subMenu_icon ${rightSelected}`} onClick={this.handleRightChange}>
                      <RightIcon iconColor={iconColor} />
                    </div>
                    <div className={`editor_subMenu_icon ${justifySelected}`} onClick={this.handleJustifyChange}>
                      <JustifyIcon iconColor={iconColor} />
                    </div>
                    
                </div>
            </div>
        );
    }

    
  }

  export default TextAlignment;