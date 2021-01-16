import React, {Component} from 'react';
import Tool from './tool';
import { store } from '../../../context/tools';

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
        this.context.dispatch(
            {
                type : "activateSelectArea", 
                data : {
                    selectAreaPosition : {
                        x : dragStartX,
                        y : dragStartY,
                        width : e.movementX,
                        height : e.movementY,
                    }
                }
            }
        );
        
        this.setState({
            x : dragStartX,
            y : dragStartY,
            x1 : dragStartX,
            y1 : dragStartY
        });
    }

    handleSelectMove = (e) => {

        const selectionAreaCoords = {
            x : this.state.x,
            y : this.state.y,
            x1 : this.state.x1+e.movementX,
            y1 : this.state.y1+e.movementY
        };

        const positionUpdate = {
            width : selectionAreaCoords.x1-selectionAreaCoords.x,
            height : selectionAreaCoords.y1-selectionAreaCoords.y
        };

        if(selectionAreaCoords.x > selectionAreaCoords.x1) {
            positionUpdate.x = selectionAreaCoords.x1;
            positionUpdate.width = selectionAreaCoords.x-selectionAreaCoords.x1;
        }

        if(selectionAreaCoords.y > selectionAreaCoords.y1) {
            positionUpdate.y = selectionAreaCoords.y1;
            positionUpdate.height = selectionAreaCoords.y-selectionAreaCoords.y1;
        }

        this.context.dispatch(
            {
                type : "updateSelectArea", 
                data : {
                    selectAreaPosition : Object.assign({}, this.context.state.selectAreaPosition, positionUpdate)
                }
            }
        );

        this.setState(selectionAreaCoords);
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
        this.context.dispatch(
            {
                type : "resetSelectArea"
            }
        );
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

  Select.contextType = store;

  export default Select;