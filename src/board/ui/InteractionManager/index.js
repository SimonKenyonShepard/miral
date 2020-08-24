import React, {Component} from 'react';

import './styles.css';

class InteractionManager extends Component {

    constructor(props, context) {
      super(props, context);
      this.state = {
        drag: "normal",
        dragStartX : 0,
        dragStartY : 0
      };
    }

    handleZoom = (e) => {
        const {
            offsetX,
            offsetY,
            zoomLevel
        } = this.props;

        const dir = Math.sign(e.deltaY),
        nextZoomLevel = zoomLevel + dir > 0 ? zoomLevel + dir : 1,
        currentCursorPositionX = e.clientX*zoomLevel,
        currentCursorPositionY = e.clientY*zoomLevel,
        cursorPositionXAfterZoom = e.clientX*nextZoomLevel,
        cursorPositionYAfterZoom = e.clientY*nextZoomLevel,
        newOffsetX = offsetX - (cursorPositionXAfterZoom - currentCursorPositionX),
        newOffsetY = offsetY - (cursorPositionYAfterZoom - currentCursorPositionY);

        this.props.updateBoardPosition({
            offsetX : newOffsetX,
            offsetY : newOffsetY,
            zoomLevel : nextZoomLevel
        });

    }
  
    handleMouseDown = (e) => {
        e.stopPropagation();
        this.setState({
            dragStartX : e.clientX,
            dragStartY : e.clientY,
            dragStartTime : Date.now(),
            drag : "mouseDown",
            elementID : e.target.id
        });
        console.log(e.target);
    }

    handleMouseMove = (e) => {
        if(this.state.drag === "mouseDown" || this.state.drag === "dragging") {
            let wasFirstDrag = false;
            const dragHandlers = this.props.dragHandlers[this.state.elementID];
            if(this.state.drag === "mouseDown") {
                wasFirstDrag = true;
                this.setState({
                    drag : "dragging"
                });
                if(dragHandlers &&
                    dragHandlers.handleDragStart) {
                    dragHandlers.handleDragStart(e, this.state.dragStartX, this.state.dragStartY, e.movementX, e.movementY);
                }
               
            }
            e.stopPropagation();
            if(dragHandlers && dragHandlers.handleDragMove && !wasFirstDrag) {
                dragHandlers.handleDragMove(e, this.state.dragStartX, this.state.dragStartY);
            }
        }
    }

    handleMouseUp = (e) => {
        const dragHandlers = this.props.dragHandlers[this.state.elementID];
        const interactionTime = Date.now() - this.state.dragStartTime;
        const interactionMovement = (this.state.dragStartX+this.state.dragStartY)-(e.clientX+e.clientY);
        const wasProbablyClick = (interactionMovement > -5 && interactionMovement < 5) && interactionTime < 200;
        if(this.state.drag === "dragging" && !wasProbablyClick) {
            e.stopPropagation();
            if(dragHandlers && dragHandlers.handleDragEnd) {
                dragHandlers.handleDragEnd();
            }
            
            this.setState({
                drag : "normal",
                dragStartX : 0,
                dragStartY : 0
            });
            
        } else if(this.state.drag === "normal" || this.state.drag === "mouseDown" || (this.state.drag === "dragging" && wasProbablyClick)) {

            if(dragHandlers && dragHandlers.handleClick) {
                dragHandlers.handleClick(e, this.state.dragStartX, this.state.dragStartY);
            }
            this.setState({
                drag : "normal",
                dragStartX : 0,
                dragStartY : 0
            });
        }
    }

    render() {

        const styles={
            position : "absolute",
            top : 0,
            left : 0,
            height : "100vh",
            width : "100vw"
        }
        
        return (
            <div
                style={styles}

                onMouseDown={this.handleMouseDown}
                onMouseMove={this.handleMouseMove}
                onMouseUp={this.handleMouseUp}
                onWheel={this.handleZoom}
                id="interActionManager"
            >
                {this.props.children}
            </div>
        );
    }
    
  }

  export default InteractionManager;