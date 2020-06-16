import React, {Component} from 'react';
import Toolbar from './ui/toolbar';
import Shortid from 'shortid';

import './styles.css';


class Board extends Component {

    constructor(props, context) {
      super(props, context);
      this.state = {
        zoomLevel : 100,
        offsetX : 0,
        offsetY : 0,
        tool : "pan",
        dragging : false,
        dragStartX :  0,
        dragStartY : 0,
        elements : {
            "sdfklsndflksndf" : {
                id : "sdfklsndflksndf",
                type : "circle",
                cx : 50,
                cy : 50,
                r : 1000,
                fill : "red"
            }
        },
        currentElement : null
      };
    }
  
    handleToolSelect = (type) => {
      this.setState({"tool" : type});
    }

    handleZoom = (e) => {
        const {
            offsetX,
            offsetY,
            zoomLevel
        } = this.state;

        const dir = Math.sign(e.deltaY),
        nextZoomLevel = zoomLevel + dir > 0 ? zoomLevel + dir : 1,
        currentCursorPositionX = e.clientX*zoomLevel,
        currentCursorPositionY = e.clientY*zoomLevel,
        cursorPositionXAfterZoom = e.clientX*nextZoomLevel,
        cursorPositionYAfterZoom = e.clientY*nextZoomLevel,
        newOffsetX = offsetX - (cursorPositionXAfterZoom - currentCursorPositionX),
        newOffsetY = offsetY - (cursorPositionYAfterZoom - currentCursorPositionY);

        this.setState({
            offsetX : newOffsetX,
            offsetY : newOffsetY,
            zoomLevel : nextZoomLevel
        });

    }

    handleMouseDown = (e) => {
        const newState = {
            dragging : true,
            dragStartX : e.clientX,
            dragStartY : e.clientY
        };
        
        if(this.state.tool === "shape") {
            newState.elements = {...this.state.elements};
            const newID = Shortid.generate();
            newState.elements[newID] = {
                id : newID,
                type : "rect",
                x : e.clientX*this.state.zoomLevel,
                y : e.clientY*this.state.zoomLevel,
                width : 8*this.state.zoomLevel,
                height: 8*this.state.zoomLevel,
                fill : "red"
            };
            newState.currentElement = newID;
        }
        this.setState(newState);
    }

    handleMouseMove = (e) => {
        const {
            offsetX,
            offsetY,
            zoomLevel,
            dragging,
            dragStartX,
            dragStartY,
            tool,
            elements,
            currentElement
        } = this.state;
        if(dragging) {
            if(tool === "pan") {
                this.setState({
                    offsetX : offsetX + (e.movementX*-zoomLevel),
                    offsetY : offsetY + (e.movementY*-zoomLevel)
                });
            } else if (tool === "shape" && currentElement !== null) {
                const newElementGraph = {...elements};
                newElementGraph[currentElement].width = (e.clientX-dragStartX)*zoomLevel;
                newElementGraph[currentElement].height = (e.clientY-dragStartY)*zoomLevel;
                this.setState({
                    elements : newElementGraph
                });
            }
            
        }
    }

    handleMouseUp = (e) => {
        this.setState({dragging : false});
    }
  
    render() {
        const {width, height} = this.props;
        const {offsetX, offsetY, zoomLevel, tool, elements} = this.state;
        const zoomedWidth = width*zoomLevel,
        zoomedHeight = height*zoomLevel;
        const viewBox = `${offsetX} ${offsetY} ${zoomedWidth} ${zoomedHeight}`;
        const elementNodes = Object.keys(elements).map(elementID => {
            const element = elements[elementID];
            if(element.type === "circle") {
                return (<circle
                            key={element.id} 
                            cx={element.cx} 
                            cy={element.cy} 
                            r={element.r} 
                            fill={element.fill} 
                            style={{cursor: "pointer"}} 
                    />);
            } else if (element.type === "rect") {
                return (<rect 
                    key={element.id}
                    x={element.x} 
                    y={element.y} 
                    width={element.width} 
                    height={element.height} 
                    fill={element.fill} 
                    style={{cursor: "pointer"}} 
                />);
            }
            return null;
        });
        return (
            <div className={`boardWrapper ${tool}`}>
                <div className="altitude">Altitude : {zoomLevel}m</div>
                <Toolbar handleToolSelect={this.handleToolSelect} />
                <svg id="board" 
                    width={`${width}px`}
                    height={`${height}px`}
                    viewBox={viewBox}
                    onWheel={this.handleZoom}
                    onMouseDown={this.handleMouseDown}
                    onMouseMove={this.handleMouseMove}
                    onMouseUp={this.handleMouseUp}
                    >
                    {elementNodes}
                </svg>
            </div>
        );
    }

    
  }

  export default Board;