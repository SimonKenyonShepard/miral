import React, {Component} from 'react';
import MultiTool from './multiTool';

import Slide from "./slide";
import PDF from "./pdf";
import Iframe from "./iframe";
import Youtube from "./youtube";
import Timer from "./timer";
import Poll from "./poll";

import './styles.css';



class More extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
          previousSelectedShapeTool : "slide",
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
            slide : false,
            pdf : false,
            iframe : false,
            youtube : false,
            timer : false,
            poll : false
        };

        if(this.state.menuActivated) {
            autoActivate[this.state.previousSelectedShapeTool] = true;
        }

        const subMenuTools = [
            <Slide
                key={"tool_slide"}
                handleToolSelect={this.handleToolSelect}
                handleDrawCanvasShow={handleDrawCanvasShow}
                registerDragHandler={registerDragHandler}
                handleDragMove={handleDragMove}
                handleDragEnd={handleDragEnd}
                currentSelectedTool={currentSelectedTool}
                autoActivate={autoActivate.slide}
            />,
            <PDF
                key={"tool_pdf"}
                handleToolSelect={this.handleToolSelect}
                handleDrawCanvasShow={handleDrawCanvasShow}
                registerDragHandler={registerDragHandler}
                handleDragMove={handleDragMove}
                handleDragEnd={handleDragEnd}
                currentSelectedTool={currentSelectedTool}
                autoActivate={autoActivate.pdf}

            />,
            <Iframe
                key={"tool_iframe"}
                handleToolSelect={this.handleToolSelect}
                handleDrawCanvasShow={handleDrawCanvasShow}
                registerDragHandler={registerDragHandler}
                handleDragMove={handleDragMove}
                handleDragEnd={handleDragEnd}
                currentSelectedTool={currentSelectedTool}
                autoActivate={autoActivate.shapeTriangle}
            />,
            <Youtube
                key={"tool_youtube"}
                handleToolSelect={this.handleToolSelect}
                handleDrawCanvasShow={handleDrawCanvasShow}
                registerDragHandler={registerDragHandler}
                handleDragMove={handleDragMove}
                handleDragEnd={handleDragEnd}
                currentSelectedTool={currentSelectedTool}
                autoActivate={autoActivate.youtube}
            />,
            <Timer
                key={"tool_timer"}
                handleToolSelect={this.handleToolSelect}
                handleDrawCanvasShow={handleDrawCanvasShow}
                registerDragHandler={registerDragHandler}
                handleDragMove={handleDragMove}
                handleDragEnd={handleDragEnd}
                currentSelectedTool={currentSelectedTool}
                autoActivate={autoActivate.timer}
            />,
            <Poll
                key={"tool_poll"}
                handleToolSelect={this.handleToolSelect}
                handleDrawCanvasShow={handleDrawCanvasShow}
                registerDragHandler={registerDragHandler}
                handleDragMove={handleDragMove}
                handleDragEnd={handleDragEnd}
                currentSelectedTool={currentSelectedTool}
                autoActivate={autoActivate.poll}
            />
        ];

        return (
           
            <MultiTool 
                type="more" 
                subMenuItems={subMenuTools}
                openSubMenu={this.props.openSubMenu}
                handleSetCurrentOpenSubMenu={this.props.handleSetCurrentOpenSubMenu} 
            />
                   
        );
    }

    componentDidUpdate(prevProps) {
        if(this.props.openSubMenu !== prevProps.openSubMenu && this.props.openSubMenu === "more") {
            this.setState({menuActivated : true});
        } else if (this.state.menuActivated) {
            this.setState({menuActivated : false});
        }
    }   
    
  }

  export default More;