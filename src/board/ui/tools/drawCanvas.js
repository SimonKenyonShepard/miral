import React, {PureComponent} from 'react';
import { store } from '../../context/tools';

import './styles.css';

class DrawCanvas extends PureComponent {

    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    handleDrawCanvasHide = (e) => {
        const resetSelectArea = {
            selectAreaVisible : false,
            selectAreaPosition : {
                x : 0,
                y : 0,
                width : 0,
                height : 0,
            }
        };
        const resetDrawCanvas = {
            drawCanvasVisible : false
        };
        this.props.removeDragHandler("drawCanvas");
        this.context.dispatch({type : "resetToolbar"});
        this.setState(Object.assign({}, resetSelectArea, resetDrawCanvas));
    }
  
    render() {
        const {
            selectAreaVisible,
            selectAreaPosition
        } = this.context.state;

        const selectAreaStyle = {
            display : "none"
        };

        if(selectAreaVisible) {
            selectAreaStyle.display = "block";
            selectAreaStyle.transform = `translate3d(${(selectAreaPosition.x)}px,${(selectAreaPosition.y)}px, 0)`
            selectAreaStyle.width = `${selectAreaPosition.width}px`;
            selectAreaStyle.height = `${selectAreaPosition.height}px`;
        }

        const drawCanvasStyles = {
            display : "none"
        };
        if(this.context.state.tool && this.context.state.tool !== "pan") {
            drawCanvasStyles.display = "block";
        }

        return (
                <div 
                    id="drawCanvas" 
                    style={drawCanvasStyles}
                    onPointerUp={this.handleDrawCanvasHide}
                    //onPointerOut={this.handleDrawCanvasHide}
                >
                    <div className={"selectionArea"} style={selectAreaStyle}/>
                </div>
        );
    }
    
  }

  DrawCanvas.contextType = store;

  export default DrawCanvas;