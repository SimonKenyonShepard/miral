import React, {Component} from 'react';

import Select from './select';
import Shape from './shape';
import Postit from './postit';
import Text from './text';
import Line from './line';
import Emojis from './emojis';
import Image from './image';
import More from './more';

import './styles.css';

class Toolbar extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
          openSubMenu : null
        };
    }


    handleSetCurrentOpenSubMenu = (openSubMenu) => {
        this.props.handleDeselectAllElements();
        this.setState({openSubMenu});
    }

    handleElementDragMove(e) {
        const currentState = this.state;
        const newState = {};
        if(currentState.elementBeingDrawn !== null) {
            const newElementGraph = {...currentState.elements};
            const newStyles = {...newElementGraph[currentState.elementBeingDrawn].styles};
            newElementGraph[currentState.elementBeingDrawn].styles = newStyles;
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
            handleDeselectAllElements,
            registerDragHandler,
            handleShowSelectionArea,
            handleUpdateSelectionArea,
            handleDrawCanvasShow,
            handleSelectElementsWithinArea,
            currentSelectedTool
        } = this.props;

        return (
            <div className="toolbar_container"
            >
                <div className="toolbar">
                    <Select 
                        handleDeselectAllElements={handleDeselectAllElements}
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
                        handleDeselectAllElements={handleDeselectAllElements}
                        handleDrawCanvasShow={handleDrawCanvasShow}
                        registerDragHandler={registerDragHandler}
                        handleDragMove={this.handleElementDragMove}
                        handleDragEnd={this.handleDragEnd}
                        currentSelectedTool={currentSelectedTool}
                        openSubMenu={this.state.openSubMenu}
                        handleSetCurrentOpenSubMenu={this.handleSetCurrentOpenSubMenu}
                    />
                    <Postit
                        handleDeselectAllElements={handleDeselectAllElements}
                        handleDrawCanvasShow={handleDrawCanvasShow}
                        registerDragHandler={registerDragHandler}
                        handleDragMove={this.handleElementDragMove}
                        handleDragEnd={this.handleDragEnd}
                        currentSelectedTool={currentSelectedTool}
                        openSubMenu={this.state.openSubMenu}
                        handleSetCurrentOpenSubMenu={this.handleSetCurrentOpenSubMenu}
                    />
                    <Text
                        handleDeselectAllElements={handleDeselectAllElements}
                        handleDrawCanvasShow={handleDrawCanvasShow}
                        registerDragHandler={registerDragHandler}
                        handleDragMove={this.handleElementDragMove}
                        handleDragEnd={this.handleDragEnd}
                        currentSelectedTool={currentSelectedTool}
                        openSubMenu={this.state.openSubMenu}
                        handleSetCurrentOpenSubMenu={this.handleSetCurrentOpenSubMenu}
                    />
                    <Line
                        handleDeselectAllElements={handleDeselectAllElements}
                        handleDrawCanvasShow={handleDrawCanvasShow}
                        registerDragHandler={registerDragHandler}
                        handleDragMove={this.handleElementDragMove}
                        handleDragEnd={this.handleDragEnd}
                        currentSelectedTool={currentSelectedTool}
                        openSubMenu={this.state.openSubMenu}
                        handleSetCurrentOpenSubMenu={this.handleSetCurrentOpenSubMenu}
                    />
                    <Emojis
                        handleDeselectAllElements={handleDeselectAllElements}
                        handleDrawCanvasShow={handleDrawCanvasShow}
                        registerDragHandler={registerDragHandler}
                        handleDragMove={this.handleElementDragMove}
                        handleDragEnd={this.handleDragEnd}
                        currentSelectedTool={currentSelectedTool}
                        openSubMenu={this.state.openSubMenu}
                        handleSetCurrentOpenSubMenu={this.handleSetCurrentOpenSubMenu}
                    />
                    <Image handleDeselectAllElements={handleDeselectAllElements}
                        handleDrawCanvasShow={handleDrawCanvasShow}
                        registerDragHandler={registerDragHandler}
                        handleDragMove={this.handleElementDragMove}
                        handleDragEnd={this.handleDragEnd}
                        currentSelectedTool={currentSelectedTool}
                    />
                    <More 
                         handleDeselectAllElements={handleDeselectAllElements}
                         handleDrawCanvasShow={handleDrawCanvasShow}
                         registerDragHandler={registerDragHandler}
                         handleDragMove={this.handleElementDragMove}
                         handleDragEnd={this.handleDragEnd}
                         currentSelectedTool={currentSelectedTool}
                         openSubMenu={this.state.openSubMenu}
                         handleSetCurrentOpenSubMenu={this.handleSetCurrentOpenSubMenu}
                    />
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