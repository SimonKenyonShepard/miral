import React, {Component} from 'react';

import './styles.css';

class MultiTool extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            toolSubMenuOpen : false
        };
    }
  
    handleOpenSubMenu = () => {
        this.setState({subMenuOpen : !this.state.subMenuOpen});
        //this.props.handleSetCurrentOpenSubMenu(this.props.type);
    }
  
    render() {

        let submenuCSS = "toolbar_submenu";
        if(this.state.subMenuOpen && this.props.subMenuItems) {
          submenuCSS += " toolbar_isVisible";
        }

        return (
            <div 
                className={`toolbar_tool toolbar_${this.props.type}`}
                onClick={this.handleOpenSubMenu}
            >
                <div className={submenuCSS}>
                    <div className={"leftArrow"} />
                    {this.props.subMenuItems}
                </div>
            </div>
        );
    }

    onComponentDidUpdate() {
        if(this.props.isDefault) {
            this.handleToolSelect();
        }
    }
    
  }

  export default MultiTool;