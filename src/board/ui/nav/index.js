import React, {Component, PureComponent} from 'react';

import { updateDocumentTitle } from './../../utils';

import Hub from './hub/';
import NavBar from './NavBar';


import './styles.css';

const autosave_fileName = `miral_autoSave`;

class Nav extends PureComponent {

    constructor(props, context) {
        super(props, context);
        this.state = {
          menuVisible : false,
          subMenu : [],
          mondaySaveAvailable : false,
        };
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
            this.setState({
                menuVisible : false,
                subMenu : []
            });
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
        this.setState({
            menuVisible : false,
            subMenu : []
        });
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
            this.setState({
                menuVisible : false,
                subMenu : []
            });
        });
    }

    loadFileFromBrowser = (fileName) => {
        const file = window.localStorage.getItem(fileName);
        const dataToLoad = JSON.parse(file);
        const state = Object.assign({}, this.props.applicationState, dataToLoad);
        console.log(fileName, dataToLoad, state);
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

        this.setState({
            menuVisible : false,
            subMenu : []
        });
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
        this.setState({
            menuVisible : false,
            subMenu : []
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
                dragHandlers : {},
                boardName : "new-board-"+new Date().toLocaleDateString().replace(/\//g, ""),
                zoomLevel : 100,
                offsetX : 0,
                offsetY : 0
            };
            const state = Object.assign({}, applicationState, blankState);
            this.props.handleUpdateElementsAndState(state);
            this.setState({
                menuVisible : false,
                subMenu : []
            });
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
            exportAsTemplate,
            saveToFile,
            saveToBrowser,
            deselectElements,
            hideWelcomeScreen
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
            exportAsTemplate,
            saveToFile,
            saveToBrowser,
            deselectElements,
            loadRemoteBoard : this.props.loadRemoteBoard,
            hideWelcomeScreen
        };

        return (
            <div className={"nav"}>
                <NavBar 
                    helpers={helpers}
                />
                <Hub 
                    helpers={helpers}
                />
            </div>
        );
    }
    
  }

  export default Nav;