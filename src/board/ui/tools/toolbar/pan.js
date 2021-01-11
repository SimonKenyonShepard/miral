import React, {Component} from 'react';
import Tool from './tool';

import './styles.css';


class Pan extends Component {

    handleTextClick() {
        this.removeDragHandler("drawCanvas");
    }

    handlePanStart(e, dragStartX, dragStartY) {
        const {
            offsetX,
            offsetY,
            zoomLevel
        } = this.state;

        this.setState({
            offsetX : offsetX + ((dragStartX+e.movementX)*-zoomLevel),
            offsetY : offsetY + ((dragStartY+e.movementY)*-zoomLevel)
        });
    }

    handlePanMove(e) {
        const {
            offsetX,
            offsetY,
            zoomLevel
        } = this.state;

        this.setState({
            offsetX : offsetX + ((e.movementX)*-zoomLevel),
            offsetY : offsetY + ((e.movementY)*-zoomLevel)
        });
    }

    handlePanEnd() {
        const newState = {};
        newState.tool = "pan";
        this.removeDragHandler("drawCanvas");
        this.setState(newState);
    }
  
    render() {
        const {
            handleDeselectAllElements,
            handleDrawCanvasShow,
            registerDragHandler
        } = this.props;
       
        return (
            <Tool type="pan" 
                handleDeselectAllElements={handleDeselectAllElements}
                handleDrawCanvasShow={handleDrawCanvasShow}
                registerDragHandler={registerDragHandler}
                handleClick={this.handlePanClick}
                handleDragStart={this.handlePanStart}
                handleDragMove={this.handlePanMove}
                handleDragEnd={this.handlePanEnd} 
            />
        );
    }
    
  }

  export default Pan;