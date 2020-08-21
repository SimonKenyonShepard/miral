import React, {Component} from 'react';
import Shortid from 'shortid';
import Tool from './tool';

import './styles.css';


class Text extends Component {

    handleTextClick(e, dragStartX, dragStartY) {
        const currentState = this.state;
        const newState = {};
        newState.elements = {...currentState.elements};
        const newID = Shortid.generate();
        newState.elements[newID] = {
            id : newID,
            type : "text",
            styles : {
                x : (dragStartX*currentState.zoomLevel)+currentState.offsetX,
                y : (dragStartY*currentState.zoomLevel)+currentState.offsetY,
                width : 240*currentState.zoomLevel,
                height: (24*1.4)*currentState.zoomLevel,
                fillOpacity: 0,
                fill: "#ffffff",
                stroke : "#000000",
                strokeOpacity : 0,
                strokeWidth : 2*currentState.zoomLevel
            },
            fontStyle : {
                fontSize : 24*currentState.zoomLevel,
                fontFamily : "",
                fontWeight : "normal",
                fontStyle : "normal",
                textDecorationLine : "",
                color : "#080808",
                textAlign: "center"
            },
            text : ""
        };
        newState.elementState = {...currentState.elementState};
        newState.elementState[newID] = {
            selected : true
        };
        newState.dragStartHandler = null;
        newState.dragMoveHandler = null;
        newState.dragEndHandler = null;
        newState.clickHandler = null;
        newState.tool = "pan";
        this.removeDragHandler("drawCanvas");
        this.setState(newState);
    }

    handleTextDragStart(e, dragStartX, dragStartY, width, height) {
        const currentState = this.state;
        const newState = {};
        newState.elements = {...currentState.elements};
        const newID = Shortid.generate();
        newState.elements[newID] = {
            id : newID,
            type : "text",
            styles : {
                x : (dragStartX*currentState.zoomLevel)+currentState.offsetX,
                y : (dragStartY*currentState.zoomLevel)+currentState.offsetY,
                width : width*currentState.zoomLevel,
                height: height*currentState.zoomLevel,
                fillOpacity: 0,
                fill: "#ffffff",
                stroke : "#000000",
                strokeOpacity : 0,
                strokeWidth : 2*currentState.zoomLevel
            },
            fontStyle : {
                fontFamily : "",
                fontWeight : "normal",
                fontStyle : "normal",
                textDecorationLine : "",
                color : "#080808",
                textAlign: "center"
            },
            text : ""
        };
        newState.elementState = {...currentState.elementState};
        newState.elementState[newID] = {
            selected : true
        };
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
            <Tool type="text" 
                handleToolSelect={handleToolSelect}
                handleDrawCanvasShow={handleDrawCanvasShow}
                registerDragHandler={registerDragHandler}
                handleClick={this.handleTextClick}
                handleDragStart={this.handleTextDragStart}
                handleDragMove={handleDragMove}
                handleDragEnd={handleDragEnd} 
            />
        );
    }
    
  }

  export default Text;