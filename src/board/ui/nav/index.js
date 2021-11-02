import React, {PureComponent} from 'react';

import { updateDocumentTitle } from './../../utils';

import { svgToPng } from './../../utils-svg2png';

import Hub from './hub/';
import NavBar from './NavBar';


import './styles.css';

const autosave_fileName = `miral_autoSave`;

class Nav extends PureComponent {

    constructor(props, context) {
        super(props, context);
        this.state = {
          hubVisible : false,
          menuVisible : false,
          subMenu : [],
          mondaySaveAvailable : false,
        };
      }

    showHub = () => {
        this.setState({
            hubVisible : true
        });
    }
    
    hideHub = () => {
        this.setState({
            hubVisible : false
        });
    }

    hideMenu = () => {
        this.setState({
            menuVisible : false,
            subMenu : []
        });
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

    exportAsPNG = () => {
        const applicationState = this.props.getState();
        const rawSVG = this.props.getRawSVG();
        svgToPng(rawSVG, {width: this.props.windowWidth, height: this.props.windowHeight}, (data) => {
            console.log("hello");
            const modData = data.replace("image/png", "image/octet-stream");
            var evt = new MouseEvent("click", {
                view: window,
                bubbles: false,
                cancelable: true
            });
            var a = document.createElement("a");
            a.setAttribute("download", applicationState.boardName+"-export.png");
            a.setAttribute("href", modData);
            a.dispatchEvent(evt);
        });
    }

    savePreviewImage = () => {
        return new Promise((resolve, reject) => {
            const rawSVG = this.props.getRawSVG();
            svgToPng(rawSVG, {width: 125, height: 56}, (data) => {
                const modData = data.replace("image/png", "image/octet-stream");
                resolve(modData);
            });
        });
    }

    exportAsSVG = () => {
        const rawSVG = this.props.getRawSVG();

        const rawSVGWithoutForeignObject = rawSVG.replace(/<foreignObject\b[^<]*(?:(?!<\/foreignObject>)<[^<]*)*<\/foreignObject>/gi, "");
        const applicationState = this.props.getState();
        var a = document.createElement("a");
        var file = new Blob([rawSVGWithoutForeignObject], {type: 'image/svg+xml;charset=utf-8'});
        a.href = URL.createObjectURL(file);
        a.download = applicationState.boardName+"-export.svg";
        a.click();
    }
    
    saveToBrowser = (e) => {
        const applicationState = this.props.getState();
        applicationState.elementState = this.deselectElements(applicationState.elementState);
        this.savePreviewImage().then(preview => {
            const stateToSave = {
                previewImage : preview,
                elements : applicationState.elements,
                elementState : applicationState.elementState,
                boardName : applicationState.boardName,
                zoomLevel : applicationState.zoomLevel,
                offsetX : applicationState.offsetX,
                offsetY : applicationState.offsetY
            };
            
            let fileName = `miralFile_${applicationState.boardName}`;
            window.localStorage.setItem(fileName, JSON.stringify(stateToSave));
        });
        
    }

    saveToFile = () => {
        const applicationState = this.props.getState();
        applicationState.elementState = this.deselectElements(applicationState.elementState);
        const stateToSave = {
            elements : applicationState.elements,
            elementState : applicationState.elementState,
            boardName : applicationState.boardName,
            zoomLevel : applicationState.zoomLevel,
            offsetX : applicationState.offsetX,
            offsetY : applicationState.offsetY
        };
        let fileName = `whiteboardFile_${applicationState.boardName}.wswb`;
        var a = document.createElement("a");
        var file = new Blob([JSON.stringify(stateToSave)], {type: 'text/plain'});
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
    }

    exportAsTemplate = () => {
        const applicationState = this.props.getState();
        applicationState.elementState = this.deselectElements(applicationState.elementState);
        this.savePreviewImage().then(preview => {
            const stateToSave = {
                previewImage : preview,
                elements : applicationState.elements,
                elementState : applicationState.elementState,
                boardName : applicationState.boardName,
                zoomLevel : applicationState.zoomLevel,
                offsetX : applicationState.offsetX,
                offsetY : applicationState.offsetY
            };
            
            let fileName = `whiteboardFile_${applicationState.boardName}.wswb`;
            var a = document.createElement("a");
            var file = new Blob([JSON.stringify(stateToSave)], {type: 'text/plain'});
            a.href = URL.createObjectURL(file);
            a.download = fileName;
            a.click();
        });
    }

    loadFileFromBrowser = (fileName) => {
        const file = window.localStorage.getItem(fileName);
        const dataToLoad = JSON.parse(file);
        const state = Object.assign({}, this.props.applicationState, dataToLoad);
        this.loadNewBoard(state);
    }

    loadFile = () => {
        const readFile = (e) => {
            var file = e.target.files[0];
            if (!file) {
                return;
            }
            var reader = new FileReader();
            const loader = (e) => {
                var file = e.target.result;
                const state = Object.assign({}, this.props.applicationState, JSON.parse(file));
                this.loadNewBoard(state);
            }
            reader.onload = loader;
            reader.readAsText(file);
        }
        const fileInput = document.createElement("input");
        fileInput.type='file';
        fileInput.accept=".wswb";
        fileInput.onchange=readFile;
        fileInput.click();
    }

    getSavedFromBrowser = (e) => {
        // const files = [];
        // Object.keys(window.localStorage).forEach(item => {
        //     if(item.indexOf("miralFile_") !== -1) {
        //         const fileName = item.replace("miralFile_", "");
        //         files.push(
        //             <FileOption 
        //                 key={`fileOption_${fileName}`} 
        //                 fileName={fileName}
        //                 loadFile={this.loadFileFromBrowser} 
        //                 deleteFile={this.deleteFileFromLocalStorage}
        //             />
        //         );
        //     }
        // });
        // if(files.length === 0) {
        //     files.push(<div className="navMenu_error">
        //         No saved files found on this browser.
        //     </div>);
        // }
        // this.setState({
        //     subMenu : files
        // });
    }

    saveToMonday = (e) => {
        const monday = window.mondaySdk();
        const applicationState = this.props.getState();
        applicationState.elementState = this.deselectElements(applicationState.elementState);
        const stateToSave = {
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
        
    }

    getSavedFromMonday = (e) => {
        // const monday = window.mondaySdk();
        // monday.storage.instance.getItem("miralFileList").then(request => {
        //     let files = [];
        //     if(request.data.value) {
        //         const fileNames = JSON.parse(request.data.value);
        //         files = fileNames.map(fileName => {
        //             return <FileOption 
        //                 key={`fileOption_${fileName}`} 
        //                 fileName={fileName}
        //                 loadFile={this.loadFileFromMonday} 
        //             />
        //         });
        //     } else {
        //         files.push(<div className="navMenu_error">
        //             No saved files found on this browser.
        //         </div>);
        //     }
        //     this.setState({
        //         subMenu : files
        //     });
        // });
    }

    loadFileFromMonday = (fileName) => {
        const monday = window.mondaySdk();
        monday.storage.instance.getItem(fileName)
        .then(request => {
            if(request.data.value) {
                const state = Object.assign({}, this.props.applicationState, JSON.parse(request.data.value));
                this.loadNewBoard(state);
                this.setState({
                    menuVisible : false,
                    subMenu : []
                });
            }
        });
        
    }

    loadNewBoard = (newState) => {
        //NEED TO WRITE TESTS FOR ALL THIS!
        updateDocumentTitle(newState.boardName);
        this.props.handleUpdateElementsAndState(newState);
    }

    deleteFileFromLocalStorage = () => {
        const applicationState = this.props.getState();
        const {
            boardName 
        } = applicationState;

        window.localStorage.removeItem(`miralFile_${boardName}`);
        this.newFile();
    }

    newFile = () => {
        //TODO write robust mechanism to determine whether file has changed.
        const checkWillLoseChanges = window.localStorage.getItem(autosave_fileName);
        let userConfirmation = true;
        if(checkWillLoseChanges) {
            userConfirmation = window.confirm("All changes in current board will be lost, are you sure?");
        }
        if(userConfirmation) {
            const applicationState = this.props.getState();
            
            const blankState = {
                elements : {},
                elementState : {},
                boardName : "new-board-"+new Date().toLocaleDateString().replace(/\//g, ""),
                zoomLevel : 100,
                offsetX : 0,
                offsetY : 0
            };
            const state = Object.assign({}, applicationState, blankState);
            this.props.handleUpdateElementsAndState(state);
        }
    }

  
    render() {

        const {
            newFile,
            deleteFileFromLocalStorage,
            loadNewBoard,
            loadFileFromMonday,
            getSavedFromMonday,
            getSavedFromBrowser,
            loadFile,
            loadFileFromBrowser,
            exportAsPNG,
            exportAsSVG,
            exportAsTemplate,
            saveToFile,
            saveToBrowser,
            deselectElements,
            hideHub,
            showHub
        } = this;

        const helpers = {
            newFile,
            deleteFileFromLocalStorage,
            loadNewBoard,
            loadFileFromMonday,
            getSavedFromMonday,
            getSavedFromBrowser,
            loadFile,
            loadFileFromBrowser,
            exportAsPNG,
            exportAsSVG,
            exportAsTemplate,
            saveToFile,
            saveToBrowser,
            deselectElements,
            loadRemoteBoard : this.props.loadRemoteBoard,
            hideHub,
            showHub
        };

        return (
            <div className={"nav"}>
                <NavBar 
                    helpers={helpers}
                />
                <Hub 
                    helpers={helpers}
                    hubVisible={this.state.hubVisible}
                />
            </div>
        );
    }
    
  }

  export default Nav;