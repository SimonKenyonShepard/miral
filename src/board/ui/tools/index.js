import React, {PureComponent} from 'react';

import Toolbar from './toolbar';

import './styles.css';

class Tools extends PureComponent {

    constructor(props, context) {
        super(props, context);
        this.state = {
          selectAreaPosition : {
            x : 0,
            y : 0,
            width : 0,
            height : 0,
          }
        };
    }

    render() {
        const {
            handleDeselectAllElements,
            registerDragHandler,
            handleSelectElementsWithinArea,
            currentSelectedTool
        } = this.props;
        return (
            <div className="tools">
                <Toolbar
                    handleDeselectAllElements={handleDeselectAllElements} 
                    registerDragHandler={registerDragHandler}
                    handleDrawCanvasShow={this.handleDrawCanvasShow}
                    handleShowSelectionArea={this.handleShowSelectionArea}
                    handleUpdateSelectionArea={this.handleUpdateSelectionArea}
                    handleSelectElementsWithinArea={handleSelectElementsWithinArea}
                    currentSelectedTool={currentSelectedTool}

                />
            </div>
        );
    }
    
  }

  export default Tools;