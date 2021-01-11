import React, {Component} from 'react';
import { store } from '../../../context/tools';

import './styles.css';

class MultiTool extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            toolSubMenuOpen : false
        };
    }
  
    handleToggleSubMenu = (e) => {
        e.stopPropagation();
        const {
            toolSubMenuOpen
        } = this.state;

        if(toolSubMenuOpen) {

            this.setState({
                toolSubMenuOpen : false
            });
            this.context.dispatch(
                {
                    type : "activateSubMenu", 
                    data : {
                        subMenu : null
                    }
                }
            );

        } else {

            this.setState({
                toolSubMenuOpen : true
            });

            this.context.dispatch(
                {
                    type : "activateSubMenu", 
                    data : {
                        subMenu : this.props.type,
                        defaultTool : this.props.defaultTool
                    }
                }
            );
        }
        
        
    }
  
    render() {

        let submenuCSS = "toolbar_submenu";
        if(this.state.toolSubMenuOpen && this.props.subMenuItems) {
          submenuCSS += " toolbar_isVisible";
        }

        const itemColumnLimit = 5;
        const subMenuItemColumns = [[]];
        let counter = 0,
            columnCounter = 0;
        this.props.subMenuItems.forEach((item) => {
            if(counter < itemColumnLimit) {
                subMenuItemColumns[columnCounter].push(item);
                counter++;
            } else {
                counter = 0;
                columnCounter++;
                subMenuItemColumns[columnCounter] = [];
                subMenuItemColumns[columnCounter].push(item);
                counter++;
            }
        });

        let toolbarIcon = `toolbar_${this.props.type}`;

        if(this.context.state.previousSelectedTools[this.props.type]) {
            toolbarIcon = `toolbar_${this.context.state.previousSelectedTools[this.props.type]}`;
        }

        return (
            <div 
                className={`toolbar_tool ${toolbarIcon}`}
                onClick={this.handleToggleSubMenu}
            >
                <div className={submenuCSS}>
                    <div className={"leftArrow"} />
                    <div className={"toolbar_submenu_scrollContainer"}>
                    {
                        subMenuItemColumns.map((column, i) => (
                            <div className="toolbar_subMenu_column" key={`subMenu_column_${i}`}>
                                {column.map(item => item)}
                            </div>
                        ))
                    }
                    </div>
                </div>
            </div>
        );
    }

    componentDidUpdate() {
        const shouldAutoCloseMenu = this.context.state.currentOpenSubMenu !== this.props.type;
        if(shouldAutoCloseMenu && this.state.toolSubMenuOpen) {
            this.setState({toolSubMenuOpen : false});
        }
    }
    
  }

  MultiTool.contextType = store;

  export default MultiTool;