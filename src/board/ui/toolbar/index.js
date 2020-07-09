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
                fillOpacity: "0",
                stroke : "black",
                strokeWidth : 2*currentState.zoomLevel
            },
            text : "",
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
                width : 8*currentState.zoomLevel,
                height: (24*1.4)*currentState.zoomLevel,
                fillOpacity: "0",
                stroke : "transparent",
                strokeWidth : 2*currentState.zoomLevel
            },
            text : "",
        };
        newState.elementState = {...currentState.elementState};
        newState.elementState[newID] = {
            selected : true
        };
        newState.currentElement = newID;
        return newState;
    }

    handleTextDragMove = (e, currentState) => {
        const newState = {};
        if(currentState.currentElement !== null) {
            const newElementGraph = {...currentState.elements};
            newElementGraph[currentState.currentElement].styles.width = (e.clientX-currentState.dragStartX)*currentState.zoomLevel;
            newState.elements = newElementGraph;
        }
        
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

    handlePostit_squareDragStart = (e, currentState) => {
        const newState = {};
        newState.elements = {...currentState.elements};
        const newID = Shortid.generate();
        newState.elements[newID] = {
            id : newID,
            type : "postit_square",
            fixedRatio : "true",
            styles : {
                x : (e.clientX*currentState.zoomLevel)+currentState.offsetX,
                y : (e.clientY*currentState.zoomLevel)+currentState.offsetY,
                width : 128*currentState.zoomLevel,
                height: 128*currentState.zoomLevel,
                fillOpacity: "0",
                strokeWidth : 2*currentState.zoomLevel
            },
            text : "",
        };
        newState.elementState = {...currentState.elementState};
        newState.elementState[newID] = {};
        newState.currentElement = newID;
        return newState;
    }

    handlePostit_squareDragEnd = (e, currentState) => {
        const newState = {};
        newState.dragStartHandler = null;
        newState.dragMoveHandler = null;
        newState.dragEndHandler = null;
        if(currentState.currentElement !== null) {
            newState.elementState = {...currentState.elementState};
            newState.elementState[currentState.currentElement].drawn = true;
            let min = 0,
                max = 5;
            //newState.elementState[currentState.currentElement].shapeType = Math.random() * (max - min) + min;
            newState.elementState[currentState.currentElement].shapeType = 1;
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
                    handleDragStart={this.handlePostit_squareDragStart}
                    handleDragMove={this.handlePostit_squareDragMove}
                    handleDragEnd={this.handlePostit_squareDragEnd}
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