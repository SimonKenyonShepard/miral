import React, {Component} from 'react';

import './styles.css';

const iconColor = "#333";

const SUBMENU_NAME = "BorderStyle";

class BorderStyle extends Component {

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

    handleSolidChange = () => {
      const strokeDasharray = "0";
      
      this.props.handleUpdateElementProperty({
        update : {
          styles : {
            strokeDasharray
          }
        }
      });
    }

    handleDashedChange = () => {
      const strokeDasharray = (4*this.props.initialZoomLevel)+" "+(2*this.props.initialZoomLevel);
      
      this.props.handleUpdateElementProperty({
        update : {
          styles : {
            strokeDasharray
          }
        }
      });
    }

    handleDottedChange = () => {
      const strokeDasharray = String(2*this.props.initialZoomLevel);
      
      this.props.handleUpdateElementProperty({
        update : {
          styles : {
            strokeDasharray
          }
        }
      });
    }


    handleWidthChange = (e) => {
      this.props.handleUpdateElementProperty({
        update : {
          styles : {
            strokeWidth : (e.target.value*this.props.initialZoomLevel)
          }
        }
      });
    }

    render() {
        
        let submenuCSS = "predefinedColorPicker_submenu";
        if(this.state.subMenuOpen) {
          submenuCSS += " isVisible";
        }

        let solidSelected = (this.props.currentStyles.strokeDasharray === "0") ? "selected" : null,
            dashedSelected = (this.props.currentStyles.strokeDasharray === (4*this.props.initialZoomLevel)+" "+(2*this.props.initialZoomLevel)) ? "selected" : null,
            dottedSelected = (this.props.currentStyles.strokeDasharray === String(2*this.props.initialZoomLevel)) ? "selected" : null;

        const computedStrokeWidth = Math.ceil(this.props.currentStyles.strokeWidth/this.props.initialZoomLevel);

        return (
            <div className={"fontStyle"}>
              <div 
                className={"editor_icon"} 
                onClick={this.handleOpenSubMenu}
                title={"Change border styles"}
              >
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                  <path d="M0 0h24v24H0z" fill="none"/>
                  <path fill={iconColor} d="M3 16h5v-2H3v2zm6.5 0h5v-2h-5v2zm6.5 0h5v-2h-5v2zM3 20h2v-2H3v2zm4 0h2v-2H7v2zm4 0h2v-2h-2v2zm4 0h2v-2h-2v2zm4 0h2v-2h-2v2zM3 12h8v-2H3v2zm10 0h8v-2h-8v2zM3 4v4h18V4H3z"/>
                </svg>
              </div>
              <div 
                  className={submenuCSS}
                >   
                    <div className={"arrow"} />
                    <div className={`editor_subMenu_icon ${solidSelected}`} onClick={this.handleSolidChange}>
                      <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg" >
                        <path fill={iconColor} d="m3,10l0,4l18,0l0,-4l-18,0z"/>
                      </svg>
                    </div>
                    <div className={`editor_subMenu_icon ${dashedSelected}`} onClick={this.handleDashedChange}>
                      <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                        <path fill={iconColor} d="m3,13l5,0l0,-2l-5,0l0,2zm6.5,0l5,0l0,-2l-5,0l0,2zm6.5,0l5,0l0,-2l-5,0l0,2z" />
                      </svg>
                    </div>
                    <div className={`editor_subMenu_icon ${dottedSelected}`} onClick={this.handleDottedChange}>
                      <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg" >
                        <path fill={iconColor} d="m3,13l2,0l0,-2l-2,0l0,2zm4,0l2,0l0,-2l-2,0l0,2zm4,0l2,0l0,-2l-2,0l0,2zm4,0l2,0l0,-2l-2,0l0,2zm4,0l2,0l0,-2l-2,0l0,2z"/>
                      </svg>
                    </div>
                    <div className="opacityPicker">
                      <div  className="opacityLabel" >Width:</div>
                      <input 
                        type="number"
                        id="opacity" 
                        name="opacity" 
                        min="1" 
                        max="10"
                        step="1"
                        onChange={this.handleWidthChange}
                        value={computedStrokeWidth}
                      />
                    </div>
                </div>
            </div>
        );
    }

    
  }

  export default BorderStyle;