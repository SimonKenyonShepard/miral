import React, {Component} from 'react';
import Tool from './tool';

import './styles.css';


class Select extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
          x : 0,
          y : 0,
          x1 : 0,
          y1 : 0
        };
    }

    handleSelectStart = (e, dragStartX, dragStartY) => {
        this.props.handleShowSelectionArea(true, e, dragStartX, dragStartY);
        
        this.setState({
            x : dragStartX,
            y : dragStartY,
            x1 : dragStartX,
            y1 : dragStartY
        });
    }

    handleSelectMove = (e) => {
        const selectionAreaUpdate = {
            x : this.state.x,
            y : this.state.y,
            x1 : this.state.x1+e.movementX,
            y1 : this.state.y1+e.movementY
        };
        this.props.handleUpdateSelectionArea(selectionAreaUpdate);
        this.setState(selectionAreaUpdate);
    }

    handleSelectEnd = (e) => {
        const {
            x,
            y,
            x1,
            y1
        } = this.state;
        const selectionArea = {
            x,
            y,
            x1,
            y1
        };
        if(x > x1) {
            selectionArea.x = x1;
            selectionArea.x1 = x;
        }
        if(y > y1) {
            selectionArea.y = y1;
            selectionArea.y1 = y;
        }
        this.props.handleSelectElementsWithinArea(selectionArea.x, selectionArea.y, selectionArea.x1, selectionArea.y1);
    }
  
    render() {
        const {
            handleDeselectAllElements,
            handleDrawCanvasShow,
            registerDragHandler,
            currentSelectedTool
        } = this.props;
       
        return (
            <Tool type="select" 
                handleDeselectAllElements={handleDeselectAllElements}
                handleDrawCanvasShow={handleDrawCanvasShow}
                registerDragHandler={registerDragHandler}
                handleDragStart={this.handleSelectStart}
                handleDragMove={this.handleSelectMove}
                handleDragEnd={this.handleSelectEnd}
                currentSelectedTool={currentSelectedTool} 
            />
        );
    }
    
  }

  export default Select;