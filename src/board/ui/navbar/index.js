import React, {Component} from 'react';

import './styles.css';

class FileOption extends Component {

    handleClick = (e) => {
        this.props.loadFile(this.props.fileName);
    }

    render() {
        return(<div
            className={"navBar_menu_item"}
            onClick={this.handleClick}
        >
            {this.props.fileName}
        </div>);
    }
}


class Navbar extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
          menuVisible : false,
          subMenu : []
        };
      }
    
    handleOpenMenu = (e) => {
        e.stopPropagation();
        this.setState({
            menuVisible : !this.state.menuVisible
        });
    }
    
    saveToBrowser = (e) => {
        const { applicationState } = this.props;
        let fileName = `miralFile_${applicationState.boardName}`;
        const checkIfAlreadyExists = window.localStorage.getItem(fileName);
        if(checkIfAlreadyExists) {
            fileName = fileName+"_"+new Date().getHours()+new Date().getMinutes();
        }
        window.localStorage.setItem(fileName, JSON.stringify(applicationState));
    }

    loadFile = (fileName) => {
        const file = window.localStorage.getItem(`miralFile_${fileName}`);
        const state = JSON.parse(file);
        this.props.handleUpdateElementsAndState(state);
    }

    getSavedFromBrowser = (e) => {
        const files = [];
        Object.keys(window.localStorage).forEach(item => {
            if(item.indexOf("miralFile_") !== -1) {
                const fileName = item.replace("miralFile_", "");
                files.push(
                    <FileOption 
                        key={`fileOption_${fileName}`} 
                        fileName={fileName}
                        loadFile={this.loadFile} 
                    />
                );
            }
        });
        this.setState({
            subMenu : files
        });
    }
  
    render() {
        const { 
            menuVisible,
            subMenu
        } = this.state;
        let menuCSS = "navBar_menu",
            letFirstMenuHidden = "";
        if( menuVisible ) {
            menuCSS += " navBar_menu_open";
        }
        if(subMenu.length > 0) {
            letFirstMenuHidden = "slideLeft";
        }
        return (
            <div className={"navBar"}>
                <span className={"companyName"}>Your company name</span>
                <span className={"burgerMenu"} onClick={this.handleOpenMenu}></span>
                <div className={menuCSS}>
                    <div className={"navBar_menu_arrow"} />
                    <div className={`navBar_menu_slider ${letFirstMenuHidden}`} >
                        <div className={`navBar_menu_items`} >
                            <div 
                                className={"navBar_menu_item"}
                                onClick={this.saveToBrowser}
                            >Save to Browser</div>
                            <div 
                                className={"navBar_menu_item"}
                                onClick={this.getSavedFromBrowser}
                            >Load from Browser</div>
                        </div>
                        <div className={"navBar_menu_items"} >
                            {subMenu.map(item => {
                                return item;
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
  }

  export default Navbar;