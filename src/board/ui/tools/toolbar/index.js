import React, {Component} from 'react';

import Pan from './pan';
import Select from './select';
import Shape from './shape';
import Postit from './postit';
import Text from './text';
import Line from './line';

import './styles.css';

class Toolbar extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
          openSubMenu : null
        };
    }


    handleSetCurrentOpenSubMenu = (openSubMenu) => {
        this.setState({openSubMenu});
    }

    handleElementDragMove(e) {
        const currentState = this.state;
        const newState = {};
        if(currentState.elementBeingDrawn !== null) {
            const newElementGraph = {...currentState.elements};
            if(newElementGraph[currentState.elementBeingDrawn].fixedRatio) {
                let multiplier = e.movementX;
                if(e.movementY > multiplier) {
                    multiplier = e.movementY;
                }
                newElementGraph[currentState.elementBeingDrawn].styles.width += multiplier*currentState.zoomLevel;
                newElementGraph[currentState.elementBeingDrawn].styles.height += multiplier*currentState.zoomLevel;

            } else {
                newElementGraph[currentState.elementBeingDrawn].styles.width += e.movementX*currentState.zoomLevel;
                newElementGraph[currentState.elementBeingDrawn].styles.height += e.movementY*currentState.zoomLevel;
            }
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
            handleSelectElementsWithinArea,
            currentSelectedTool
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
                        currentSelectedTool={currentSelectedTool}
                        openSubMenu={this.state.openSubMenu}
                        handleSetCurrentOpenSubMenu={this.handleSetCurrentOpenSubMenu}
                    />
                    <Shape
                        handleToolSelect={handleToolSelect}
                        handleDrawCanvasShow={handleDrawCanvasShow}
                        registerDragHandler={registerDragHandler}
                        handleDragMove={this.handleElementDragMove}
                        handleDragEnd={this.handleDragEnd}
                        currentSelectedTool={currentSelectedTool}
                        openSubMenu={this.state.openSubMenu}
                        handleSetCurrentOpenSubMenu={this.handleSetCurrentOpenSubMenu}
                    />
                    <Postit
                        handleToolSelect={handleToolSelect}
                        handleDrawCanvasShow={handleDrawCanvasShow}
                        registerDragHandler={registerDragHandler}
                        handleDragMove={this.handleElementDragMove}
                        handleDragEnd={this.handleDragEnd}
                        currentSelectedTool={currentSelectedTool}
                        openSubMenu={this.state.openSubMenu}
                        handleSetCurrentOpenSubMenu={this.handleSetCurrentOpenSubMenu}
                    />
                    <Text
                        handleToolSelect={handleToolSelect}
                        handleDrawCanvasShow={handleDrawCanvasShow}
                        registerDragHandler={registerDragHandler}
                        handleDragMove={this.handleElementDragMove}
                        handleDragEnd={this.handleDragEnd}
                        currentSelectedTool={currentSelectedTool}
                        openSubMenu={this.state.openSubMenu}
                        handleSetCurrentOpenSubMenu={this.handleSetCurrentOpenSubMenu}
                    />
                    <Line
                        handleToolSelect={handleToolSelect}
                        handleDrawCanvasShow={handleDrawCanvasShow}
                        registerDragHandler={registerDragHandler}
                        handleDragMove={this.handleElementDragMove}
                        handleDragEnd={this.handleDragEnd}
                        currentSelectedTool={currentSelectedTool}
                        openSubMenu={this.state.openSubMenu}
                        handleSetCurrentOpenSubMenu={this.handleSetCurrentOpenSubMenu}
                    />
                    {/* <Tool type="pen" handleToolSelect={handleToolSelect}/>
                    <Tool type="image" handleToolSelect={handleToolSelect}/>
                    <Tool type="more" handleToolSelect={handleToolSelect}/> */}
                </div>
            </div>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        if(
            this.props.currentSelectedTool === "pan" &&
            this.state.openSubMenu !== null && 
            prevState.openSubMenu === this.state.openSubMenu
        ) {
            this.setState({openSubMenu : null});
        }
    }
    
  }

  export default Toolbar;