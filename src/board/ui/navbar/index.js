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
            menuVisible : !this.state.menuVisible,
            subMenu : []
        });
    }
    
    saveToBrowser = (e) => {
        const { applicationState } = this.props;
        const stateToSave = {
            elements : applicationState.elements,
            elementState : applicationState.elementState,
            boardName : applicationState.boardName,
            zoomLevel : applicationState.zoomLevel,
            offsetX : applicationCache.offsetX,
            offsetY : applicationState.offsetY
        };
        let fileName = `miralFile_${applicationState.boardName}`;
        const checkIfAlreadyExists = window.localStorage.getItem(fileName);
        if(checkIfAlreadyExists) {
            fileName = fileName+"_"+new Date().getHours()+new Date().getMinutes();
        }
        window.localStorage.setItem(fileName, JSON.stringify(stateToSave));
    }

    loadFile = (fileName) => {
        const file = window.localStorage.getItem(`miralFile_${fileName}`);
        const state = Object.assign({}, this.props.applicationState, JSON.parse(file));
        this.props.handleUpdateElementsAndState(state);
        this.setState({
            menuVisible : false,
            subMenu : []
        });
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
                    <div className={`navBar_menu_sliderWrapper`} >
                        <div className={`navBar_menu_slider ${letFirstMenuHidden}`} >
                            <div className={`navBar_menu_items`} >
                                <div 
                                    className={"navBar_menu_item"}
                                    onClick={this.saveToBrowser}
                                >   
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                                        <path d="M0 0h24v24H0V0z" fill="none"/>
                                        <path d="M19 12v7H5v-7H3v9h18v-9h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2v9.67z"/>
                                    </svg>
                                    <span>Save to Browser</span>
                                </div>
                                <div 
                                    className={"navBar_menu_item"}
                                    onClick={this.getSavedFromBrowser}
                                >
                                    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="m19,12l0,7l-14,0l0,-7l-2,0l0,9l18,0l0,-9l-2,0z" fill="black" id="svg_2"/>
                                        <path d="m12.75,11.67l2.59,-2.58l1.41,1.41l-5,5l-5,-5l1.41,-1.41l2.59,2.58l0,-9.67l2,0c0,3.223333 0,6.446667 0,9.67z" fill="black" id="svg_3" transform="rotate(180 11.75 8.75)"/>
                                    </svg>
                                    <span>Load from Browser</span>
                                </div>
                            </div>
                            <div className={"navBar_menu_items"} >
                                {subMenu.map(item => {
                                    return item;
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
  }

  export default Navbar;