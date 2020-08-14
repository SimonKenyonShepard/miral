import React, {Component} from 'react';
//UI
import Toolbar from './ui/toolbar';
import Altimeter from './ui/altimeter';
import TextEditor from './ui/textEditor';
import ElementEditor from './ui/elementEditor';
import Resizer from './ui/resizer';
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

    updateDragPosition = (data) => {
        const {
            offsetX,
            offsetY,
            zoomLevel,
            tool
        } = this.state;

        const newElementsData = {...this.state.elements};
        const selectedItems = Object.keys(this.state.elementState).filter(item => {
            if(this.state.elementState[item].selected) {
                return true;
            }
            return false;
        });
        if(selectedItems.length) {
            selectedItems.forEach(element => {
                newElementsData[element].styles.x += data.x*this.state.zoomLevel;
                newElementsData[element].styles.y += data.y*this.state.zoomLevel;
            });
            this.setState({
                elements : newElementsData
            });
        } else if(tool === "pan") {
            this.setState({
                offsetX : offsetX + (data.x*-zoomLevel),
                offsetY : offsetY + (data.y*-zoomLevel)
            });
        }
    }

    handleSetCurrentElement = (elementID, selected, isMultiSelect) => {
        const newElementStateData = {...this.state.elementState};
        if(!isMultiSelect) {
            Object.keys(newElementStateData).forEach(item => {
                newElementStateData[item].selected = false;
            });
        }
        newElementStateData[elementID].selected = selected;
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

        if(e.key === "Backspace") {
            this.handleDeleteElements();
        }
        
    }

    handleUpdateBoardPosition = (data) => {
        this.setState(data);
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
        const selectedElements = [];
        Object.keys(this.state.elementState).forEach(item => {
            if(this.state.elementState[item].selected) {
                selectedElements.push(this.state.elements[item]);
            }
        });
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
                     <Toolbar 
                        handleToolSelect={this.handleToolSelect} 
                        registerDragHandler={this.registerDragHandler}
                    />
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
                        {elementNodes}
                        <Resizer 
                            selectedElements={selectedElements}
                            registerDragHandler={this.registerDragHandler}
                        />
                    </svg>
                </InteractionManager>
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
            </div>
        );
    }

    componentDidMount(){
        document.addEventListener('keydown', this.handleKeyPress);
        setTimeout(() => {
            this.registerDragHandler("board", {
                "clickHandler" : this.handleDeselectAllElements
            });
        })
        
    }

    componentWillUnmount(){
        document.removeEventListener('keydown', this.handleKeyPress);
    }

    
  }

  export default Board;