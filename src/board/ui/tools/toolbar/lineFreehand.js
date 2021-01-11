import React, {Component} from 'react';
import Shortid from 'shortid';
import Tool from './tool';

import {createElementBaseObject} from "./utils";

import './styles.css';


class Shape extends Component {

    handleShapeDragStart(e, dragStartX, dragStartY, width, height) {
        const currentState = this.state;
        const newState = {};
        newState.elements = {...currentState.elements};
        const newID = Shortid.generate();
        const currentX = (dragStartX*currentState.zoomLevel)+currentState.offsetX,
              currentY = (dragStartY*currentState.zoomLevel)+currentState.offsetY;

        newState.elements[newID] = createElementBaseObject(newID, "line", currentState.zoomLevel);

        const newElement = newState.elements[newID];
        newElement.shapeType = 2;
        newElement.styles.x = currentX;
        newElement.styles.y = currentY;
        newElement.styles.width = width*currentState.zoomLevel;
        newElement.styles.height = height*currentState.zoomLevel;
        newElement.styles.strokeWidth = currentState.zoomLevel;
        newElement.styles.d = "";

        newState.elementState = {...currentState.elementState};
        newState.elementState[newID] = {
            selected : currentState.userID,
            pathBuffer : [],
            smoothingLevel : 8,
            currentPath : `M ${currentX} ${currentY}`
        };
        newState.elementBeingDrawn = newID;
        newState.storeUndo = true;
        this.setState(newState);
    }

    handleDragMove(e) {

        var getUpdatedPointsBuffer = function(e, currentState, newElementState) {
            const {
                zoomLevel,
                offsetX,
                offsetY,
                elementBeingDrawn
            } = currentState;
    
            const currentElementState = newElementState[elementBeingDrawn];
    
            const x = (e.clientX*zoomLevel)+offsetX,
                  y = (e.clientY*zoomLevel)+offsetY;
    
            currentElementState.pathBuffer.push({ x, y });
    
            while (currentElementState.pathBuffer.length > currentElementState.smoothingLevel) {
                currentElementState.pathBuffer.shift();
            }
            return newElementState;
        }
    
        var getUpdatedSvgPath = function(currentPath, buffer, smoothingLevel) {
            var pt = getAveragePoint(0, buffer, smoothingLevel);
            var tmpPath = "";
        
            if (pt) {
                // Get the smoothed part of the path that will not change
                currentPath += " L" + pt.x + " " + pt.y;
        
                // Get the last part of the path (close to the current mouse position)
                // This part will change if the mouse moves again
                
                for (var offset = 2; offset < buffer.length; offset += 2) {
                    pt = getAveragePoint(offset, buffer, smoothingLevel);
                    tmpPath += " L" + pt.x + " " + pt.y;
                }
            }
            return {
                currentPath,
                tmpPath
            };
        };
    
        var getAveragePoint = function(offset, buffer, smoothingLevel) {
            var len = buffer.length;
            if (len % 2 === 1 || len >= smoothingLevel) {
                var totalX = 0;
                var totalY = 0;
                var pt, i;
                var count = 0;
                for (i = offset; i < len; i++) {
                    count++;
                    pt = buffer[i];
                    totalX += pt.x;
                    totalY += pt.y;
                }
                return {
                    x: totalX / count,
                    y: totalY / count
                }
            }
            return null;
        };

        const currentState = this.state;
        const newState = {};
        if(currentState.elementBeingDrawn !== null) {
            const newElementGraph = {...currentState.elements};
            let newElementState = {...currentState.elementState};
            newElementGraph[currentState.elementBeingDrawn].styles = {...newElementGraph[currentState.elementBeingDrawn].styles};

            newElementState = getUpdatedPointsBuffer(e, currentState, newElementState);

            const currentPath = newElementState[currentState.elementBeingDrawn].currentPath;

            const currentPathBuffer = newElementState[currentState.elementBeingDrawn].pathBuffer;
            const smoothingLevel = newElementState[currentState.elementBeingDrawn].smoothingLevel;
            const newPath = getUpdatedSvgPath(currentPath, currentPathBuffer, smoothingLevel);

            newElementGraph[currentState.elementBeingDrawn].styles.d = newPath.currentPath+newPath.tmpPath;
            newElementState[currentState.elementBeingDrawn].currentPath = newPath.currentPath;
            
            newState.elements = newElementGraph;
            newState.elementState = newElementState;
        }
        this.setState(newState);
    }

    handleDragEnd() {
        const newState = {};
        newState.tool = "pan";
        this.setState(newState);
    }
  
    render() {
        const {
            handleDeselectAllElements,
            handleDrawCanvasShow,
            registerDragHandler,
            autoActivate,
            currentSelectedTool
        } = this.props;

        return (
           
            <Tool type="lineFreehand" 
                handleDeselectAllElements={handleDeselectAllElements}
                currentSelectedTool={currentSelectedTool}
                handleDrawCanvasShow={handleDrawCanvasShow}
                registerDragHandler={registerDragHandler}
                handleDragStart={this.handleShapeDragStart}
                handleDragMove={this.handleDragMove}
                handleDragEnd={this.handleDragEnd}
                autoActivate={autoActivate}
            />
                   
        );
    }
    
  }

  export default Shape;