import React, {Component} from 'react';
import MultiTool from './multiTool';

import LineStraight from "./lineStraight";
import LineSmooth from "./lineSmooth";
import LineStraightArrow from "./lineStraight_arrow";
import LineSmoothArrow from "./lineSmooth_arrow";
import LineFreehand from "./lineFreehand";

import './styles.css';



class Line extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
          previousSelectedShapeTool : "lineStraight",
          menuActivated : false
        };
    }

    componentDidUpdate = () => {
        const {
            menuActivated,
            previousSelectedShapeTool
        } = this.state
        if(menuActivated && this.context.state.tool !== previousSelectedShapeTool) {
            this.setState({
                previousSelectedShapeTool : this.context.state.tool
            });
        }
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

        const autoActivate = {
            lineStraight : false,
            lineSmooth : false,
            lineFreehand : false,
            lineStraightArrow : false,
            lineSmoothArrow : false
        };

        if(this.state.menuActivated) {
            autoActivate[this.state.previousSelectedShapeTool] = true;
        }

        const subMenuTools = [
            <LineStraight
                key={"tool_lineStraight"}
                handleDeselectAllElements={handleDeselectAllElements}
                handleDrawCanvasShow={handleDrawCanvasShow}
                registerDragHandler={registerDragHandler}
                handleDragMove={handleDragMove}
                handleDragEnd={handleDragEnd}
                currentSelectedTool={currentSelectedTool}
                autoActivate={autoActivate.lineStraight}
            />,
            <LineSmooth
                key={"tool_lineSmooth"}
                handleDeselectAllElements={handleDeselectAllElements}
                handleDrawCanvasShow={handleDrawCanvasShow}
                registerDragHandler={registerDragHandler}
                handleDragMove={handleDragMove}
                handleDragEnd={handleDragEnd}
                currentSelectedTool={currentSelectedTool}
                autoActivate={autoActivate.lineSmooth}

            />,
            <LineStraightArrow
                key={"tool_lineStraightArrow"}
                handleDeselectAllElements={handleDeselectAllElements}
                handleDrawCanvasShow={handleDrawCanvasShow}
                registerDragHandler={registerDragHandler}
                handleDragMove={handleDragMove}
                handleDragEnd={handleDragEnd}
                currentSelectedTool={currentSelectedTool}
                autoActivate={autoActivate.lineStraightArrow}
            />,
            <LineSmoothArrow
                key={"tool_lineSmoothArrow"}
                handleDeselectAllElements={handleDeselectAllElements}
                handleDrawCanvasShow={handleDrawCanvasShow}
                registerDragHandler={registerDragHandler}
                handleDragMove={handleDragMove}
                handleDragEnd={handleDragEnd}
                currentSelectedTool={currentSelectedTool}
                autoActivate={autoActivate.lineSmoothArrow}

            />,
            <LineFreehand
                key={"tool_lineFreehand"}
                handleDeselectAllElements={handleDeselectAllElements}
                handleDrawCanvasShow={handleDrawCanvasShow}
                registerDragHandler={registerDragHandler}
                handleDragMove={handleDragMove}
                handleDragEnd={handleDragEnd}
                currentSelectedTool={currentSelectedTool}
                autoActivate={autoActivate.lineFreehand}
            />
        ];

        return (
           
            <MultiTool 
                type="line" 
                subMenuItems={subMenuTools}
                openSubMenu={this.props.openSubMenu}
                handleSetCurrentOpenSubMenu={this.props.handleSetCurrentOpenSubMenu} 
            />
                   
        );
    }

    componentDidUpdate(prevProps) {
        if(this.props.openSubMenu !== prevProps.openSubMenu && this.props.openSubMenu === "line") {
            this.setState({menuActivated : true});
        } else if (this.state.menuActivated) {
            this.setState({menuActivated : false});
        }
    }   
    
  }

  export default Line;