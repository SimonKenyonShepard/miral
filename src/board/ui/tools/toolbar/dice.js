import React, {Component} from 'react';
import Shortid from 'shortid';
import Tool from './tool';

import {createElementBaseObject} from "./utils";

import './styles.css';


class Dice extends Component {

    handleSlideClick(e, dragStartX, dragStartY) {
        const currentState = this.state;
        const newState = {};
        newState.elements = {...currentState.elements};
        const newID = Shortid.generate();
        const height = 40,
              width = 40;
        
        newState.elements[newID] = createElementBaseObject(newID, "dice", currentState.zoomLevel);
        
        const newElement = newState.elements[newID];
        newElement.styles.x = (dragStartX*currentState.zoomLevel)+currentState.offsetX-((height/2)*currentState.zoomLevel);
        newElement.styles.y = (dragStartY*currentState.zoomLevel)+currentState.offsetY-((width/2)*currentState.zoomLevel);
        newElement.styles.width = width*currentState.zoomLevel;
        newElement.styles.height = height*currentState.zoomLevel;
        newElement.styles.strokeOpacity = 0;
        newElement.styles.fill = "#666";

        newElement.fixedRatio = "true";

        const randomNumber = Math.random();
        const randomDiceNumber = Math.floor(randomNumber * (5 - 0 + 1)) + 0;
        newElement.diceNumber = randomDiceNumber;

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

    handleSlideDragStart(e, dragStartX, dragStartY, width, height) {
        const currentState = this.state;
        const newState = {};
        newState.elements = {...currentState.elements};
        const newID = Shortid.generate();
        newState.elements[newID] = createElementBaseObject(newID, "dice", currentState.zoomLevel);
        
        const newElement = newState.elements[newID];
        newElement.styles.x = (dragStartX*currentState.zoomLevel)+currentState.offsetX;
        newElement.styles.y = (dragStartY*currentState.zoomLevel)+currentState.offsetY;
        newElement.styles.width = width*currentState.zoomLevel;
        newElement.styles.height = height*currentState.zoomLevel;
        newElement.styles.strokeOpacity = 0;
        newElement.styles.fill = "#666";

        newElement.fixedRatio = "true";

        const randomNumber = Math.random();
        const randomDiceNumber = Math.floor(randomNumber * (5 - 0 + 1)) + 0;
        newElement.diceNumber = randomDiceNumber;

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
           
            <Tool type="dice" 
                handleDeselectAllElements={handleDeselectAllElements}
                currentSelectedTool={currentSelectedTool}
                handleDrawCanvasShow={handleDrawCanvasShow}
                registerDragHandler={registerDragHandler}
                handleClick={this.handleSlideClick}
                handleDragStart={this.handleSlideDragStart}
                handleDragMove={handleDragMove}
                handleDragEnd={handleDragEnd}
                autoActivate={autoActivate}
            />
                   
        );
    }
    
  }

  export default Dice;