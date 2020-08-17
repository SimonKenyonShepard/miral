import React, {Component} from 'react';
//UI
import Toolbar from './ui/toolbar';
import Altimeter from './ui/altimeter';
import TextEditor from './ui/textEditor';
import ElementEditor from './ui/elementEditor';
import Resizer from './ui/resizer';
import ElementDrag from './ui/elementDrag';
import NavBar from './ui/navbar';
import BoardControls from './ui/boardControls';
import InteractionManager from './ui/InteractionManager';

//ELEMENTS
import Rect from './elements/rect';
import Text from './elements/text';
import Postit from './elements/postit';

import './styles.css';

class Board extends Component {

    constructor(props, context) {
      super(props, context);
      this.state = {
        zoomLevel : 100,
        offsetX : 0,
        offsetY : 0,
        tool : "pan",
        dragHandlers : {},
        clickHandler : null,
        elements : {},
        elementState : {},
        textEditor : null,
        storeUndo : false
      };
    }

    handlePanStart(e, dragStartX, dragStartY) {
        const {
            offsetX,
            offsetY,
            zoomLevel
        } = this.state;

        this.setState({
            offsetX : offsetX + ((dragStartX+e.movementX)*-zoomLevel),
            offsetY : offsetY + ((dragStartY+e.movementY)*-zoomLevel)
        });
    }

    handlePanMove(e) {
        const {
            offsetX,
            offsetY,
            zoomLevel
        } = this.state;

        this.setState({
            offsetX : offsetX + ((e.movementX)*-zoomLevel),
            offsetY : offsetY + ((e.movementY)*-zoomLevel)
        });
    }
  
    handleToolSelect = (type) => {
        this.handleDeselectAllElements();   
        this.setState({"tool" : type});
    }

    handleTextEdit = (id) => {
        const newElements = {...this.state.elements};
        const elementData = {...this.state.elements[id]};
        const clearTextInRealElement = newElements[id].text = "";
        this.setState({textEditor : elementData, elements : newElements});
    }

    handleUpdatedText = (data) => {
        const newElementsData = {...this.state.elements};
        newElementsData[data.id].text = data.newText;
        newElementsData[data.id].styles.fontSize = data.fontSize*this.state.zoomLevel;
        newElementsData[data.id].unScaledFontSize = data.fontSize;
        newElementsData[data.id].padding = 8*this.state.zoomLevel;
        
        this.setState({
            elements : newElementsData,
            storeUndo : true,
            textEditor : null
        });
    }

    handleSetCurrentElement = (elementID, selected, isMultiSelect) => {
        const newElementStateData = {...this.state.elementState};
        if(!isMultiSelect) {
            Object.keys(newElementStateData).forEach(item => {
                newElementStateData[item].selected = false;
            });
        }
        newElementStateData[elementID].selected = !newElementStateData[elementID].selected;
        this.setState({
            elementState : newElementStateData
        });
    };

    handleDeselectAllElements = () => {
        const newElementStateData = {...this.state.elementState};
        Object.keys(newElementStateData).forEach(item => {
            newElementStateData[item].selected = false;
        });
        this.setState({
            elementState : newElementStateData
        });
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
        const newElementsData = {...this.state.elements};
        newElementsData[elementID].styles.height = Number(height)*this.state.zoomLevel;
        this.setState(newElementsData); //HOW DOES THIS WORK?
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
            if(this.state.elementState[item].selected) {
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
        const newElementsData = {};
        const newIdsOrder = Object.keys(this.state.elements);
        ids.forEach(id => {
            const arrayPosition = newIdsOrder.indexOf(id);
            newIdsOrder.splice(arrayPosition, 1);
            if(type === "forward") {
                newIdsOrder.splice(arrayPosition+1, 0, id);
            } else if (type === "backward") {
                newIdsOrder.splice(arrayPosition-1, 0, id);
            }
        });
        newIdsOrder.forEach(id => {
            newElementsData[id] = this.state.elements[id];
        });
        this.setState({elements : newElementsData});
    }
    
    handleKeyPress = (e) => {

        if(e.key === "Backspace" && this.state.textEditor === null) {
            this.handleDeleteElements();
        }
        
    }

    updateBoardPosition = (data) => {
        this.setState(data);
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
            cy : 0
        };
    }

