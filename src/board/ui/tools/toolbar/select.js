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
        this.props.handleUpdateSelectionArea(e);
        this.setState({
            x1 : this.state.x1+e.movementX,
            y1 : this.state.y1+e.movementY
        });
    }

    handleSelectEnd = (e) => {
        const {
            x,
            y,
            x1,
            y1
        } = this.state;
        this.props.handleSelectElementsWithinArea(x, y, x1, y1);
    }
  
    render() {
        const {
            handleToolSelect,
            handleDrawCanvasShow,
            registerDragHandler
        } = this.props;
       
        return (
            <Tool type="select" 
                handleToolSelect={handleToolSelect}
                handleDrawCanvasShow={handleDrawCanvasShow}
                registerDragHandler={registerDragHandler}
                handleDragStart={this.handleSelectStart}
                handleDragMove={this.handleSelectMove}
                handleDragEnd={this.handleSelectEnd} 
            />
        );
    }
    
  }

  export default Select;