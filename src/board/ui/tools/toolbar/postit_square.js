import React, {Component} from 'react';
import Shortid from 'shortid';
import Tool from './tool';

import {createElementBaseObject} from "./utils";

import './styles.css';


class PostitSquare extends Component {

    handlePostitClick(e, dragStartX, dragStartY) {
        const currentState = this.state;
        const newState = {};
        newState.elements = {...currentState.elements};
        const newID = Shortid.generate();
        const widthAndHeight = 128;

        newState.elements[newID] = createElementBaseObject(newID, "postit", currentState.zoomLevel);
        
        const newElement = newState.elements[newID];
        newElement.subType = "square";
        newElement.fixedRatio = "true";
        newElement.predefinedColor = 3;
        newElement.fontSizeAuto = true;
        
        newElement.styles.x = (dragStartX*currentState.zoomLevel)+currentState.offsetX-((widthAndHeight/2)*currentState.zoomLevel);
        newElement.styles.y = (dragStartY*currentState.zoomLevel)+currentState.offsetY-((widthAndHeight/2)*currentState.zoomLevel);
        newElement.styles.width = widthAndHeight*currentState.zoomLevel;
        newElement.styles.height = widthAndHeight*currentState.zoomLevel;
        newElement.styles.strokeOpacity = 0;

        newState.elementState = {...currentState.elementState};
        newState.elementState[newID] = {
            selected : currentState.userID
        };
        let min = 0,
            max = 3;
        newState.elementState[newID].shapeType = Math.floor(Math.random() * (max - min + 1)) + min;
       
        newState.tool = "pan";
        newState.storeUndo = true;
        this.removeDragHandler("drawCanvas");
        this.setState(newState);
    }

    handlePostitDragStart(e, dragStartX, dragStartY) {
        const currentState = this.state;
        const newState = {};
        newState.elements = {...currentState.elements};
        const newID = Shortid.generate();

        const widthAndHeight = 128;

        newState.elements[newID] = createElementBaseObject(newID, "postit", currentState.zoomLevel);
        
        const newElement = newState.elements[newID];
        newElement.subType = "square";
        newElement.fixedRatio = "true";
        newElement.predefinedColor = 3;
        newElement.fontSizeAuto = true;
        
        newElement.styles.x = (dragStartX*currentState.zoomLevel)+currentState.offsetX-(widthAndHeight*currentState.zoomLevel);
        newElement.styles.y = (dragStartY*currentState.zoomLevel)+currentState.offsetY-(widthAndHeight*currentState.zoomLevel);
        newElement.styles.width = widthAndHeight*currentState.zoomLevel;
        newElement.styles.height = widthAndHeight*currentState.zoomLevel;
        newElement.styles.strokeOpacity = 0;

        newState.elementState = {...currentState.elementState};
        newState.elementState[newID] = {
            selected : currentState.userID
        };
        let min = 0,
            max = 3;
        newState.elementState[newID].shapeType = Math.floor(Math.random() * (max - min + 1)) + min;
        newState.storeUndo = true;
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
            currentSelectedTool,
            autoActivate
        } = this.props;

        return (
            <Tool type="postitSquare" 
                handleDeselectAllElements={handleDeselectAllElements}
                handleDrawCanvasShow={handleDrawCanvasShow}
                registerDragHandler={registerDragHandler}
                handleClick={this.handlePostitClick}
                handleDragStart={this.handlePostitDragStart}
                handleDragMove={handleDragMove}
                handleDragEnd={handleDragEnd}
                currentSelectedTool={currentSelectedTool}
                autoActivate={autoActivate}
            />    
        );
    }
    
  }

  export default PostitSquare;