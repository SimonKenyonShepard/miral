import React, {Component} from 'react';
import Shortid from 'shortid';
import Tool from './tool';

import './styles.css';


class Postit extends Component {

    handlePostitClick(e) {
        const currentState = this.state;
        const newState = {};
        newState.elements = {...currentState.elements};
        const newID = Shortid.generate();
        newState.elements[newID] = {
            id : newID,
            type : "postit",
            subType : "square",
            fixedRatio : "true",
            predefinedColor : 3,
            styles : {
                x : (e.clientX*currentState.zoomLevel)+currentState.offsetX,
                y : (e.clientY*currentState.zoomLevel)+currentState.offsetY,
                width : 128*currentState.zoomLevel,
                height: 128*currentState.zoomLevel,
                fillOpacity: 0,
                strokeWidth : 2*currentState.zoomLevel
            },
            fontStyle : {
                fontSize : 24*currentState.zoomLevel,
                fontWeight : "normal",
                fontStyle : "normal",
                textDecorationLine : "",
                color : "#080808",
                textAlign: "center" 
            },
            text : "",
        };
        newState.elementState = {...currentState.elementState};
        newState.elementState[newID] = {};
        let min = 0,
            max = 3;
        newState.elementState[newID].shapeType = Math.floor(Math.random() * (max - min + 1)) + min;
        newState.dragStartHandler = null;
        newState.dragMoveHandler = null;
        newState.dragEndHandler = null;
        newState.clickHandler = null;
        newState.tool = "pan";
        newState.storeUndo = true;
        this.removeDragHandler("drawCanvas");
        this.setState(newState);
    }

    handlePostitDragStart(e) {
        const currentState = this.state;
        const newState = {};
        newState.elements = {...currentState.elements};
        const newID = Shortid.generate();
        newState.elements[newID] = {
            id : newID,
            type : "postit",
            subType : "square",
            fixedRatio : "true",
            predefinedColor : 3,
            styles : {
                x : (e.clientX*currentState.zoomLevel)+currentState.offsetX,
                y : (e.clientY*currentState.zoomLevel)+currentState.offsetY,
                width : 128*currentState.zoomLevel,
                height: 128*currentState.zoomLevel,
                fillOpacity: 0,
                strokeWidth : 2*currentState.zoomLevel
            },
            fontStyle : {
                fontWeight : "normal",
                fontStyle : "normal",
                textDecorationLine : "",
                color : "#080808",
                textAlign: "center" 
            },
            text : "",
        };
        newState.elementState = {...currentState.elementState};
        newState.elementState[newID] = {};
        let min = 0,
            max = 3;
        newState.elementState[newID].shapeType = Math.floor(Math.random() * (max - min + 1)) + min;
        newState.storeUndo = true;
        newState.elementBeingDrawn = newID;
        this.setState(newState);
    }
  
    render() {
        const {
            handleToolSelect,
            handleDrawCanvasShow,
            registerDragHandler,
            handleDragMove,
            handleDragEnd
        } = this.props;

        return (
            <Tool type="postit" 
                handleToolSelect={handleToolSelect}
                handleDrawCanvasShow={handleDrawCanvasShow}
                registerDragHandler={registerDragHandler}
                handleClick={this.handlePostitClick}
                handleDragStart={this.handlePostitDragStart}
                handleDragMove={handleDragMove}
                handleDragEnd={handleDragEnd}
            />    
        );
    }
    
  }

  export default Postit;