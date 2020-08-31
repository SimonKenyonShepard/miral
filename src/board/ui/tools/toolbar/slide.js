import React, {Component} from 'react';
//import Shortid from 'shortid';
import Tool from './tool';

import './styles.css';


class Slide extends Component {

    handleShapeClick(e, dragStartX, dragStartY) {
        alert("Thanks for your click! We are still working on this feature - but now that we know you want it, we will get it done faster!")
        // const currentState = this.state;
        // const newState = {};
        // newState.elements = {...currentState.elements};
        // const newID = Shortid.generate();
        // const width = 120,
        //       height = 120;
        // newState.elements[newID] = {
        //     id : newID,
        //     type : "image",
        //     styles : {
        //         x : (dragStartX*currentState.zoomLevel)+currentState.offsetX-((width/2)*currentState.zoomLevel),
        //         y : (dragStartY*currentState.zoomLevel)+currentState.offsetY-((height/2)*currentState.zoomLevel),
        //         width : width*currentState.zoomLevel,
        //         height: height*currentState.zoomLevel,
        //         fillOpacity: 0,
        //         fill: "#ffffff",
        //         stroke : "#000000",
        //         strokeOpacity : 1,
        //         strokeWidth : 2*currentState.zoomLevel,
        //         strokeDasharray : "0"
        //     },
        //     imgURL : "/miral/icons/insert_photo-noBorder-24px.svg",
        //     initialZoomLevel : currentState.zoomLevel
        // };
        // newState.elementState = {...currentState.elementState};
        // newState.elementState[newID] = {
        //     selected : true
        // };
        // newState.dragStartHandler = null;
        // newState.dragMoveHandler = null;
        // newState.dragEndHandler = null;
        // newState.clickHandler = null;
        // newState.tool = "pan";
        // newState.storeUndo = true;
        // this.removeDragHandler("drawCanvas");
        // this.setState(newState);
    }

    handleShapeDragStart(e, dragStartX, dragStartY, width, height) {
        // const currentState = this.state;
        // const newState = {};
        // newState.elements = {...currentState.elements};
        // const newID = Shortid.generate();
        // newState.elements[newID] = {
        //     id : newID,
        //     type : "image",
        //     styles : {
        //         x : (dragStartX*currentState.zoomLevel)+currentState.offsetX,
        //         y : (dragStartY*currentState.zoomLevel)+currentState.offsetY,
        //         width : width*currentState.zoomLevel,
        //         height: height*currentState.zoomLevel,
        //         fillOpacity: 0,
        //         fill: "#ffffff",
        //         stroke : "#000000",
        //         strokeOpacity : 1,
        //         strokeWidth : 2*currentState.zoomLevel,
        //         strokeDasharray : "0"
        //     },
        //     imgURL : "/miral/icons/insert_photo-noBorder-24px.svg",
        //     initialZoomLevel : currentState.zoomLevel
        // };
        // newState.elementState = {...currentState.elementState};
        // newState.elementState[newID] = {
        //     selected : true
        // };
        // newState.elementBeingDrawn = newID;
        // newState.storeUndo = true;
        // this.setState(newState);
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
           
            <Tool type="slide" 
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

  export default Slide;