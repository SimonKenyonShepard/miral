import React, {Component} from 'react';
import MultiTool from './multiTool';
import { store } from '../../../context/tools';

import './styles.css';

import PostitSquare from './postit_square';
import PostitRect from './postit_rect';
import PostitRectV from './postit_rect_v';

class Postit extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {};
        this.subMenuType = "postit";
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
            <PostitSquare
                key={"tool_postitSquare"}
                handleDeselectAllElements={handleDeselectAllElements}
                handleDrawCanvasShow={handleDrawCanvasShow}
                registerDragHandler={registerDragHandler}
                handleDragMove={handleDragMove}
                handleDragEnd={handleDragEnd}
                currentSelectedTool={currentSelectedTool}
            />,
            <PostitRect
                key={"tool_postitRect"}
                handleDeselectAllElements={handleDeselectAllElements}
                handleDrawCanvasShow={handleDrawCanvasShow}
                registerDragHandler={registerDragHandler}
                handleDragMove={handleDragMove}
                handleDragEnd={handleDragEnd}
                currentSelectedTool={currentSelectedTool}

            />,
            <PostitRectV
                key={"tool_postitRectV"}
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
                defaultTool={"postitSquare"}
            />
                   
        );
    }
    
  }
  
  Postit.contextType = store;

  export default Postit;