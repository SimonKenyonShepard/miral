import React, {PureComponent} from 'react';

import './styles.css';

class InteractionManager extends PureComponent {

    constructor(props, context) {
      super(props, context);
      this.state = {
        drag: "normal",
        dragStartX : 0,
        dragStartY : 0
      };
      this.SAFARIHACK_SCREENX = 0;
      this.SAFARIHACK_SCREENY = 0;
      this.containerElement = null;
      this.pointers = [];
      this.previousPinchZoomDistance = 0;
    }

    handleMouseWheel = (e) => {
        if (e.ctrlKey) {
            e.preventDefault();
            this.handleZoom(e);
        } else {
            const simulatedPanEvent = {
                movementX : e.deltaX*-1,
                movementY : e.deltaY*-1
            };
            this.props.handlePanMove(simulatedPanEvent);
        }
    }

    handleZoom = (e) => {
        const {
            offsetX,
            offsetY,
            zoomLevel
        } = this.props;

        const dir = Math.sign(e.deltaY),
        nextZoomLevel = zoomLevel + dir > 0 ? zoomLevel + (dir*2) : 1,
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
  
    handlePointerDown = (e) => {
        e.stopPropagation();
        if(this.state.drag === "normal") {
            this.setState({
                dragStartX : e.clientX,
                dragStartY : e.clientY,
                dragStartTime : Date.now(),
                drag : "mouseDown",
                isSelected : this.props.isSelected(e.target.id),
                isLocked : this.props.isLocked(e.target.id),
                elementID : e.target.id
            });
            this.pointers = [{...e}];
            this.SAFARIHACK_SCREENX = e.screenX;
            this.SAFARIHACK_SCREENY = e.screenY;
        } else if (this.state.drag === "mouseDown" || this.state.drag === "dragging") {
            const isSecondPointer  = (e.pointerId !== this.pointers[0].pointerId);
            if(isSecondPointer) {
                this.pointers = [...this.pointers, {...e}];
            }
        }
        
    }

    handlePointerMove = (e) => {

        if(this.pointers.length === 1) {
            this.handleSinglePointerMove(e);
        } else if (this.pointers.length > 1) {
            this.handleMultiPointerMove(e);
        }

    }

    handleSinglePointerMove = (e) => {
        const {
            drag,
            elementID,
            isSelected,
            isLocked,
            dragStartX,
            dragStartY
        } = this.state;
        
        this.props.updatePointerPosition({
            x : (e.clientX*this.props.zoomLevel)+this.props.offsetX,
            y : (e.clientY*this.props.zoomLevel)+this.props.offsetY
        });
        
        if(drag === "mouseDown" || drag === "dragging") {
            let dragHandlers = this.props.dragHandlers[elementID];
            const wasAccidentalMovement = this.wasAccidentalMovement(dragStartX, dragStartY, e.clientX, e.clientY);
            e.stopPropagation();
            const wasStartOfDrag = (drag === "mouseDown" && !wasAccidentalMovement);
            const wasMiddleOfDrag = (dragHandlers && dragHandlers.handleDragMove && !wasAccidentalMovement);
            const wasCanvasDrag = (!wasAccidentalMovement && !isSelected && elementID !== "drawCanvas" && elementID !== "resizerHandle" && elementID !== "elementSelectionArea");
            if(wasCanvasDrag || isLocked) {
                dragHandlers = this.props.dragHandlers["board"];
                this.setState({elementID : "board"});
            }
            if(wasStartOfDrag) {
                this.setState({
                    drag : "dragging"
                });
                if(dragHandlers &&
                    dragHandlers.handleDragStart) {
                    dragHandlers.handleDragStart(e, dragStartX, dragStartY, e.movementX, e.movementY);
                }
               
            } else if(wasMiddleOfDrag) {
                //THIS BROWSER HACK IS NEEDED BECAUSE SAFARI POINTERMOVE EVENT DOES NOT SUPPORT MOVEMENTX or MOVEMENTY - PLEASE REMOVE IF NO LONGER NEEDED (i raised a ticket with apple)
                const movementX = e.screenX-this.SAFARIHACK_SCREENX;
                const movementY = e.screenY-this.SAFARIHACK_SCREENY;
                this.SAFARIHACK_SCREENX = e.screenX;
                this.SAFARIHACK_SCREENY = e.screenY;
                e.movementX = movementX;
                e.movementY = movementY;
                //END BROWSER HACK
                dragHandlers.handleDragMove(e, dragStartX, dragStartY);
            }
        }
    }

    handleMultiPointerMove = (e) => {

        const newPointers = this.pointers;
        let previousE;

        for (var i = 0; i < newPointers.length; i++) {
            if (e.pointerId === newPointers[i].pointerId) {
                previousE = {...newPointers[i]};
                newPointers[i] = {...e};
                break;
            }
        }

        var dist = Math.hypot(
            newPointers[0].clientX - newPointers[1].clientX,
            newPointers[0].clientY - newPointers[1].clientY);

        const highestX = Math.max(newPointers[0].clientX, newPointers[1].clientX),
              lowestX = Math.min(newPointers[0].clientX, newPointers[1].clientX),
              highestY = Math.max(newPointers[0].clientY, newPointers[1].clientY),
              lowestY = Math.max(newPointers[0].clientY, newPointers[1].clientY);
        
        const delta = this.previousPinchZoomDistance - dist;

        if(delta > 0.1 || delta < -0.1) {
            this.handleZoom({
                deltaY : delta,
                clientX : lowestX + ((highestX - lowestX)/2),
                clientY : lowestY + ((highestY - lowestY)/2)
            });
        } else {
            //TODO would be really nice if 2 finger pan worked on touch.
            // const simulatedPanEvent = {
            //     movementX : previousE.clientX-e.clientX,
            //     movementY : previousE.clientY-e.clientY
            // };
            // console.log(previousE.clientX, e.clientX);
            // this.props.handlePanMove(simulatedPanEvent);
            console.log(previousE);
        }

        this.previousPinchZoomDistance = dist;
    }

    handlePointerUp = (e) => {
        if(this.pointers.length === 1) {
            this.handleSinglePointerUp(e);
        } else if (this.pointers.length > 1) {
            this.handleMultiPointerUp(e);
        }
    }

    handleSinglePointerUp = (e) => {
        const dragHandlers = this.props.dragHandlers[this.state.elementID];
        const interactionTime = Date.now() - this.state.dragStartTime;
        const wasAccidentalMovement = this.wasAccidentalMovement(this.state.dragStartX, this.state.dragStartY, e.clientX, e.clientY);
        const wasProbablyClick =  wasAccidentalMovement && interactionTime < 200;
        if(this.state.drag === "dragging" && !wasProbablyClick) {
            e.stopPropagation();
            if(dragHandlers && dragHandlers.handleDragEnd) {
                dragHandlers.handleDragEnd(e);
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

    handleMultiPointerUp = (e) => {
        this.pointers.pop();
    }

    wasAccidentalMovement(dragStartX, dragStartY, currentX, currentY) {
        const interactionMovement = (dragStartX+dragStartY)-(currentX+currentY);
        return (interactionMovement > -3 && interactionMovement < 3)
    }

    render() {

        const styles={
            cursor : "pointer",
            position : "absolute",
            top : 0,
            left : 0,
            height : "100vh",
            width : "100vw",
            touchAction : "none"
        }
        
        return (
            <div
                style={styles}
                onPointerDown={this.handlePointerDown}
                onPointerMove={this.handlePointerMove}
                onPointerUp={this.handlePointerUp}
                id="interActionManager"
                ref={(container) => { this.containerElement = container; }}
            >
                {this.props.children}
            </div>
        );
    }

    componentDidMount() {
        document.addEventListener("mouseleave", (e) => {
            const {
                drag
            } = this.state;
            if(drag === "mouseDown" || drag === "dragging") {
                //this.handleMouseUp(e); TODO Figure out how to do this while still keeping toolbar happy.
            }
        });
        this.containerElement.addEventListener('wheel', this.handleMouseWheel,{ passive: false });
    }
    
  }

  export default InteractionManager;