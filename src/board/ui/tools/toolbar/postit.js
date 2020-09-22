import React, {Component} from 'react';
import MultiTool from './multiTool';

import './styles.css';

import PostitSquare from './postit_square';
import PostitRect from './postit_rect';
import PostitRectV from './postit_rect_v';

class Postit extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
          previousSelectedShapeTool : "postitSquare",
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
            postitRect : false,
            postitSquare : false,
            postitRectV : false,
        };

        if(this.state.menuActivated) {
            autoActivate[this.state.previousSelectedShapeTool] = true;
        }

        const subMenuTools = [
            <PostitSquare
                key={"tool_postitSquare"}
                handleToolSelect={this.handleToolSelect}
                handleDrawCanvasShow={handleDrawCanvasShow}
                registerDragHandler={registerDragHandler}
                handleDragMove={handleDragMove}
                handleDragEnd={handleDragEnd}
                currentSelectedTool={currentSelectedTool}
                autoActivate={autoActivate.postitSquare}
            />,
            <PostitRect
                key={"tool_postitRect"}
                handleToolSelect={this.handleToolSelect}
                handleDrawCanvasShow={handleDrawCanvasShow}
                registerDragHandler={registerDragHandler}
                handleDragMove={handleDragMove}
                handleDragEnd={handleDragEnd}
                currentSelectedTool={currentSelectedTool}
                autoActivate={autoActivate.postitRect}

            />,
            <PostitRectV
                key={"tool_postitRectV"}
                handleToolSelect={this.handleToolSelect}
                handleDrawCanvasShow={handleDrawCanvasShow}
                registerDragHandler={registerDragHandler}
                handleDragMove={handleDragMove}
                handleDragEnd={handleDragEnd}
                currentSelectedTool={currentSelectedTool}
                autoActivate={autoActivate.postitRectV}

            />
        ];

        return (
           
            <MultiTool 
                type="postit" 
                subMenuItems={subMenuTools}
                openSubMenu={this.props.openSubMenu}
                handleSetCurrentOpenSubMenu={this.props.handleSetCurrentOpenSubMenu} 
            />
                   
        );
    }

    componentDidUpdate(prevProps) {
        if(this.props.openSubMenu !== prevProps.openSubMenu && this.props.openSubMenu === "postit") {
            this.setState({menuActivated : true});
        } else if (this.state.menuActivated) {
            this.setState({menuActivated : false});
        }
    }   
    
  }

  export default Postit;