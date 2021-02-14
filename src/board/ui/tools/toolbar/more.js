import React, {Component} from 'react';
import MultiTool from './multiTool';
import { store } from '../../../context/tools';

import Slide from "./slide";
import Link from "./link";
import PDF from "./pdf";
import Iframe from "./iframe";
import Youtube from "./youtube";
import Timer from "./timer";
import Poll from "./poll";
import Dice from "./dice";

import './styles.css';



class More extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {};
        this.subMenuType = "more";
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
            <Slide
                key={"tool_slide"}
                handleDeselectAllElements={handleDeselectAllElements}
                handleDrawCanvasShow={handleDrawCanvasShow}
                registerDragHandler={registerDragHandler}
                handleDragMove={handleDragMove}
                handleDragEnd={handleDragEnd}
                currentSelectedTool={currentSelectedTool}
            />,
            <Link
                key={"tool_link"}
                handleDeselectAllElements={handleDeselectAllElements}
                handleDrawCanvasShow={handleDrawCanvasShow}
                registerDragHandler={registerDragHandler}
                handleDragMove={handleDragMove}
                handleDragEnd={handleDragEnd}
                currentSelectedTool={currentSelectedTool}
            />,
            <PDF
                key={"tool_pdf"}
                handleDeselectAllElements={handleDeselectAllElements}
                handleDrawCanvasShow={handleDrawCanvasShow}
                registerDragHandler={registerDragHandler}
                handleDragMove={handleDragMove}
                handleDragEnd={handleDragEnd}
                currentSelectedTool={currentSelectedTool}

            />,
            <Iframe
                key={"tool_iframe"}
                handleDeselectAllElements={handleDeselectAllElements}
                handleDrawCanvasShow={handleDrawCanvasShow}
                registerDragHandler={registerDragHandler}
                handleDragMove={handleDragMove}
                handleDragEnd={handleDragEnd}
                currentSelectedTool={currentSelectedTool}
            />,
            <Youtube
                key={"tool_youtube"}
                handleDeselectAllElements={handleDeselectAllElements}
                handleDrawCanvasShow={handleDrawCanvasShow}
                registerDragHandler={registerDragHandler}
                handleDragMove={handleDragMove}
                handleDragEnd={handleDragEnd}
                currentSelectedTool={currentSelectedTool}
            />,
            <Timer
                key={"tool_timer"}
                handleDeselectAllElements={handleDeselectAllElements}
                handleDrawCanvasShow={handleDrawCanvasShow}
                registerDragHandler={registerDragHandler}
                handleDragMove={handleDragMove}
                handleDragEnd={handleDragEnd}
                currentSelectedTool={currentSelectedTool}
            />,
            <Poll
                key={"tool_poll"}
                handleDeselectAllElements={handleDeselectAllElements}
                handleDrawCanvasShow={handleDrawCanvasShow}
                registerDragHandler={registerDragHandler}
                handleDragMove={handleDragMove}
                handleDragEnd={handleDragEnd}
                currentSelectedTool={currentSelectedTool}
            />,
            <Dice
                key={"tool_dice"}
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
                defaultTool={"slide"}
                noIconChange={true}
            />
                   
        );
    }
    
  }

  More.contextType = store;

  export default More;