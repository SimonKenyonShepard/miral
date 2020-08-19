import React, {Component} from 'react';

import Pan from './pan';
import Select from './select';
import Shape from './shape';
import Postit from './postit';
import Text from './text';

import './styles.css';

class Toolbar extends Component {

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
        this.setState(newState);
    }
  
    render() {
        const {
            handleToolSelect,
            registerDragHandler,
            handleShowSelectionArea,
            handleUpdateSelectionArea,
            handleDrawCanvasShow,
            handleSelectElementsWithinArea
        } = this.props;

        return (
            <div className="toolbar_container">
                <div className="toolbar">
                    <Select 
                        handleToolSelect={handleToolSelect}
                        handleDrawCanvasShow={handleDrawCanvasShow}
                        registerDragHandler={registerDragHandler}
                        handleShowSelectionArea={handleShowSelectionArea}
                        handleUpdateSelectionArea={handleUpdateSelectionArea}
                        handleSelectElementsWithinArea={handleSelectElementsWithinArea}
                    />
                    <Shape
                        handleToolSelect={handleToolSelect}
                        handleDrawCanvasShow={handleDrawCanvasShow}
                        registerDragHandler={registerDragHandler}
                        handleDragMove={this.handleElementDragMove}
                        handleDragEnd={this.handleDragEnd}
                    />
                    <Postit
                        handleToolSelect={handleToolSelect}
                        handleDrawCanvasShow={handleDrawCanvasShow}
                        registerDragHandler={registerDragHandler}
                        handleDragMove={this.handleElementDragMove}
                        handleDragEnd={this.handleDragEnd}
                    />
                    <Text
                        handleToolSelect={handleToolSelect}
                        handleDrawCanvasShow={handleDrawCanvasShow}
                        registerDragHandler={registerDragHandler}
                        handleDragMove={this.handleElementDragMove}
                        handleDragEnd={this.handleDragEnd}
                    />
                    {/* <Tool type="pen" handleToolSelect={handleToolSelect}/>
                    <Tool type="image" handleToolSelect={handleToolSelect}/>
                    <Tool type="more" handleToolSelect={handleToolSelect}/> */}
                </div>
            </div>
        );
    }
    
  }

  export default Toolbar;