    render() {
        const {width, height} = this.props;
        const {offsetX, offsetY, zoomLevel, tool, elements, textEditor} = this.state;
        const zoomedWidth = width*zoomLevel,
        zoomedHeight = height*zoomLevel;
        const viewBox = `${offsetX} ${offsetY} ${zoomedWidth} ${zoomedHeight}`;
        const elementNodes = Object.keys(elements).map(elementID => {
            const element = elements[elementID];
            if(element.type === "circle") {
                return (<circle
                            key={element.id} 
                            {...element.styles}
                            style={{cursor: "pointer"}} 
                    />);
            } else if (element.type === "rect") {
                return (<Rect 
                    key={element.id}
                    data={element}
                    elementState={this.state.elementState[element.id]}
                    handleTextEdit={this.handleTextEdit}
                    handleSetCurrentElement={this.handleSetCurrentElement}
                />);
            } else if (element.type === "text") {
                return (<Text 
                    key={element.id}
                    data={element}
                    elementState={this.state.elementState[element.id]}
                    handleTextEdit={this.handleTextEdit}
                    handleSetCurrentElement={this.handleSetCurrentElement}
                />);
            } else if (element.type === "postit") {
                return (<Postit
                    key={element.id}
                    data={element}
                    elementState={this.state.elementState[element.id]}
                    handleTextEdit={this.handleTextEdit}
                    handleSetCurrentElement={this.handleSetCurrentElement}
                />);
            }
            return null;
        });
        const selectedElements = [],
              selectedElementKeys = [];
        Object.keys(this.state.elementState).forEach(item => {
            if(this.state.elementState[item].selected) {
                selectedElements.push(this.state.elements[item]);
                selectedElementKeys.push(item);
            }
        });
        const boundingBox = this.calculateSelectedElementsBoundingBox(selectedElements, zoomLevel, offsetX, offsetY);
        const gridPosition = {
            backgroundPosition : `${(offsetX*-1)/zoomLevel}px ${(offsetY*-1)/zoomLevel}px`
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
                    updateDragPosition={this.updateDragPosition}
                    dragHandlers={this.state.dragHandlers}
                >
                    <svg id="board" 
                        width={`${width}px`}
                        height={`${height}px`}
                        viewBox={viewBox}
                        onMouseDown={this.handleMouseDown}
                        onMouseMove={this.handleMouseMove}
                        onMouseUp={this.handleMouseUp}
                        >
                        <defs>
                            <filter height="200%" id="shadow1" width="200%" x="-50%" y="-50%">
                                <feGaussianBlur in="SourceGraphic" stdDeviation="20"/>
                            </filter>
                            <filter height="200%" id="shadow2" width="200%" x="-50%" y="-50%">
                                <feGaussianBlur in="SourceGraphic" stdDeviation="10"/>
                            </filter>
                        </defs>
                        <ElementDrag 
                            boundingBox={boundingBox}
                            selectedElementKeys={selectedElementKeys}
                            registerDragHandler={this.registerDragHandler}
                            removeDragHandler={this.removeDragHandler}
                        />
                        {elementNodes}
                    </svg>
                    <Resizer 
                        selectedElements={selectedElements}
                        registerDragHandler={this.registerDragHandler}
                        boundingBox={boundingBox}
                    />
                    <Toolbar 
                        handleToolSelect={this.handleToolSelect} 
                        registerDragHandler={this.registerDragHandler}
                    />
                    <NavBar />
                    <Altimeter zoomLevel={zoomLevel} />
                    <BoardControls
                        elements={this.state.elements}
                        elementState={this.state.elementState}
                        storeUndo={this.state.storeUndo}
                        handleUpdateElementsAndState={this.handleUpdateElementsAndState}
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
                        handleUpdateElementProperty={this.handleUpdateElementProperty}
                        handleDeleteElements={this.handleDeleteElements}
                        handleShiftElementPosition={this.handleShiftElementPosition}
                    />
                </InteractionManager>
            </div>
        );
    }

    componentDidMount(){
        document.addEventListener('keydown', this.handleKeyPress);
        this.registerDragHandler("board", {
            //"dragStartHandler" : this.handlePanStart,
            "dragMoveHandler" : this.handlePanMove,
            "clickHandler" : this.handleDeselectAllElements
        });

        
    }

    componentWillUnmount(){
        document.removeEventListener('keydown', this.handleKeyPress);
    }

    
  }

  export default Board;