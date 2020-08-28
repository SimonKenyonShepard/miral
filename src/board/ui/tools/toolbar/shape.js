import React, {Component} from 'react';
import MultiTool from './multiTool';

import './styles.css';

import ShapeCircle from './shapeCircle';
import ShapeRect from './shapeRect';
import ShapeTriangle from './shapeTriangle';


class Shape extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
          previousSelectedShapeTool : "shapeRect",
          menuActivated : false
        };
    }

    handleToolSelect = (tool) => {
        if(this.props.currentSelectedTool !== tool) {
            this.setState({
                previousSelectedShapeTool : tool
            });
            this.props.handleToolSelect(tool);
        }
    }
  
    render() {
        const {
            handleDrawCanvasShow,
            registerDragHandler,
            handleDragMove,
            handleDragEnd,
            currentSelectedTool
        } = this.props;

        const autoActivate = {
            shapeRect : false,
            shapeCircle : false,
            shapeTriangle : false
        };

        if(this.state.menuActivated) {
            autoActivate[this.state.previousSelectedShapeTool] = true;
        }

        const subMenuTools = [
            <ShapeRect
                key={"tool_shapeRect"}
                handleToolSelect={this.handleToolSelect}
                handleDrawCanvasShow={handleDrawCanvasShow}
                registerDragHandler={registerDragHandler}
                handleDragMove={handleDragMove}
                handleDragEnd={handleDragEnd}
                currentSelectedTool={currentSelectedTool}
                autoActivate={autoActivate.shapeRect}
            />,
            <ShapeCircle
                key={"tool_shapeCircle"}
                handleToolSelect={this.handleToolSelect}
                handleDrawCanvasShow={handleDrawCanvasShow}
                registerDragHandler={registerDragHandler}
                handleDragMove={handleDragMove}
                handleDragEnd={handleDragEnd}
                currentSelectedTool={currentSelectedTool}
                autoActivate={autoActivate.shapeCircle}

            />,
            <ShapeTriangle
                key={"tool_shapeTriangle"} 
                handleToolSelect={this.handleToolSelect}
                handleDrawCanvasShow={handleDrawCanvasShow}
                registerDragHandler={registerDragHandler}
                handleDragMove={handleDragMove}
                handleDragEnd={handleDragEnd}
                currentSelectedTool={currentSelectedTool}
                autoActivate={autoActivate.shapeTriangle}
            />
        ];

        return (
           
            <MultiTool 
                type="shape" 
                subMenuItems={subMenuTools}
                openSubMenu={this.props.openSubMenu}
                handleSetCurrentOpenSubMenu={this.props.handleSetCurrentOpenSubMenu} 
            />
                   
        );
    }

    componentDidUpdate(prevProps) {
        if(this.props.openSubMenu !== prevProps.openSubMenu && this.props.openSubMenu === "shape") {
            this.setState({menuActivated : true});
        } else if (this.state.menuActivated) {
            this.setState({menuActivated : false});
        }
    }   
    
  }

  export default Shape;