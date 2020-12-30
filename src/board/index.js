import React, {Component} from 'react';

//UI
import Tools from './ui/tools';
import Altimeter from './ui/altimeter';
import TextEditor from './ui/textEditor';
import ElementEditor from './ui/elementEditor';
import Resizer from './ui/resizer';
import ElementDrag from './ui/elementDrag';
import NavBar from './ui/navbar';
import BoardControls from './ui/boardControls';
import InteractionManager from './ui/InteractionManager';
import KeyboardManager from './ui/KeyboardManager';
import MultiUserManager from './ui/MultiUserManager';

//ELEMENTS
import Elements from './elements';

//HELPERS
import Shortid from 'shortid';
import {objectClone} from './utils';

//SVG
import Pattern from './pattern';

import './styles.css';



class Board extends Component {

    constructor(props, context) {
      super(props, context);
      this.state = {
        boardName : "new-board-"+new Date().toLocaleDateString().replace(/\//g, ""),
        boardID : Shortid.generate(),
        userID : Shortid.generate(),
        zoomLevel : 100,
        offsetX : 0,
        offsetY : 0,
        tool : "pan",
        dragHandlers : {},
        clickHandler : null,
        elements : {},
        elementState : {},
        textEditor : null,
        storeUndo : false,
        shareBoard : false,
        multiUserUpdate : false,
        pointerPosition : {x : 0, y : 0},
        pasteBuffer : {
            type : null,
            elements : [],
            elementState : []
        }
      };
      this.canvasAnimations = [];
    }

    handlePanStart = (e, dragStartX, dragStartY) => {
        this.clearCanvasAnimations();
        this.panEventTimeStamp = Date.now();
        this.velocityX = 0;
        this.velocityY = 0;
    }

    handlePanMove = (e) => {
        const {
            offsetX,
            offsetY,
            zoomLevel
        } = this.state;

        this.setState({
            offsetX : offsetX + ((e.movementX)*-zoomLevel),
            offsetY : offsetY + ((e.movementY)*-zoomLevel),
        });

        const currentTimeStamp = Date.now();
        const elapsedTime = currentTimeStamp - this.panEventTimeStamp;
        this.velocityX_pixelsPerMilliSecond = e.movementX/elapsedTime;
        this.velocityY_pixelsPerMilliSecond = e.movementY/elapsedTime;
        this.panEventTimeStamp = currentTimeStamp;
    }

    handlePanEnd(e) {
        // const {
        //     offsetX,
        //     offsetY,
        //     zoomLevel
        // } = this.state;

        // //calculate velocity of pan and final destination
        // const momentumDuration = 300;

        // // const finalPosition = {
        // //     offsetX : offsetX + ((this.velocityX_pixelsPerMilliSecond*momentumDuration)*-zoomLevel),
        // //     offsetY : offsetY + ((this.velocityY_pixelsPerMilliSecond*momentumDuration)*-zoomLevel)
        // // };

        // //this.animateToPosition(finalPosition, 1);

    }

    animateToElement = (elementID, duration) => {
        const {
            zoomLevel,
            elements
        } = this.state;

        

        const elementData = elements[elementID];

        //get correct zoomLevel

        const elementHeightInReal = elementData.styles.height/zoomLevel,
              elementWidthInReal = elementData.styles.width/zoomLevel;

        let heightZoomLevel = zoomLevel,
            widthZoomLevel = zoomLevel;
        
        heightZoomLevel = ((elementHeightInReal/this.props.height)*1.3)*zoomLevel;
        widthZoomLevel = ((elementWidthInReal/this.props.width)*1.3)*zoomLevel;

        const finalZoomLevel = Math.round(Math.max(heightZoomLevel, widthZoomLevel));

        //get element position

        const elementCenterPointX = elementData.styles.x+(elementData.styles.width/2),
              elementCenterPointY = elementData.styles.y+(elementData.styles.height/2);

        const finalPosition = {
            offsetX : elementCenterPointX-((this.props.width/2)*finalZoomLevel),
            offsetY : elementCenterPointY-((this.props.height/2)*finalZoomLevel),
            zoomLevel : finalZoomLevel
        };

        //call animateToPosition
        this.animateToPosition(finalPosition, duration);

    }

    animateToPosition(finalPosition, duration) {
        const {
            offsetX,
            offsetY,
            zoomLevel
        } = this.state;

        const FPS = 30,
              durationMs = duration*1000,
              stepCount = durationMs / FPS,
              endValueX = finalPosition.offsetX,
              endValueY = finalPosition.offsetY,
              endZoomLevel = finalPosition.zoomLevel,
              valueIncrementX = (endValueX - offsetX) / stepCount,
              valueIncrementY = (endValueY - offsetY) / stepCount,
              valueIncrementZoom = (endZoomLevel - zoomLevel) / stepCount,
              sinValueIncrement = Math.PI / stepCount;

        let currentValueX = offsetX,
            currentValueY = offsetY,
            currentZoomLevel = zoomLevel,
            currentSinValue = 0,
            counter = 0;
        
        this.clearCanvasAnimations();

        do {
            counter++;
            currentSinValue += sinValueIncrement;
            currentZoomLevel += Math.round(valueIncrementZoom * (Math.sin(currentSinValue) ** 2) * 2);
            currentValueX += valueIncrementX * (Math.sin(currentSinValue) ** 2) * 2;
            currentValueY += valueIncrementY * (Math.sin(currentSinValue) ** 2) * 2;
            let time = stepCount*counter;

            (function(newOffsetX, newOffsetY, newZoomLevel, incrementDelay) {
                this.canvasAnimations.push(setTimeout(() => {
                    this.setState({
                        offsetX : newOffsetX,
                        offsetY : newOffsetY,
                        zoomLevel : newZoomLevel
                    });
                }, incrementDelay));
            }.bind(this)(currentValueX, currentValueY, currentZoomLevel, time));

        } while (currentSinValue < Math.PI)

    }

    clearCanvasAnimations = () => {
        this.canvasAnimations.forEach(animation => {
            clearTimeout(animation);
        });
        this.canvasAnimations = [];
    }

  
    handleToolSelect = (type, dontDeselect) => {
        if(!dontDeselect) {
            this.handleDeselectAllElements();
        }
        this.setState({"tool" : type});
    }

    handleTextEdit = (id) => {
        const newElements = {...this.state.elements};
        const prevElementData = {...this.state.elements[id]};
        const elementData = {...this.state.elements[id]};
        //clear Text in real element to prevent shadow
        elementData.text = "";
        newElements[id] = elementData;
        this.setState({textEditor : prevElementData, elements : newElements});
    }

    handleUpdatedText = (data) => {
        const newElementsData = {...this.state.elements};
        const newElement = {...newElementsData[data.id]};
        newElement.text = data.newText;
        newElement.fontStyle.fontSize = data.fontSize;
        newElement.unScaledFontSize = data.fontSize;
        newElement.padding = 8*this.state.zoomLevel;
        
        newElementsData[data.id] = newElement;
        this.setState({
            elements : newElementsData,
            storeUndo : true,
            textEditor : null
        });
    }

    handleSetCurrentElement = (elementID, isMultiSelect) => {
        const newElementStateData = {...this.state.elementState};
        if(!isMultiSelect) {
            Object.keys(newElementStateData).forEach(item => {
                if(this.isSelected(item)) {
                    const newElement = {...newElementStateData[item]};
                    newElement.selected = false;
                    newElementStateData[item] = newElement;
                }
            });
        }
        const newSelectedElement = {...newElementStateData[elementID]};
        if(this.isSelected(elementID)) {
            newSelectedElement.selected = false;
        } else if (!this.isSelected(elementID) && newElementStateData[elementID].selected === false) {
            newSelectedElement.selected = this.state.userID;
        }
        newElementStateData[elementID] = newSelectedElement;
        this.setState({
            elementState : newElementStateData
        });
    };

    handleDeselectAllElements = () => {
        const newElementStateData = this.deselectElements(this.state.elementState);
        this.setState({
            elementState : newElementStateData
        });
    }

    deselectElements = (elementState) => {
        const newElementStateData = {...elementState};
        Object.keys(newElementStateData).forEach(item => {
            if(this.isSelected(item)) {
                const newElement = {...newElementStateData[item]};
                newElement.selected = false;
                newElementStateData[item] = newElement;
            }
        });
        return newElementStateData;
    }

    registerDragHandler = (id, newDragHandlers) => {
        setTimeout(() => {
            var newHandlers = {};
            if(newDragHandlers.dragStartHandler) {
                newHandlers.handleDragStart =  newDragHandlers.dragStartHandler.bind(this);
            }
            if(newDragHandlers.dragMoveHandler) {
                newHandlers.handleDragMove =  newDragHandlers.dragMoveHandler.bind(this);
            }
            if(newDragHandlers.dragEndHandler) {
                newHandlers.handleDragEnd =  newDragHandlers.dragEndHandler.bind(this);
            }
            if(newDragHandlers.clickHandler) {
                newHandlers.handleClick =  newDragHandlers.clickHandler.bind(this);
            }
            const dragHandlers = {...this.state.dragHandlers};
            dragHandlers[id] = newHandlers;
            this.setState({dragHandlers});
        });
       
    };

    removeDragHandler = (id) => {
        const dragHandlers = {...this.state.dragHandlers};
        if(dragHandlers[id]) {
            delete dragHandlers[id];
        }
        this.setState({dragHandlers});
    }

    handleSetElementHeight = (elementID, height) => {
        const newHeight  = Number(height)*this.state.zoomLevel;
        if(this.state.elements[elementID].styles.height !== newHeight) {
            const newElementsData = {...this.state.elements};
            newElementsData[elementID] = {...newElementsData[elementID]};
            newElementsData[elementID].styles = {...newElementsData[elementID].styles};
            newElementsData[elementID].styles.height = newHeight;
            this.setState({elements : newElementsData});
        }
    };

    handleUpdateElementProperty = (data) => {
        const newElementsData = {...this.state.elements};
        const newElement = {...newElementsData[data.id]};
        newElement[data.property] = data.value;
        newElementsData[data.id] = newElement;
        this.setState({elements : newElementsData, storeUndo : true});
    }

    handleUpdateElementsAndState = (data) => {
        this.setState(data);
    }

    handleDeleteElements = () => {
        const newElementsData = {...this.state.elements};
        const newElementsState = {...this.state.elementState};
        Object.keys(this.state.elementState).forEach(item => {
            if(this.isSelected(item)) {
                delete newElementsData[item];
                delete newElementsState[item];
            }
        });
        this.setState({
                elements : newElementsData,
                elementState : newElementsState,
                storeUndo : true
            });
    }

    handleShiftElementPosition = (type, ids) => {
        const newElementsData = {},
              newElementState = {};
        const newIdsOrder = Object.keys(this.state.elements);
        ids.forEach(id => {
            const arrayPosition = newIdsOrder.indexOf(id);
            newIdsOrder.splice(arrayPosition, 1);
            if(type === "forward") {
                newIdsOrder.splice(newIdsOrder.length, 0, id);
            } else if (type === "backward") {
                newIdsOrder.splice(0, 0, id);
            }
        });
        newIdsOrder.forEach(id => {
            newElementsData[id] = this.state.elements[id];
            newElementState[id] = this.state.elementState[id];
        });
        this.setState({
            elementState : newElementState,
            elements : newElementsData,
            storeUndo : true
        });
    }

    handleSelectElementsWithinArea = (x, y, x1, y1) => {
        const {
            elements,
            elementState,
            userID,
            zoomLevel,
            offsetX,
            offsetY
        } = this.state;

        const newElementsState = {...elementState};

        const realSpaceX = (x*zoomLevel)+offsetX,
              realSpaceY = (y*zoomLevel)+offsetY,
              realSpaceX1 = (x1*zoomLevel)+offsetX,
              realSpaceY1 = (y1*zoomLevel)+offsetY;

        Object.keys(elements).forEach(elementID => {
            const element = elements[elementID];
            const isSelectable = this.isSelected(elementID) || newElementsState[elementID].selected === false;
            let isWithinArea = false;
            
            if(
                element.styles.x >= realSpaceX &&
                (element.styles.x + element.styles.width) <= realSpaceX1 &&
                element.styles.y >= realSpaceY &&
                (element.styles.y + element.styles.height) <= realSpaceY1) 
                {
                    isWithinArea = true;
                }
            if(isWithinArea && isSelectable) {
                newElementsState[elementID] = {...newElementsState[elementID]};
                newElementsState[elementID].selected = userID;
            }
        });
        this.setState({elementState : newElementsState});
    }

    handleDuplicateElements = () => {
        const {
            elements,
            elementState,
            zoomLevel,
            userID
        } = this.state;

        
        const selectedElements = this.getSelectedElements(elementState, userID);
        //TOTEST : nothing happens when no elements selected
        if(selectedElements.length) { 
            const newElements = {...elements};
            const newElementsState = {...elementState};
            const duplicatesOffsetMargin = 8;

            const duplicatesOffsetPosition = {
                x : selectedElements[0].styles.x,
                x1 : selectedElements[0].styles.x + selectedElements[0].styles.width + (duplicatesOffsetMargin*zoomLevel)
            };

            //get position for new duplicate elements
            selectedElements.forEach(element => {
                if(element.styles.x < duplicatesOffsetPosition.x) {
                    duplicatesOffsetPosition.x = element.styles.x;
                }
                const elementX1 = element.styles.x + element.styles.width;
                if(elementX1 > duplicatesOffsetPosition.x1) {
                    duplicatesOffsetPosition.x1 = elementX1+(duplicatesOffsetMargin*zoomLevel);
                }
            });

            //duplicate elements & state
            selectedElements.forEach(element => {
                const newID = Shortid.generate();
                const duplicateElement = objectClone(element);
                const duplicateElementState = objectClone(elementState[element.id]);
                duplicateElement.id = newID;
                duplicateElement.styles.x = duplicatesOffsetPosition.x1 + (duplicateElement.styles.x - duplicatesOffsetPosition.x);
                newElements[newID] = duplicateElement;
                newElementsState[newID] = duplicateElementState;
                //remove selected status for old items
                newElementsState[element.id] = {...newElementsState[element.id]};
                newElementsState[element.id].selected = false;
            });

            this.setState(
                {
                    elementState : newElementsState,
                    elements : newElements
                }
            );
        }
    }

    updateBoardPosition = (data) => {
        this.setState(data);
    }

    updateBoardName = (newBoardName) => {
        this.setState({
            boardName : newBoardName
        });
    }

    updatePointerPosition = (coOrds) => {
        this.setState({
            pointerPosition : coOrds
        });
    }

    toggleBoardShare = (data) => {
        if(data) {
            this.setState({shareBoard : data});
        } else {
            this.setState({shareBoard : false});
        }
        
    }

    calculateSelectedElementsBoundingBox(selectedElements, zoomLevel, offsetX, offsetY) {
        if(selectedElements && selectedElements.length > 0) {
            let width = selectedElements[0].styles.width,
                height = selectedElements[0].styles.height,
                x = selectedElements[0].styles.cx || selectedElements[0].styles.x,
                y = selectedElements[0].styles.cy || selectedElements[0].styles.y,
                cx = x+width,
                cy = y+height,
                combinedWidth = 0,
                combinedHeight = 0;
            if(selectedElements.length > 1) {
                selectedElements.forEach(item => {
                    let itemWidth = item.styles.width,
                        itemHeight = item.styles.height,
                        itemX = item.styles.cx || item.styles.x,
                        itemY = item.styles.cy || item.styles.y,
                        itemCX = itemX+itemWidth,
                        itemCY = itemY+itemHeight;
                    
                    if (itemX < x) {
                        x = itemX;
                    }
                    if(itemCX > cx) {
                        cx = itemCX;
                    }
                    if (itemY < y) {
                        y = itemY;
                    }
                    if(itemCY > cy) {
                        cy = itemCY;
                    }
                });
                combinedWidth = cx-x;
                combinedHeight = cy-y;
            }
            return {
                height : (combinedHeight || height)/zoomLevel,
                width : (combinedWidth || width)/zoomLevel,
                x : (x-offsetX)/zoomLevel,
                y : (y-offsetY)/zoomLevel,
                cx : (cx-offsetX)/zoomLevel,
                cy : (cy-offsetY)/zoomLevel,
                rawX : x,
                rawY : y,
                rawHeight : (combinedHeight || height),
                rawWidth : (combinedWidth || width)
            };
        }
        return {
            height : 0,
            width : 0,
            x : 0,
            y : 0,
            cx : 0,
            cy : 0,
            rawX : 0,
            rawY : 0,
            rawHeight : 0,
            rawWidth : 0
        };
    }

    isSelected = (elementID) => {
        const {
            elementState,
            userID
        } = this.state;
        return elementState[elementID].selected === userID;
    }

    isUniqueSelected = (elementID) => {
        const {
            elementState,
            userID
        } = this.state;
        const isSelected = elementState[elementID].selected === userID;
        let selectedCount = 0;
        Object.keys(elementState).forEach(elementID => {
            if(this.isSelected(elementID)) {
                selectedCount++;
            }
        });
        const isUniqueSelcted = isSelected && selectedCount === 1;
        return isUniqueSelcted;
    }

    getSelectedElements(elementState) {
        const selectedElements = [];
        Object.keys(elementState).forEach(elementID => {
            if(this.isSelected(elementID)) {
                selectedElements.push(this.state.elements[elementID]);
            }
        });
        return selectedElements;
    }

    getState = () => {

        return {...this.state};

    }

    getSlides = () => {
        const {
            elements
        } = this.state;

        const slideKeys = Object.keys(elements).filter((elementID) => {
            if(elements[elementID].type === "slide") {
                return true;
            } else {
                return false;
            }
        });

        const slides = slideKeys.map(slideKey => {
            return {
                id : slideKey,
                slideName : elements[slideKey].slideName
            }
        });

        return slides;
    }

    changeSlideName = (slideID, newName) => {
        const {
            elements
        } = this.state;
        const newElements = {...elements};
        const newSlideElement = {...elements[slideID]};
        newSlideElement.slideName = newName;
        newElements[slideID] = newSlideElement;
        this.setState({elements : newElements});
    } 

    shuntSelectedElements = (direction) => {
        const {
            elements,
            elementState,
            zoomLevel
        } = this.state;
        const newElements = {...elements};
        const selectedElements = this.getSelectedElements(elementState);
        selectedElements.forEach(element => {
            const newElementStyles = {...element.styles};
            newElements[element.id].styles = newElementStyles;
            if(direction === "down") {
                newElementStyles.y += zoomLevel;
            } else if(direction === "up") {
                newElementStyles.y -= zoomLevel;
            } else if(direction === "left") {
                newElementStyles.x -= zoomLevel;
            } else if(direction === "right") {
                newElementStyles.x += zoomLevel;
            }
        });
        this.setState({elements : newElements});
    }

    copy = () => {
        const {
            elementState,
            userID,
            zoomLevel,
            offsetX,
            offsetY
        } = this.state;
        
        const selectedElements = this.getSelectedElements(elementState, userID);

        const pasteBuffer = {
            type : "copy",
            elements : selectedElements,
            elementState : {},
            boundingBox : this.calculateSelectedElementsBoundingBox(selectedElements, zoomLevel, offsetX, offsetY)
        };

        selectedElements.forEach(element => {
            pasteBuffer.elementState[element.id] = {...elementState[element.id]};
        });

        this.setState({
            pasteBuffer
        });

    }

    cut = () => {
        const {
            elements,
            elementState,
            userID,
            zoomLevel,
            offsetX,
            offsetY
        } = this.state;
        
        const selectedElements = this.getSelectedElements(elementState, userID);
        const pasteBuffer = {
            type : "cut",
            elements : [],
            elementState : {},
            boundingBox : this.calculateSelectedElementsBoundingBox(selectedElements, zoomLevel, offsetX, offsetY)
        }

        const newElements = {...elements};
        const newElementState = {...elementState};

        selectedElements.forEach(element => {
            pasteBuffer.elements.push({...element});
            pasteBuffer.elementState[element.id] = {...elementState[element.id]};
            delete newElements[element.id];
            delete newElementState[element.id]
        });
        
        this.setState({
            elements : newElements,
            elementState : newElementState,
            pasteBuffer
        });
    }

    paste = () => {
        const {
            elements,
            elementState,
            pointerPosition,
            pasteBuffer
        } = this.state;
        
        const newElements = {...elements};
        const newElementState = this.deselectElements(elementState);

        pasteBuffer.elements.forEach(element => {
            const newID = Shortid.generate();
            newElements[newID] = {...element};
            newElements[newID].id = newID;

            newElementState[newID] = {...pasteBuffer.elementState[element.id]};
            newElementState[element.id] = {...newElementState[element.id]};
            newElementState[element.id].selected = false;

            newElements[newID].styles = {...element.styles};
            const newX = pointerPosition.x + (element.styles.x - pasteBuffer.boundingBox.rawX);
            const newY = pointerPosition.y + (element.styles.y - pasteBuffer.boundingBox.rawY);
            newElements[newID].styles.x = newX;
            newElements[newID].styles.y = newY;
        })

        const newState = {
            elements : newElements,
            elementState : newElementState
        };

        if(pasteBuffer.type === "cut") {
            newState.pasteBuffer = {
                type : null,
                elements : [],
                elementState : []
            };
        }

        this.setState(newState);
    }

    loadRemoteBoard = (url) => {
        fetch(url)
            .then((resp) => resp.json())
            .then((data) => {
                const newState = Object.assign({}, this.state, data);
                this.setState(newState);
            })
            .catch(e => console.log(e));
    }

    loadTemplatesAndTutorials = () => {
        this.loadRemoteBoard("https://raw.githubusercontent.com/SimonKenyonShepard/miral_templates/main/whiteboardFile_splashScreen.wswb");
    }

    render() {
        const {width, height} = this.props;
        const {
            offsetX, 
            offsetY, 
            zoomLevel, 
            tool, 
            elements,
            elementState,
            textEditor
        } = this.state;
        const zoomedWidth = width*zoomLevel,
        zoomedHeight = height*zoomLevel;
        const viewBox = `${offsetX} ${offsetY} ${zoomedWidth} ${zoomedHeight}`;

        const selectedElements = this.getSelectedElements(elementState);
        const elementKeys = Object.keys(elements);
        
        const boundingBox = this.calculateSelectedElementsBoundingBox(selectedElements, zoomLevel, offsetX, offsetY),
              gridSizeMin = 24,
              gridSizeMax = 96,
              gridRange = gridSizeMax-gridSizeMin,
              percentageGridSize = (zoomLevel-(Math.floor(zoomLevel/100)*100))/100,
              backgroundGridSize = gridSizeMax-(gridRange*percentageGridSize),
              backgroundPositionX = ((offsetX)/zoomLevel*-1)-percentageGridSize,
              backgroundPositionY = ((offsetY)/zoomLevel*-1)-percentageGridSize;

        const gridPosition = {
            backgroundPosition : `${backgroundPositionX}px ${backgroundPositionY}px`,
            backgroundSize : `${backgroundGridSize}px ${backgroundGridSize}px`
        };
        return (
                <div 
                    className={`boardWrapper ${tool}`} 
                    style={gridPosition}
                >
                    <InteractionManager
                        offsetX={this.state.offsetX}
                        offsetY={this.state.offsetY}
                        zoomLevel={this.state.zoomLevel}
                        updateBoardPosition={this.updateBoardPosition}
                        dragHandlers={this.state.dragHandlers}
                        updatePointerPosition={this.updatePointerPosition}
                        handlePanMove={this.handlePanMove}
                    >
                        <svg id="board" 
                            width={`${width}px`}
                            height={`${height}px`}
                            viewBox={viewBox}
                            >
                            <defs>
                                <filter height="200%" id="shadow1" width="200%" x="-50%" y="-50%">
                                    <feGaussianBlur in="SourceGraphic" stdDeviation="20"/>
                                </filter>
                                <filter height="200%" id="shadow2" width="200%" x="-50%" y="-50%">
                                    <feGaussianBlur in="SourceGraphic" stdDeviation="10"/>
                                </filter>
                                <filter id="shadow3">
                                    <feDropShadow ddx="0" dy="0" stdDeviation="0.5"/>
                                </filter>
                                <marker id="arrow" markerWidth="5" markerHeight="5" refX="2.5" refY="2.5" orient="auto" markerUnits="strokeWidth">
                                    <polygon points="0,0 0,5 5,2.5" fill="#000" />
                                </marker>
                            </defs>
                            <Pattern 
                                zoomLevel={zoomLevel}
                            />
                            <ElementDrag 
                                boundingBox={boundingBox}
                                elementKeys={elementKeys}
                                registerDragHandler={this.registerDragHandler}
                                removeDragHandler={this.removeDragHandler}
                            />
                            <Elements 
                                elements={elements}
                                elementState={elementState}
                                handleTextEdit={this.handleTextEdit}
                                handleSetCurrentElement={this.handleSetCurrentElement}
                                isSelected={this.isSelected}
                                isUniqueSelected={this.isUniqueSelected}
                                animateToElement={this.animateToElement}
                                loadRemoteBoard={this.loadRemoteBoard}
                                zoomLevel={zoomLevel}
                            />
                        </svg>
                        <Resizer 
                            isVisible={(selectedElements.length > 0)}
                            registerDragHandler={this.registerDragHandler}
                            boundingBox={boundingBox}
                        />
                        <TextEditor 
                            data={textEditor}
                            gridSpace={{offsetX, offsetY, zoomLevel}}
                            handleUpdatedText={this.handleUpdatedText}
                            handleSetElementHeight={this.handleSetElementHeight}
                        />
                        <ElementEditor 
                            selectedElements={selectedElements}
                            gridSpace={{offsetX, offsetY, zoomLevel}}
                            getSlides={this.getSlides}
                            handleUpdateElementProperty={this.handleUpdateElementProperty}
                            handleDeleteElements={this.handleDeleteElements}
                            handleShiftElementPosition={this.handleShiftElementPosition}
                            boundingBox={boundingBox}
                        />
                        <Tools
                            handleToolSelect={this.handleToolSelect} 
                            registerDragHandler={this.registerDragHandler}
                            removeDragHandler={this.removeDragHandler}
                            handleSelectElementsWithinArea={this.handleSelectElementsWithinArea}
                            currentSelectedTool={this.state.tool}
                        />
                    </InteractionManager>
                    <Altimeter zoomLevel={zoomLevel} />
                    <BoardControls
                        elements={this.state.elements}
                        elementState={this.state.elementState}
                        storeUndo={this.state.storeUndo}
                        handleUpdateElementsAndState={this.handleUpdateElementsAndState}
                        boardName={this.state.boardName}
                        updateBoardName={this.updateBoardName}
                        toggleBoardShare={this.toggleBoardShare}
                        getSlides={this.getSlides}
                        changeSlideName={this.changeSlideName}
                        animateToElement={this.animateToElement}
                    />
                    <NavBar 
                        getState={this.getState}
                        handleUpdateElementsAndState={this.handleUpdateElementsAndState}
                        loadTemplatesAndTutorials={this.loadTemplatesAndTutorials}
                    />
                    <KeyboardManager
                        keyboardHandlers={this.state.keyboardHandlers}
                        handleDeleteElements={this.handleDeleteElements}
                        handleDuplicateElements={this.handleDuplicateElements}
                        shuntSelectedElements={this.shuntSelectedElements}
                        textEditor={textEditor}
                        copy={this.copy}
                        cut={this.cut}
                        paste={this.paste}
                    />
                    <MultiUserManager
                        userID={this.state.userID} 
                        shareBoard={this.state.shareBoard}
                        elements={this.state.elements}
                        elementState={this.state.elementState}
                        handleUpdateElementsAndState={this.handleUpdateElementsAndState}
                        multiUserUpdate={this.state.multiUserUpdate}
                        pointerPosition={this.state.pointerPosition}
                        offsetX={this.state.offsetX}
                        offsetY={this.state.offsetY}
                        zoomLevel={this.state.zoomLevel}
                    />
                </div>
        );
    }

    componentDidMount(){
        this.registerDragHandler("board", {
            "dragStartHandler" : this.handlePanStart,
            "dragMoveHandler" : this.handlePanMove,
            "dragEndHandler" : this.handlePanEnd,
            "clickHandler" : this.handleDeselectAllElements
        });
        const isNotFirstUse = window.localStorage.getItem("miral_isFirstUse");
        if(!isNotFirstUse) {
            this.loadTemplatesAndTutorials();
            window.localStorage.setItem("miral_isFirstUse", true);
        }
        
    }

    
  }

  export default Board;