import React, {Component} from 'react';
import Shortid from 'shortid';
import Tool from './tool';

import {createElementBaseObject} from "./utils";

import './styles.css';

class Text extends Component {

    handleTextClick(e, dragStartX, dragStartY) {
        const currentState = this.state;
        const newState = {};
        newState.elements = {...currentState.elements};
        const newID = Shortid.generate();

        const presetWidth = 240,
              fontSize = 24,
              lineHeight = 1.4,
              presetHeight = fontSize*lineHeight;

        newState.elements[newID] = createElementBaseObject(newID, "text", currentState.zoomLevel);

        const newElement = newState.elements[newID];
        newElement.styles.x = (dragStartX*currentState.zoomLevel)+currentState.offsetX-((presetWidth/2)*currentState.zoomLevel);
        newElement.styles.y = (dragStartY*currentState.zoomLevel)+currentState.offsetY-((presetHeight/2)*currentState.zoomLevel);
        newElement.styles.width = presetWidth*currentState.zoomLevel;
        newElement.styles.height = presetHeight*currentState.zoomLevel;
        newElement.styles.strokeOpacity = 0;
        
        newState.elementState = {...currentState.elementState};
        newState.elementState[newID] = {
            selected : currentState.userID
        };
        
        newState.tool = "pan";
        this.removeDragHandler("drawCanvas");
        this.setState(newState);
    }

    handleTextDragStart(e, dragStartX, dragStartY, width, height) {
        const currentState = this.state;
        const newState = {};
        newState.elements = {...currentState.elements};
        const newID = Shortid.generate();

        newState.elements[newID] = createElementBaseObject(newID, "text", currentState.zoomLevel);

        const newElement = newState.elements[newID];
        newElement.styles.x = (dragStartX*currentState.zoomLevel)+currentState.offsetX-((width/2)*currentState.zoomLevel);
        newElement.styles.y = (dragStartY*currentState.zoomLevel)+currentState.offsetY-((height/2)*currentState.zoomLevel);
        newElement.styles.width = width*currentState.zoomLevel;
        newElement.styles.height = height*currentState.zoomLevel;
        newElement.styles.strokeOpacity = 0;

        newState.elementState = {...currentState.elementState};
        newState.elementState[newID] = {
            selected : currentState.userID
        };
        newState.elementBeingDrawn = newID;
        this.setState(newState);
    }
  
    render() {
        const {
            handleDeselectAllElements,
            handleDrawCanvasShow,
            registerDragHandler,
            handleDragMove,
            handleDragEnd,
            currentSelectedTool
        } = this.props;
       
        return (
            <Tool type="text" 
                handleDeselectAllElements={handleDeselectAllElements}
                handleDrawCanvasShow={handleDrawCanvasShow}
                registerDragHandler={registerDragHandler}
                handleClick={this.handleTextClick}
                handleDragStart={this.handleTextDragStart}
                handleDragMove={handleDragMove}
                handleDragEnd={handleDragEnd} 
                currentSelectedTool={currentSelectedTool}
            />
        );
    }
    
  }

  export default Text;