import React, {Component} from 'react';

import Pan from './pan';
import Select from './select';
import Shape from './shape';
import Postit from './postit';
import Text from './text';

import './styles.css';

class Toolbar extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
          drawCanvasVisible : false
        };
    }

    handleDrawCanvasShow = () => {
        this.setState({drawCanvasVisible : true});
    }

    handleDrawCanvasHide = () => {
        this.setState({drawCanvasVisible : false});
    }

    handleElementDragMove(e) {
        const currentState = this.state;
        const newState = {};
        if(currentState.elementBeingDrawn !== null) {
            const newElementGraph = {...currentState.elements};
            newElementGraph[currentState.elementBeingDrawn].styles.width += e.movementX*currentState.zoomLevel;
            newElementGraph[currentState.elementBeingDrawn].styles.height += e.movementY*currentState.zoomLevel;
            newState.elements = newElementGraph;
        }
        this.setState(newState);
    }

    handleDragEnd() {
        const newState = {};
        newState.tool = "pan";
        this.removeDragHandler("drawCanvas");
        this.setState(newState);
    }
  
    render() {
        const {
            handleToolSelect,
            registerDragHandler
        } = this.props;
        const drawCanvasStyles = {
            display : "none"
        };
        if(this.state.drawCanvasVisible) {
            drawCanvasStyles.display = "block";
        }
        return (
            <div className="toolbar_container">
                <div className="toolbar">
                    <Select 
                        handleToolSelect={handleToolSelect}
                        handleDrawCanvasShow={this.handleDrawCanvasShow}
                        registerDragHandler={registerDragHandler}
                    />
                    <Shape
                        handleToolSelect={handleToolSelect}
                        handleDrawCanvasShow={this.handleDrawCanvasShow}
                        registerDragHandler={registerDragHandler}
                        handleDragMove={this.handleElementDragMove}
                        handleDragEnd={this.handleDragEnd}
                    />
                    <Postit
                        handleToolSelect={handleToolSelect}
                        handleDrawCanvasShow={this.handleDrawCanvasShow}
                        registerDragHandler={registerDragHandler}
                        handleDragMove={this.handleElementDragMove}
                        handleDragEnd={this.handleDragEnd}
                    />
                    <Text
                        handleToolSelect={handleToolSelect}
                        handleDrawCanvasShow={this.handleDrawCanvasShow}
                        registerDragHandler={registerDragHandler}
                        handleDragMove={this.handleElementDragMove}
                        handleDragEnd={this.handleDragEnd}
                    />
                    {/* <Tool type="pen" handleToolSelect={handleToolSelect}/>
                    <Tool type="image" handleToolSelect={handleToolSelect}/>
                    <Tool type="more" handleToolSelect={handleToolSelect}/> */}
                </div>
                <div 
                    id="drawCanvas" 
                    style={drawCanvasStyles}
                    onMouseUp={this.handleDrawCanvasHide}
                ></div>
            </div>
        );
    }
    
  }

  export default Toolbar;