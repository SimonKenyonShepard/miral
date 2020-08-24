import React, {Component} from 'react';
import MultiTool from './multiTool';

import './styles.css';

import ShapeCircle from './shapeCircle';
import ShapeRect from './shapeRect';
import ShapeTriangle from './shapeTriangle';


class Shape extends Component {
  
    render() {
        const {
            handleToolSelect,
            handleDrawCanvasShow,
            registerDragHandler,
            handleDragMove,
            handleDragEnd,
            currentSelectedTool
        } = this.props;

        const subMenuTools = [
            <ShapeRect 
                handleToolSelect={handleToolSelect}
                handleDrawCanvasShow={handleDrawCanvasShow}
                registerDragHandler={registerDragHandler}
                handleDragMove={handleDragMove}
                handleDragEnd={handleDragEnd}
                currentSelectedTool={currentSelectedTool}
            />,
            <ShapeCircle 
                handleToolSelect={handleToolSelect}
                handleDrawCanvasShow={handleDrawCanvasShow}
                registerDragHandler={registerDragHandler}
                handleDragMove={handleDragMove}
                handleDragEnd={handleDragEnd}
                currentSelectedTool={currentSelectedTool}
            />,
            <ShapeTriangle 
                handleToolSelect={handleToolSelect}
                handleDrawCanvasShow={handleDrawCanvasShow}
                registerDragHandler={registerDragHandler}
                handleDragMove={handleDragMove}
                handleDragEnd={handleDragEnd}
                currentSelectedTool={currentSelectedTool}
            />
        ];

        return (
           
            <MultiTool type="shape" 
                subMenuItems={subMenuTools} 
            />
                   
        );
    }
    
  }

  export default Shape;