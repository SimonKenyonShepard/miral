import React, {Component} from 'react';
import MultiTool from './multiTool';
import { store } from '../../../context/tools';

import './styles.css';

import ShapeCircle from './shapeCircle';
import ShapeRect from './shapeRect';
import ShapeTriangle from './shapeTriangle';

class Shape extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {};

        this.subMenuType = "shape";
    }
  
    render() {
        const {
            handleDrawCanvasShow,
            registerDragHandler,
            handleDragMove,
            handleDragEnd,
            currentSelectedTool,
            handleDeselectAllElements
        } = this.props;

        const subMenuTools = [
            <ShapeRect
                key={"tool_shapeRect"}
                handleDeselectAllElements={handleDeselectAllElements}
                handleDrawCanvasShow={handleDrawCanvasShow}
                registerDragHandler={registerDragHandler}
                handleDragMove={handleDragMove}
                handleDragEnd={handleDragEnd}
                currentSelectedTool={currentSelectedTool}
            />,
            <ShapeCircle
                key={"tool_shapeCircle"}
                handleDeselectAllElements={handleDeselectAllElements}
                handleDrawCanvasShow={handleDrawCanvasShow}
                registerDragHandler={registerDragHandler}
                handleDragMove={handleDragMove}
                handleDragEnd={handleDragEnd}
                currentSelectedTool={currentSelectedTool}

            />,
            <ShapeTriangle
                key={"tool_shapeTriangle"} 
                handleDeselectAllElements={handleDeselectAllElements}
                handleDrawCanvasShow={handleDrawCanvasShow}
                registerDragHandler={registerDragHandler}
                handleDragMove={handleDragMove}
                handleDragEnd={handleDragEnd}
                currentSelectedTool={currentSelectedTool}
            />
        ];

        return (
           
            <MultiTool 
                type={this.subMenuType}
                subMenuItems={subMenuTools}
                handleSetCurrentOpenSubMenu={this.props.handleSetCurrentOpenSubMenu}
                defaultTool={"shapeRect"}
            />
                   
        );
    }
    
  }

  Shape.contextType = store;

  export default Shape;