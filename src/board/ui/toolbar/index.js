import React, {Component} from 'react';
import Shortid from 'shortid';

import './styles.css';

class Tool extends Component {

  
    handleToolSelect = (e) => {
        this.props.handleToolSelect(this.props.type);
        this.props.handleSetDragHandler({
            "dragStartHandler" : this.props.handleDragStart,
            "dragMoveHandler" : this.props.handleDragMove,
            "dragEndHandler" : this.props.handleDragEnd
        });
    }

  
    render() {
        return (
            <span 
                className={`toolbar_tool toolbar_${this.props.type}`}
                onClick={this.handleToolSelect}
            />
        );
    }
    
  }


class Toolbar extends Component {

    handleShapeDragStart = (e, currentState) => {
        const newState = {};
        newState.elements = {...currentState.elements};
        const newID = Shortid.generate();
        newState.elements[newID] = {
            id : newID,
            type : "rect",
            styles : {
                x : (e.clientX*currentState.zoomLevel)+currentState.offsetX,
                y : (e.clientY*currentState.zoomLevel)+currentState.offsetY,
                width : 8*currentState.zoomLevel,
                height: 8*currentState.zoomLevel,
                fillOpacity: 0,
                fill: "#ffffff",
                stroke : "#000000",
                strokeOpacity : 1,
                strokeWidth : 2*currentState.zoomLevel,
                strokeDasharray : "0"
            },
            fontStyle : {
                fontFamily : "",
                fontWeight : "normal",
                fontStyle : "normal",
                textDecorationLine : "",
                color : "#080808",
                textAlign: "center" 
            },
            text : "",
            initialZoomLevel : currentState.zoomLevel
        };
        newState.elementState = {...currentState.elementState};
        newState.elementState[newID] = {};
        newState.currentElement = newID;
        return newState;
    }

    handleShapeDragMove = (e, currentState) => {
        const newState = {};
        if(currentState.currentElement !== null) {
            const newElementGraph = {...currentState.elements};
            newElementGraph[currentState.currentElement].styles.width = (e.clientX-currentState.dragStartX)*currentState.zoomLevel;
            newElementGraph[currentState.currentElement].styles.height = (e.clientY-currentState.dragStartY)*currentState.zoomLevel;
            newState.elements = newElementGraph;
        }
        
        return newState;
    }

    handleShapeDragEnd = (e, currentState) => {
        const newState = {};
        newState.dragStartHandler = null;
        newState.dragMoveHandler = null;
        newState.dragEndHandler = null;
        if(currentState.currentElement !== null) {
            newState.elementState = {...currentState.elementState};
            newState.elementState[currentState.currentElement].drawn = true;
            newState.tool = "pan";
        }
        return newState;
    }

    handleTextDragStart = (e, currentState) => {
        const newState = {};
        newState.elements = {...currentState.elements};
        const newID = Shortid.generate();
        newState.elements[newID] = {
            id : newID,
            type : "text",
            styles : {
                x : (e.clientX*currentState.zoomLevel)+currentState.offsetX,
                y : (e.clientY*currentState.zoomLevel)+currentState.offsetY,
                width : 240*currentState.zoomLevel,
                height: (24*1.4)*currentState.zoomLevel,
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
        newState.currentElement = newID;
        return newState;
    }

  

    handleTextDragEnd = (e, currentState) => {
        const newState = {};
        newState.dragStartHandler = null;
        newState.dragMoveHandler = null;
        newState.dragEndHandler = null;
        if(currentState.currentElement !== null) {
            newState.elementState = {...currentState.elementState};
            newState.elementState[currentState.currentElement].drawn = true;
            newState.tool = "pan";
        }
        return newState;
    }

    handlePostitDragStart = (e, currentState) => {
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
        newState.currentElement = newID;
        newState.storeUndo = true;
        return newState;
    }

    handlePostitDragEnd = (e, currentState) => {
        const newState = {};
        newState.dragStartHandler = null;
        newState.dragMoveHandler = null;
        newState.dragEndHandler = null;
        if(currentState.currentElement !== null) {
            newState.elementState = {...currentState.elementState};
            newState.elementState[currentState.currentElement].drawn = true;
            newState.tool = "pan";
        }
        return newState;
    }
  
    render() {
        const {handleToolSelect} = this.props;
        return (
            <div className="toolbar">
                <Tool type="pan" handleToolSelect={handleToolSelect}/>
                <Tool type="postit" 
                    handleToolSelect={handleToolSelect}
                    handleSetDragHandler={this.props.handleSetDragHandler}
                    handleDragStart={this.handlePostitDragStart}
                    handleDragMove={this.handlePostitDragMove}
                    handleDragEnd={this.handlePostitDragEnd}
                />
                <Tool type="text" 
                    handleToolSelect={handleToolSelect}
                    handleSetDragHandler={this.props.handleSetDragHandler}
                    handleDragStart={this.handleTextDragStart}
                    handleDragMove={this.handleTextDragMove}
                    handleDragEnd={this.handleTextDragEnd}
                />
                <Tool type="shape" 
                    handleToolSelect={handleToolSelect}
                    handleSetDragHandler={this.props.handleSetDragHandler}
                    handleDragStart={this.handleShapeDragStart}
                    handleDragMove={this.handleShapeDragMove}
                    handleDragEnd={this.handleShapeDragEnd} 
                />
                <Tool type="pen" handleToolSelect={handleToolSelect}/>
                <Tool type="image" handleToolSelect={handleToolSelect}/>
                <Tool type="more" handleToolSelect={handleToolSelect}/>
            </div>
        );
    }
    
  }

  export default Toolbar;