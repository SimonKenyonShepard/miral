import React, {Component} from 'react';
import Shortid from 'shortid';
import Tool from './tool';

import {createElementBaseObject} from "./utils";

import './styles.css';


class LineStraightArrow extends Component {

    handleShapeClick(e, dragStartX, dragStartY) {
        const currentState = this.state;
        const newState = {};
        newState.elements = {...currentState.elements};
        const newID = Shortid.generate();
        const presetWidthAndHeight = 120;

        newState.elements[newID] = createElementBaseObject(newID, "line", currentState.zoomLevel);

        const newElement = newState.elements[newID];
        newElement.shapeType = 0;
        newElement.styles.x = (dragStartX*currentState.zoomLevel)+currentState.offsetX;
        newElement.styles.y = (dragStartY*currentState.zoomLevel)+currentState.offsetY-(presetWidthAndHeight*currentState.zoomLevel);
        newElement.styles.width = presetWidthAndHeight*currentState.zoomLevel;
        newElement.styles.height = presetWidthAndHeight*currentState.zoomLevel;
        newElement.styles.markerEnd = "url(#arrow)";

        newState.elementState = {...currentState.elementState};
        newState.elementState[newID] = {
            selected : true
        };
        
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
        const presetWidthAndHeight = 120;

        newState.elements[newID] = createElementBaseObject(newID, "line", currentState.zoomLevel);

        const newElement = newState.elements[newID];
        newElement.shapeType = 0;
        newElement.styles.x = (dragStartX*currentState.zoomLevel)+currentState.offsetX;
        newElement.styles.y = (dragStartY*currentState.zoomLevel)+currentState.offsetY-(presetWidthAndHeight*currentState.zoomLevel);
        newElement.styles.width = presetWidthAndHeight*currentState.zoomLevel;
        newElement.styles.height = presetWidthAndHeight*currentState.zoomLevel;
        newElement.styles.markerEnd = "url(#arrow)";

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
           
            <Tool type="lineStraightArrow" 
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

  export default LineStraightArrow;