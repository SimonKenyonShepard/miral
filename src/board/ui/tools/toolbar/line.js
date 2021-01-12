import React, {Component} from 'react';
import MultiTool from './multiTool';
import { store } from '../../../context/tools';

import LineStraight from "./lineStraight";
import LineSmooth from "./lineSmooth";
import LineStraightArrow from "./lineStraight_arrow";
import LineSmoothArrow from "./lineSmooth_arrow";
import LineFreehand from "./lineFreehand";

import './styles.css';

class Line extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {};
        this.subMenuType = "line";
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
            <LineStraight
                key={"tool_lineStraight"}
                handleDeselectAllElements={handleDeselectAllElements}
                handleDrawCanvasShow={handleDrawCanvasShow}
                registerDragHandler={registerDragHandler}
                handleDragMove={handleDragMove}
                handleDragEnd={handleDragEnd}
                currentSelectedTool={currentSelectedTool}
            />,
            <LineSmooth
                key={"tool_lineSmooth"}
                handleDeselectAllElements={handleDeselectAllElements}
                handleDrawCanvasShow={handleDrawCanvasShow}
                registerDragHandler={registerDragHandler}
                handleDragMove={handleDragMove}
                handleDragEnd={handleDragEnd}
                currentSelectedTool={currentSelectedTool}

            />,
            <LineStraightArrow
                key={"tool_lineStraightArrow"}
                handleDeselectAllElements={handleDeselectAllElements}
                handleDrawCanvasShow={handleDrawCanvasShow}
                registerDragHandler={registerDragHandler}
                handleDragMove={handleDragMove}
                handleDragEnd={handleDragEnd}
                currentSelectedTool={currentSelectedTool}
            />,
            <LineSmoothArrow
                key={"tool_lineSmoothArrow"}
                handleDeselectAllElements={handleDeselectAllElements}
                handleDrawCanvasShow={handleDrawCanvasShow}
                registerDragHandler={registerDragHandler}
                handleDragMove={handleDragMove}
                handleDragEnd={handleDragEnd}
                currentSelectedTool={currentSelectedTool}

            />,
            <LineFreehand
                key={"tool_lineFreehand"}
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
                defaultTool={"lineStraight"}
            />
                   
        );
    }
    
  }

  Line.contextType = store;

  export default Line;