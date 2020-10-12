import React, {Component, PureComponent} from 'react';

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


class Navbar extends PureComponent {

    constructor(props, context) {
        super(props, context);
        this.state = {
          menuVisible : false,
          subMenu : [],
          mondaySaveAvailable : false,
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
        const applicationState = this.props.getState();
        const stateToSave = {
            userID : applicationState.userID,
            elements : applicationState.elements,
            elementState : applicationState.elementState,
            boardName : applicationState.boardName,
            zoomLevel : applicationState.zoomLevel,
            offsetX : applicationState.offsetX,
            offsetY : applicationState.offsetY
        };
        let fileName = `miralFile_${applicationState.boardName}`;
        const checkIfAlreadyExists = window.localStorage.getItem(fileName);
        if(checkIfAlreadyExists) {
            fileName = fileName+"_"+new Date().getHours()+new Date().getMinutes();
        }
        window.localStorage.setItem(fileName, JSON.stringify(stateToSave));
        this.setState({
            menuVisible : false,
            subMenu : []
        });
    }

    loadFileFromBrowser = (fileName) => {
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
                        loadFile={this.loadFileFromBrowser} 
                    />
                );
            }
        });
        if(files.length === 0) {
            files.push(<div className="navMenu_error">
                No saved files found on this browser.
            </div>);
        }
        this.setState({
            subMenu : files
        });
    }

    saveToMonday = (e) => {
        const monday = window.mondaySdk();
        const { applicationState } = this.props;
        const stateToSave = {
            userID : applicationState.userID,
            elements : applicationState.elements,
            elementState : applicationState.elementState,
            boardName : applicationState.boardName,
            zoomLevel : applicationState.zoomLevel,
            offsetX : applicationState.offsetX,
            offsetY : applicationState.offsetY
        };
        let fileName = `miralFile_${applicationState.boardName}`;
        const checkIfAlreadyExists = monday.storage.instance.getItem(fileName);
        if(checkIfAlreadyExists) {
            fileName = fileName+"_"+new Date().getHours()+new Date().getMinutes();
        }
        monday.storage.instance.setItem(fileName, JSON.stringify(stateToSave));
        monday.storage.instance.getItem("miralFileList")
            .then((request) => {
                let checkFileList = [];
                if(request.data.value === null) {
                    checkFileList = [fileName];
                } else {
                    checkFileList = JSON.parse(request.data.value);
                    checkFileList.push(fileName);
                }
            monday.storage.instance.setItem("miralFileList", JSON.stringify(checkFileList));
        });
        this.setState({
            menuVisible : false,
            subMenu : []
        });
        
    }

    getSavedFromMonday = (e) => {
        const monday = window.mondaySdk();
        monday.storage.instance.getItem("miralFileList").then(request => {
            let files = [];
            if(request.data.value) {
                const fileNames = JSON.parse(request.data.value);
                files = fileNames.map(fileName => {
                    return <FileOption 
                        key={`fileOption_${fileName}`} 
                        fileName={fileName}
                        loadFile={this.loadFileFromMonday} 
                    />
                });
            } else {
                files.push(<div className="navMenu_error">
                    No saved files found on this browser.
                </div>);
            }
            this.setState({
                subMenu : files
            });
        });
    }

    loadFileFromMonday = (fileName) => {
        const monday = window.mondaySdk();
        monday.storage.instance.getItem(fileName)
        .then(request => {
            if(request.data.value) {
                const state = Object.assign({}, this.props.applicationState, JSON.parse(request.data.value));
                this.props.handleUpdateElementsAndState(state);
                this.setState({
                    menuVisible : false,
                    subMenu : []
                });
            }
        });
        
    }
  
    render() {
        const { 
            menuVisible,
            subMenu,
            mondaySaveAvailable
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
                <span className={"companyName"}>Workshoppr.com</span>
                <span className={"burgerMenu"} onClick={this.handleOpenMenu}></span>
                <div className={menuCSS}>
                    <div className={"navBar_menu_arrow"} />
                    <div className={`navBar_menu_sliderWrapper`} >
                        <div className={`navBar_menu_slider ${letFirstMenuHidden}`} >
                            <div className={`navBar_menu_items`} >
                                {(mondaySaveAvailable &&
                                    <>
                                        <div 
                                            className={"navBar_menu_item"}
                                            onClick={this.saveToMonday}
                                        >   
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 64 64">
                                                <g transform="matrix(3.208255 0 0 3.208255 -35.559129 -63.587202)">
                                                    <path d="M13.513 35.76a2.433 2.433 0 0 1-2.059-3.723l4.377-6.99a2.432 2.432 0 1 1 4.123 2.582l-4.378 6.99a2.43 2.43 0 0 1-2.063 1.141z" fill="#ff3d57"/>
                                                    <path d="M21.056 35.76a2.433 2.433 0 0 1-2.063-3.723l4.38-6.99a2.432 2.432 0 1 1 4.117 2.582l-4.372 6.99a2.43 2.43 0 0 1-2.063 1.141z" fill="#ffcb00"/>
                                                    <ellipse ry="2.375" rx="2.436" cy="33.384" cx="28.597" fill="#00d647"/>
                                                </g>
                                            </svg>
                                            <span>Save to Monday.com</span>
                                        </div>
                                        <div 
                                            className={"navBar_menu_item"}
                                            onClick={this.getSavedFromMonday}
                                        >   
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 64 64">
                                                <g transform="matrix(3.208255 0 0 3.208255 -35.559129 -63.587202)">
                                                    <path d="M13.513 35.76a2.433 2.433 0 0 1-2.059-3.723l4.377-6.99a2.432 2.432 0 1 1 4.123 2.582l-4.378 6.99a2.43 2.43 0 0 1-2.063 1.141z" fill="#ff3d57"/>
                                                    <path d="M21.056 35.76a2.433 2.433 0 0 1-2.063-3.723l4.38-6.99a2.432 2.432 0 1 1 4.117 2.582l-4.372 6.99a2.43 2.43 0 0 1-2.063 1.141z" fill="#ffcb00"/>
                                                    <ellipse ry="2.375" rx="2.436" cy="33.384" cx="28.597" fill="#00d647"/>
                                                </g>
                                            </svg>
                                            <span>Load from Monday.com</span>
                                        </div>
                                    </>
                                )}
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

    componentDidMount() {
        const url = document.location.ancestorOrigins[0];
        if(url) {
            const isMonday = url.indexOf("monday.com") !== -1;
            if(isMonday) {
                this.setState({
                    mondaySaveAvailable : true
                });
            }
        }
    }
    
  }

  export default Navbar;