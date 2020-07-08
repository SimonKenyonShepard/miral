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
                if(this.props.selectedElements.length > 1) {
                    this.props.selectedElements.forEach(item => {
                        newElementsData[item.id].styles.width += e.movementX*currentState.zoomLevel;
                        newElementsData[item.id].styles.height += e.movementX*currentState.zoomLevel;
                    });
                } else if(this.props.selectedElements.length === 1 && this.props.selectedElements[0].fixedRatio) {
                    let elementID = this.props.selectedElements[0].id;
                    newElementsData[elementID].styles.width += e.movementX*currentState.zoomLevel;
                    newElementsData[elementID].styles.height += e.movementX*currentState.zoomLevel;
                } else if(this.props.selectedElements.length === 1) {
                    let elementID = this.props.selectedElements[0].id;
                    newElementsData[elementID].styles.width += e.movementX*currentState.zoomLevel;
                    newElementsData[elementID].styles.height += e.movementY*currentState.zoomLevel;
                }
                
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
            let width = selectedElements[0].styles.width,
                height = selectedElements[0].styles.height,
                x = selectedElements[0].styles.cx || selectedElements[0].styles.x,
                y = selectedElements[0].styles.cy || selectedElements[0].styles.y,
                cx = x+width,
                cy = y+height,
                combinedWidth = 0,
                combinedHeight = 0;
            let strokeWidth = selectedElements[0].styles.strokeWidth;
            if(selectedElements.length > 1) {
                selectedElements.forEach(item => {
                    let itemWidth = item.styles.width,
                        itemHeight = item.styles.height,
                        itemX = item.styles.cx || item.styles.x,
                        itemY = item.styles.cy || item.styles.y,
                        itemCX = itemX+itemWidth,
                        itemCY = itemY+itemHeight;
                    
                    if (itemX < x) {
                        x = itemX;
                    }
                    if(itemCX > cx) {
                        cx = itemCX;
                    }
                    if (itemY < y) {
                        y = itemY;
                    }
                    if(itemCY > cy) {
                        cy = itemCY;
                    }
                    if(item.styles.strokeWidth > strokeWidth) {
                        strokeWidth = item.styles.strokeWidth;
                    }
                });
                combinedWidth = cx-x;
                combinedHeight = cy-y;
            }
            resizeHandle = (
                <g>
                    <rect
                        height={(combinedHeight || height)}
                        width={(combinedWidth || width)}
                        x={x}
                        y={y}
                        stroke={"blue"}
                        strokeOpacity={0.5}
                        strokeWidth={strokeWidth}
                        fillOpacity={0} 
                    />
                    <circle
                        onMouseDown={this.handleMouseDown}
                        cx={cx} 
                        cy={cy} 
                        r={500} 
                        fill={"white"}
                        stroke={"grey"}
                        strokeWidth={strokeWidth}
                        strokeOpacity={0.5} 
                        cursor={"nwse-resize"}>
                    </circle>
                </g>
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