import React, {Component} from 'react';

import Toolbar from './toolbar';

import './styles.css';

class Tools extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
          drawCanvasVisible : false,
          selectAreaVisible : false,
          selectAreaPosition : {
            x : 0,
            y : 0,
            width : 0,
            height : 0,
          }
        };
    }

    handleDrawCanvasShow = () => {
        this.setState({drawCanvasVisible : true});
    }

    handleDrawCanvasHide = () => {
        const resetSelectArea = {
            selectAreaVisible : false,
            selectAreaPosition : {
                x : 0,
                y : 0,
                width : 0,
                height : 0,
            }
        };
        const resetDrawCanvas = {
            drawCanvasVisible : false
        };
        this.props.removeDragHandler("drawCanvas");
        this.props.handleToolSelect("pan");
        this.setState(Object.assign({}, resetSelectArea, resetDrawCanvas));
    }

    handleShowSelectionArea = (visible, event, dragStartX, dragStartY) => {
        if(visible) {
            this.setState({
                selectAreaVisible : visible,
                selectAreaPosition : {
                    x : dragStartX,
                    y : dragStartY,
                    width : event.movementX,
                    height : event.movementY,
                }
            });
        }
        
    }

    handleUpdateSelectionArea = (event) => {
        const positionUpdate = {
            width : this.state.selectAreaPosition.width+event.movementX,
            height : this.state.selectAreaPosition.height+event.movementY
        };
        this.setState({
            selectAreaPosition : Object.assign({}, this.state.selectAreaPosition, positionUpdate)
        });
        
    }
  
    render() {
        const {
            handleToolSelect,
            registerDragHandler,
            handleSelectElementsWithinArea
        } = this.props;
        const {
            selectAreaVisible,
            selectAreaPosition
        } = this.state;

        const selectAreaStyle = {
            display : "none"
        };

        if(selectAreaVisible) {
            selectAreaStyle.display = "block";
            selectAreaStyle.transform = `translate3d(${(selectAreaPosition.x)}px,${(selectAreaPosition.y)}px, 0)`
            selectAreaStyle.width = `${selectAreaPosition.width}px`;
            selectAreaStyle.height = `${selectAreaPosition.height}px`;
        }

        const drawCanvasStyles = {
            display : "none"
        };
        if(this.state.drawCanvasVisible) {
            drawCanvasStyles.display = "block";
        }
        return (
            <div className="tools">
                <Toolbar
                    handleToolSelect={handleToolSelect} 
                    registerDragHandler={registerDragHandler}
                    handleDrawCanvasShow={this.handleDrawCanvasShow}
                    handleShowSelectionArea={this.handleShowSelectionArea}
                    handleUpdateSelectionArea={this.handleUpdateSelectionArea}
                    handleSelectElementsWithinArea={handleSelectElementsWithinArea}

                />
                <div 
                    id="drawCanvas" 
                    style={drawCanvasStyles}
                    onMouseUp={this.handleDrawCanvasHide}
                >
                    <div className={"selectionArea"} style={selectAreaStyle}/>
                </div>
            </div>
        );
    }
    
  }

  export default Tools;