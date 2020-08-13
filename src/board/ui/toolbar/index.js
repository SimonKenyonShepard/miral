import React, {Component} from 'react';
import Shortid from 'shortid';

import './styles.css';

class Tool extends Component {

  
    handleToolSelect = (e) => {
        this.props.handleToolSelect(this.props.type);
        this.props.handleSetDragHandler({
            "dragStartHandler" : this.props.handleDragStart,
            "dragMoveHandler" : this.props.handleDragMove,
            "dragEndHandler" : this.props.handleDragEnd,
            "clickHandler" : this.props.handleClick
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

    handleShapeClick(e, dragStartX, dragStartY) {
        const currentState = this.state;
        const newState = {};
        newState.elements = {...currentState.elements};
        const newID = Shortid.generate();
        newState.elements[newID] = {
            id : newID,
            type : "rect",
            styles : {
                x : (dragStartX*currentState.zoomLevel)+currentState.offsetX,
                y : (dragStartY*currentState.zoomLevel)+currentState.offsetY,
                width : 240*currentState.zoomLevel,
                height: 120*currentState.zoomLevel,
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
        newState.dragStartHandler = null;
        newState.dragMoveHandler = null;
        newState.dragEndHandler = null;
        newState.clickHandler = null;
        newState.tool = "pan";
        newState.storeUndo = true;
        this.setState(newState);
    }

    handleShapeDragStart(e, dragStartX, dragStartY, width, height) {
        const currentState = this.state;
        const newState = {};
        newState.elements = {...currentState.elements};
        const newID = Shortid.generate();
        newState.elements[newID] = {
            id : newID,
            type : "rect",
            styles : {
                x : (dragStartX*currentState.zoomLevel)+currentState.offsetX,
                y : (dragStartY*currentState.zoomLevel)+currentState.offsetY,
                width : width*currentState.zoomLevel,
                height: height*currentState.zoomLevel,
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
        newState.elementBeingDrawn = newID;
        newState.storeUndo = true;
        this.setState(newState);
    }

    handleDragMove(e) {
        const currentState = this.state;
        const newState = {};
        if(currentState.elementBeingDrawn !== null) {
            const newElementGraph = {...currentState.elements};
            newElementGraph[currentState.elementBeingDrawn].styles.width += e.movementX*currentState.zoomLevel;
            newElementGraph[currentState.elementBeingDrawn].styles.height += e.movementY*currentState.zoomLevel;
            newState.elements = newElementGraph;
        }
        this.setState(newState);
    }

    handleDragEnd() {
        const newState = {};
        newState.dragStartHandler = null;
        newState.dragMoveHandler = null;
        newState.dragEndHandler = null;
        newState.clickHandler = null;
        newState.tool = "pan";
        this.setState(newState);
    }

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
        const {handleToolSelect} = this.props;
        return (
            <div className="toolbar">
                <Tool type="pan" handleToolSelect={handleToolSelect}/>
                <Tool type="postit" 
                    handleToolSelect={handleToolSelect}
                    handleSetDragHandler={this.props.handleSetDragHandler}
                    handleClick={this.handlePostitClick}
                    handleDragStart={this.handlePostitDragStart}
                    handleDragMove={this.handleDragMove}
                    handleDragEnd={this.handleDragEnd}
                />
                <Tool type="text" 
                    handleToolSelect={handleToolSelect}
                    handleSetDragHandler={this.props.handleSetDragHandler}
                    handleClick={this.handleTextClick}
                    handleDragStart={this.handleTextDragStart}
                    handleDragMove={this.handleDragMove}
                    handleDragEnd={this.handleDragEnd}
                />
                <Tool type="shape" 
                    handleToolSelect={handleToolSelect}
                    handleSetDragHandler={this.props.handleSetDragHandler}
                    handleClick={this.handleShapeClick}
                    handleDragStart={this.handleShapeDragStart}
                    handleDragMove={this.handleDragMove}
                    handleDragEnd={this.handleDragEnd} 
                />
                <Tool type="pen" handleToolSelect={handleToolSelect}/>
                <Tool type="image" handleToolSelect={handleToolSelect}/>
                <Tool type="more" handleToolSelect={handleToolSelect}/>
            </div>
        );
    }
    
  }

  export default Toolbar;