import React, {Component, PureComponent} from 'react';


import './styles.css';

const autosave_fileName = `miral_autoSave`;

class ExportSVG extends Component {

    render() {
        return(
        <div 
            className={"navBar_menu_item"}
            onClick={this.props.onClick}
        >
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                <path d="M19,9h-4V3H9v6H5l7,7L19,9z M5,18v2h14v-2H5z"/>
            </svg>
            <span>Export as SVG</span>
        </div>
        );
    }
}

class ExportPNG extends Component {

    render() {
        return(
        <div 
            className={"navBar_menu_item"}
            onClick={this.props.onClick}
        >   
             <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                <path d="M19,9h-4V3H9v6H5l7,7L19,9z M5,18v2h14v-2H5z"/>
            </svg>
            <span>Export as PNG</span>
        </div>
        );
    }
}

class ExportTemplate extends Component {

    render() {
        return(
        <div 
            className={"navBar_menu_item"}
            onClick={this.props.onClick}
        >   
             <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                <path d="M19,9h-4V3H9v6H5l7,7L19,9z M5,18v2h14v-2H5z"/>
            </svg>
            <span>Export as Template</span>
        </div>
        );
    }
}

class FileOption extends Component {

    handleClick = (e) => {
        this.props.loadFile(`miralFile_${this.props.fileName}`);
    }

