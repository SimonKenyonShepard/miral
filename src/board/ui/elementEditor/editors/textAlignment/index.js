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

function AlignTopIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
      <path fill={props.iconColor} d="M8 11h3v10h2V11h3l-4-4-4 4zM4 3v2h16V3H4z"/>
    </svg>
  );
}

function AlignCenterIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
      <path fill={props.iconColor} d="M8 19h3v4h2v-4h3l-4-4-4 4zm8-14h-3V1h-2v4H8l4 4 4-4zM4 11v2h16v-2H4z"/>
    </svg>
  );
}

function AlignBottomIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
      <path fill={props.iconColor} d="M16 13h-3V3h-2v10H8l4 4 4-4zM4 19v2h16v-2H4z"/>
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
        update : {
          fontStyle : {
            "textAlign" : "left"
          }
        }
      });
    }

    componentDidUpdate() {
      if(this.state.subMenuOpen && this.props.currentOpenSubMenu !== SUBMENU_NAME) {
        this.setState({subMenuOpen : false});
      }
    }

    handleRightChange = () => {
      this.props.handleUpdateElementProperty({
        update : {
          fontStyle : {
            "textAlign" : "right"
          }
        }
      });
    }

    handleCenterChange = () => {
      this.props.handleUpdateElementProperty({
        update : {
          fontStyle : {
            "textAlign" : "center"
          }
        }
      });
    }

    handleAlignTop = () => {
      this.props.handleUpdateElementProperty({
        update : {
          fontStyle : {
            "alignItems" : "top"
          }
        }
      });
    }

    handleAlignCenter = () => {
      this.props.handleUpdateElementProperty({
        update : {
          fontStyle : {
            "alignItems" : "center"
          }
        }
      });
    }

    handleAlignBottom = () => {
      this.props.handleUpdateElementProperty({
        update : {
          fontStyle : {
            "alignItems" : "bottom"
          }
        }
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
            topAlignSelected = (this.props.fontStyle.alignItems === "top") ? "selected" : null,
            centerAlignSelected = (this.props.fontStyle.alignItems === "center") ? "selected" : null,
            bottomAlignSelected = (this.props.fontStyle.alignItems === "bottom") ? "selected" : null;
        
        let currentIcon = <CenterIcon iconColor={iconColor} />;

        if(leftSelected) {
          currentIcon = <LeftIcon iconColor={iconColor} />;
        } else if (rightSelected) {
          currentIcon = <RightIcon iconColor={iconColor} />;
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
                    <div 
                      className={`editor_subMenu_icon ${leftSelected}`} 
                      onClick={this.handleLeftChange}
                      title={"Align text left"}
                    >
                      <LeftIcon iconColor={iconColor} />
                    </div>
                    <div 
                      className={`editor_subMenu_icon 
                      ${centerSelected}`} 
                      onClick={this.handleCenterChange}
                      title={"Align text center"}
                    >
                      <CenterIcon iconColor={iconColor} />
                    </div>
                    <div 
                      className={`editor_subMenu_icon ${rightSelected}`} 
                      onClick={this.handleRightChange}
                      title={"Align text right"}
                    >
                      <RightIcon iconColor={iconColor} />
                    </div>
                    <div 
                      className={`editor_subMenu_icon 
                      ${topAlignSelected}`} 
                      onClick={this.handleAlignTop}
                      title={"Align text to top"}
                    >
                      <AlignTopIcon iconColor={iconColor} />
                    </div>
                    <div 
                      className={`editor_subMenu_icon ${centerAlignSelected}`} 
                      onClick={this.handleAlignCenter}
                      title={"Align text to middle"}
                    >
                      <AlignCenterIcon iconColor={iconColor} />
                    </div>
                    <div 
                      className={`editor_subMenu_icon ${bottomAlignSelected}`} 
                      onClick={this.handleAlignBottom}
                      title={"Align text to bottom"}
                    >
                      <AlignBottomIcon iconColor={iconColor} />
                    </div>
                    
                </div>
            </div>
        );
    }

    
  }

  export default TextAlignment;