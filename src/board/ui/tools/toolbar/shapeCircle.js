import React, {Component} from 'react';
import Shortid from 'shortid';
import Tool from './tool';

import {createElementBaseObject} from "./utils";

import './styles.css';


class ShapeCircle extends Component {

    handleShapeClick(e, dragStartX, dragStartY) {
        const currentState = this.state;
        const newState = {};
        newState.elements = {...currentState.elements};
        const newID = Shortid.generate();
        const presetWidth = 120;

        newState.elements[newID] = createElementBaseObject(newID, "shape", currentState.zoomLevel);
        
        const newElement = newState.elements[newID];
        newElement.shapeType = 1;
        newElement.fixedRatio = "true";
        newElement.styles.x = (dragStartX*currentState.zoomLevel)+currentState.offsetX-((presetWidth/2)*currentState.zoomLevel);
        newElement.styles.y = (dragStartY*currentState.zoomLevel)+currentState.offsetY-((presetWidth/2)*currentState.zoomLevel);
        newElement.styles.width = presetWidth*currentState.zoomLevel;
        newElement.styles.height = presetWidth*currentState.zoomLevel;

        newState.elementState = {...currentState.elementState};
        newState.elementState[newID] = {
            selected : true
        };
       
        newState.tool = "pan";
        newState.storeUndo = true;
        this.removeDragHandler("drawCanvas");
        this.setState(newState);
    }

    handleShapeDragStart(e, dragStartX, dragStartY, width) {
        const currentState = this.state;
        const newState = {};
        newState.elements = {...currentState.elements};
        const newID = Shortid.generate();

        newState.elements[newID] = createElementBaseObject(newID, "shape", currentState.zoomLevel);
        
        const newElement = newState.elements[newID];
        newElement.shapeType = 1;
        newElement.fixedRatio = "true";
        newElement.styles.x = (dragStartX*currentState.zoomLevel)+currentState.offsetX;
        newElement.styles.y = (dragStartY*currentState.zoomLevel)+currentState.offsetY;
        newElement.styles.width = width*currentState.zoomLevel;
        newElement.styles.height = width*currentState.zoomLevel;

        newState.elementState = {...currentState.elementState};
        newState.elementState[newID] = {
            selected : true
        };
        newState.elementBeingDrawn = newID;
        newState.storeUndo = true;
        this.setState(newState);
    }
  
    render() {
        const {
            handleToolSelect,
            handleDrawCanvasShow,
            registerDragHandler,
            handleDragMove,
            handleDragEnd,
            autoActivate,
            currentSelectedTool
        } = this.props;

        return (
           
            <Tool type="shapeCircle" 
                handleToolSelect={handleToolSelect}
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

  export default ShapeCircle;