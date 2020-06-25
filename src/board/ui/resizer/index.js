import React, {Component} from 'react';

import './styles.css';

class Resizer extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
          resizing: false
        };
    }

    handleMouseDown = (e) => {
        if(this.state.resizing === false) {
            this.setState({
                resizing : true
            });
            this.props.handleSetDragHandler({
                "dragMoveHandler" : this.handleMouseMove,
                "dragEndHandler" : this.handleMouseUp
            });
        }
    }

    handleMouseMove = (e, currentState) => {
        if(this.state.resizing === true) {
            const newState = {};
            if(this.props.selectedElements) {
                const newElementsData = {...currentState.elements};
                this.props.selectedElements.forEach(item => {
                    newElementsData[item.id].styles.width += e.movementX*currentState.zoomLevel;
                    newElementsData[item.id].styles.height += e.movementY*currentState.zoomLevel;
                });
            }
            return newState;
        } else {
            return {};
        }
    }

    handleMouseUp = (e) => {
        if(this.state.resizing === true) {
            this.setState({
                resizing : false
            });
        }
    }

    render() {
        let resizeHandle = "";
        const {selectedElements} = this.props;
        if(selectedElements && selectedElements.length > 0) {
            let x = 0;
            let y = 0;
            let strokeWidth = 0;
            selectedElements.forEach(item => {
                let itemX = (item.styles.cx || item.styles.x)+item.styles.width;
                let itemY = (item.styles.cy || item.styles.y)+item.styles.height;
                if(itemX > x) {
                    x = itemX;
                }
                if(itemY > y) {
                    y = itemY;
                }
                if(item.styles.strokeWidth > strokeWidth) {
                    strokeWidth = item.styles.strokeWidth;
                }
            });
            resizeHandle = (
                <circle
                    onMouseDown={this.handleMouseDown}
                    cx={x} 
                    cy={y} 
                    r={500} 
                    fill={"white"}
                    stroke={"grey"}
                    strokeWidth={strokeWidth}
                    strokeOpacity={0.5} 
                    cursor={"nwse-resize"}>
                </circle>
            );
        }
        return (
            <g>
                {resizeHandle}
            </g>
        );
    }
}

export default Resizer;