    render() {
        return(<div
            className={"navBar_menu_item"}
            onClick={this.handleClick}
            onDoubleClick={this.handleDblClick}
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

    deselectElements(elementState) {
        const newElementStateData = {...elementState};
        Object.keys(newElementStateData).forEach(item => {
            if(item.selected !== false) {
                const newElement = {...newElementStateData[item]};
                newElement.selected = false;
                newElementStateData[item] = newElement;
            }
        });
        return newElementStateData;
    }
    
    handleOpenMenu = (e) => {
        e.stopPropagation();
        this.setState({
            menuVisible : !this.state.menuVisible,
            subMenu : []
        });
    }

    autoSave = () => {
        const applicationState = this.props.getState();
        applicationState.elementState = this.deselectElements(applicationState.elementState);
        if(Object.keys(applicationState.elements).length > 0) {
            const stateToSave = {
                elements : applicationState.elements,
                elementState : applicationState.elementState,
                boardName : applicationState.boardName,
                zoomLevel : applicationState.zoomLevel,
                offsetX : applicationState.offsetX,
                offsetY : applicationState.offsetY
            };
            window.localStorage.setItem(autosave_fileName, JSON.stringify(stateToSave));
        } else {
            window.localStorage.removeItem(autosave_fileName);
        }
       
        
    }
    
    saveToBrowser = (e) => {
        this.props.helpers.saveToBrowser();
        this.setState({
            menuVisible : false,
            subMenu : []
        });
        
    }

    saveToFile = () => {
        this.props.helpers.saveToFile();
        this.setState({
            menuVisible : false,
            subMenu : []
        });
    }

    exportAsTemplate = () => {
        this.props.helpers.exportAsTemplate();
        this.setState({
            menuVisible : false,
            subMenu : []
        });
    }

    loadFileFromBrowser = (fileName) => {
        this.props.helpers.loadFileFromBrowser(fileName);
        this.setState({
            menuVisible : false,
            subMenu : []
        });
    }

    loadFile = () => {
        this.props.helpers.loadFile();
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
                        deleteFile={this.deleteFileFromLocalStorage}
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
        this.props.helpers.saveToMonday();
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
        this.props.helpers.loadFileFromMonday(fileName);
        this.setState({
            menuVisible : false,
            subMenu : []
        });
        
    }

    deleteFileFromLocalStorage = () => {
        this.props.helpers.deleteFileFromLocalStorage();
        this.setState({
            menuVisible : false,
            subMenu : []
        });
    }

    newFile = () => {
        this.props.helpers.newFile();
        this.setState({
            menuVisible : false,
            subMenu : []
        });
    }

    loadTemplatesAndTutorials = () => {
        this.props.helpers.showHub();
        this.setState({
            menuVisible : false,
            subMenu : []
        });
    }

    exportAsPNG = () => {
        this.props.helpers.exportAsPNG();
        this.setState({
            menuVisible : false,
            subMenu : []
        });
    }

    exportAsSVG = () => {
        this.props.helpers.exportAsSVG();
        this.setState({
            menuVisible : false,
            subMenu : []
        });
    }

    exportAsTemplate = () => {
        this.props.helpers.exportAsTemplate();
        this.setState({
            menuVisible : false,
            subMenu : []
        });
    }

    exportAs = () => {

        this.setState({
            subMenu : [
                <ExportSVG
                    onClick={this.exportAsSVG}
                />,
                <ExportPNG
                    onClick={this.exportAsPNG}
                />,
                <ExportTemplate
                    onClick={this.exportAsTemplate}
                />
            ]
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
                <span className={"companyName"}>Workshoppr</span>
                <span className={"burgerMenu"} onClick={this.handleOpenMenu}></span>
                <div className={menuCSS}>
                    <div className={"navBar_menu_arrow"} />
                    <div className={`navBar_menu_sliderWrapper`} >
                        <div className={`navBar_menu_slider ${letFirstMenuHidden}`} >
                            <div className={`navBar_menu_items`} >
                                <div 
                                    className={"navBar_menu_item"}
                                    onClick={this.newFile}
                                >   
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                                        <path d="M0 0h24v24H0V0z" fill="none"/>
                                        <path d="M4.01 2L4 22h16V8l-6-6H4.01zM13 9V3.5L18.5 9H13z"/>
                                    </svg>
                                    <span>New board</span>
                                </div>
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
                                {(!mondaySaveAvailable &&
                                    <>
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
                                    </>
                                )}
                                <div 
                                    className={"navBar_menu_item"}
                                    onClick={this.saveToFile}
                                >   
                                   
                                    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24">
                                        <path d="m19.4,5.7l-9.8,0l0,12.6l12.6,0l0,-9.8l-2.8,-2.8zm-3.5,11.2c-1.162,0 -2.1,-0.938 -2.1,-2.1s0.938,-2.1 2.1,-2.1s2.1,0.938 2.1,2.1s-0.938,2.1 -2.1,2.1zm2.1,-7l-7,0l0,-2.8l7,0l0,2.8z" />
                                        <path d="m2.59,15.12475l2.97298,-3.17475l-2.97298,-3.17475l0.91526,-0.97525l3.89474,4.15l-3.89474,4.15l-0.91526,-0.97525z"  />
                                    </svg>
                                    <span>Save to file</span>
                                </div>
                                <div 
                                    className={"navBar_menu_item"}
                                    onClick={this.loadFile}
                                >   
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                                        <path d="m19.4,5.7l-9.8,0l0,12.6l12.6,0l0,-9.8l-2.8,-2.8zm-3.5,11.2c-1.162,0 -2.1,-0.938 -2.1,-2.1s0.938,-2.1 2.1,-2.1s2.1,0.938 2.1,2.1s-0.938,2.1 -2.1,2.1zm2.1,-7l-7,0l0,-2.8l7,0l0,2.8z" />
                                        <path d="m7.4,8.77525l-2.97298,3.17475l2.97298,3.17475l-0.91526,0.97525l-3.89474,-4.15l3.89474,-4.15l0.91526,0.97525z" />
                                    </svg>
                                    <span>Load from file</span>
                                </div>
                                <div 
                                    className={"navBar_menu_item"}
                                    onClick={this.deleteFileFromLocalStorage}
                                >   
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                                        <path d="M0 0h24v24H0V0z" fill="none"/>
                                        <path d="M6 21h12V7H6v14zm2.46-9.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4h-3.5z"/>
                                    </svg>
                                    <span>Delete board</span>
                                </div>
                                <div 
                                    className={"navBar_menu_item"}
                                    onClick={this.exportAs}
                                >   
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                                        <path d="M19,9h-4V3H9v6H5l7,7L19,9z M5,18v2h14v-2H5z"/>
                                    </svg>
                                    <span>Export as...</span>
                                </div>
                                <div 
                                    className={"navBar_menu_item"}
                                    onClick={this.loadTemplatesAndTutorials}
                                >   
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                                        <path d="M0 0h24v24H0V0z" fill="none"/>
                                        <path d="M20 8H4V6h16v2zm-2-6H6v2h12V2zm4 8v12H2V10h20zm-6 6l-6-3.27v6.53L16 16z"/>
                                    </svg>
                                    <span>Templates &amp; Guides</span>
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
        //enable monday.com save options & disable browser save
        const url = document.location.ancestorOrigins[0];
        if(url) {
            const isMonday = url.indexOf("monday.com") !== -1;
            if(isMonday) {
                this.setState({
                    mondaySaveAvailable : true
                });
            }
        }
        //load previous autosave
        const checkIfAlreadyExists = window.localStorage.getItem(autosave_fileName);
        if(checkIfAlreadyExists) {
            //this.loadFileFromBrowser(autosave_fileName);
        }
        //start autosave
        //setInterval(this.autoSave, 5000);

    }
    
  }

  export default Navbar;