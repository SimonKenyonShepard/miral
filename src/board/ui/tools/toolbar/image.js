import React, {Component} from 'react';
import Shortid from 'shortid';
import Tool from './tool';

import {createElementBaseObject} from "./utils";

import './styles.css';


class Image extends Component {

    handleShapeClick(e, dragStartX, dragStartY) {
        const currentState = this.state;
        const newState = {};
        newState.elements = {...currentState.elements};
        const newID = Shortid.generate();
        const presetWidthAndHeight = 120;
        
        newState.elements[newID] = createElementBaseObject(newID, "image", currentState.zoomLevel);
        
        const newElement = newState.elements[newID];
        newElement.styles.x = (dragStartX*currentState.zoomLevel)+currentState.offsetX-((presetWidthAndHeight/2)*currentState.zoomLevel);
        newElement.styles.y = (dragStartY*currentState.zoomLevel)+currentState.offsetY-((presetWidthAndHeight/2)*currentState.zoomLevel);
        newElement.styles.width = presetWidthAndHeight*currentState.zoomLevel;
        newElement.styles.height = presetWidthAndHeight*currentState.zoomLevel;
        newElement.styles.strokeOpacity = 0;
        newElement.URL = "/icons/insert_photo-noBorder-24px.svg";

        newState.elementState = {...currentState.elementState};
        newState.elementState[newID] = {
            selected : currentState.userID
        };
        newState.dragStartHandler = null;
        newState.dragMoveHandler = null;
        newState.dragEndHandler = null;
        newState.clickHandler = null;
        newState.tool = "pan";
        newState.storeUndo = true;
        this.removeDragHandler("drawCanvas");
        this.setState(newState);
    }

    handleShapeDragStart(e, dragStartX, dragStartY, width, height) {
        const currentState = this.state;
        const newState = {};
        newState.elements = {...currentState.elements};
        const newID = Shortid.generate();
        newState.elements[newID] = createElementBaseObject(newID, "image", currentState.zoomLevel);
        
        const newElement = newState.elements[newID];
        newElement.styles.x = (dragStartX*currentState.zoomLevel)+currentState.offsetX;
        newElement.styles.y = (dragStartY*currentState.zoomLevel)+currentState.offsetY;
        newElement.styles.width = width*currentState.zoomLevel;
        newElement.styles.height = height*currentState.zoomLevel;
        newElement.styles.strokeOpacity = 0;
        newElement.URL = "/icons/insert_photo-noBorder-24px.svg";

        newState.elementState = {...currentState.elementState};
        newState.elementState[newID] = {
            selected : currentState.userID
        };
        newState.elementBeingDrawn = newID;
        newState.storeUndo = true;
        this.setState(newState);
    }
  
    render() {
        const {
            handleDeselectAllElements,
            handleDrawCanvasShow,
            registerDragHandler,
            handleDragMove,
            handleDragEnd,
            autoActivate,
            currentSelectedTool
        } = this.props;


        return (
           
            <Tool type="image" 
                handleDeselectAllElements={handleDeselectAllElements}
                currentSelectedTool={currentSelectedTool}
                handleDrawCanvasShow={handleDrawCanvasShow}
                registerDragHandler={registerDragHandler}
                handleClick={this.handleShapeClick}
                handleDragStart={this.handleShapeDragStart}
                handleDragMove={handleDragMove}
                handleDragEnd={handleDragEnd}
                autoActivate={autoActivate}
            />
                   
        );
    }
    
  }

  export default Image;