import React, {Component} from 'react';

import './styles.css';

class Resizer extends Component {

    handleMouseMove(e) {
        const currentState = this.state;
        const selectedElements = [];
        Object.keys(this.state.elementState).forEach(item => {
            if(this.state.elementState[item].selected) {
                selectedElements.push(this.state.elements[item]);
            }
        });
        const newState = {};
        if(selectedElements) {
            const newElementsData = {...currentState.elements};
            if(selectedElements.length > 1) {
                selectedElements.forEach(item => {
                    newElementsData[item.id].styles.width += e.movementX*currentState.zoomLevel;
                    newElementsData[item.id].styles.height += e.movementX*currentState.zoomLevel;
                });
            } else if(selectedElements.length === 1 && selectedElements[0].fixedRatio) {
                let elementID = selectedElements[0].id;
                newElementsData[elementID].styles.width += e.movementX*currentState.zoomLevel;
                newElementsData[elementID].styles.height += e.movementX*currentState.zoomLevel;
            } else if(selectedElements.length === 1) {
                let elementID = selectedElements[0].id;
                newElementsData[elementID].styles.width += e.movementX*currentState.zoomLevel;
                newElementsData[elementID].styles.height += e.movementY*currentState.zoomLevel;
            }
            this.setState({newState});
        }
        
    }

    render() {
        const { boundingBox, isVisible } = this.props;

        const wrapperStyles = {
            display: "none"
        };

        if(isVisible) {
            wrapperStyles.display = "block";
        }
        const resizerStyles = {
            position : "absolute",
            height : `16px`,
            width : `16px`,
            top : `0`,
            left : `0`,
            transform : `translate3d(${(boundingBox.cx-8)}px,${(boundingBox.cy-8)}px, 0)`
        };

        const highlightBoxPosition = {
            x : boundingBox.x,
            y : boundingBox.y,
            height : boundingBox.height,
            width : boundingBox.width
        };

        if(highlightBoxPosition.width < 0) {
            highlightBoxPosition.x += highlightBoxPosition.width;
            highlightBoxPosition.width = highlightBoxPosition.width * -1;
        }

        if(highlightBoxPosition.height < 0) {
            highlightBoxPosition.y += highlightBoxPosition.height;
            highlightBoxPosition.height = highlightBoxPosition.height * -1;
        }

        const elementHighlightStyles = {
            position : "absolute",
            height : `${highlightBoxPosition.height}px`,
            width : `${highlightBoxPosition.width}px`,
            top : `0`,
            left : `0`,
            transform : `translate3d(${(highlightBoxPosition.x)}px,${(highlightBoxPosition.y)}px, 0)`
        };

        return (
            <div className="resizerWrapper" style={wrapperStyles}>
                <div className="elementsHightlight" style={elementHighlightStyles}/>
                <svg style={resizerStyles} height="16" width="16" viewBox="-8 -8 16 16">
                    <circle
                    id={"resizerHandle"}
                    cx={0} 
                    cy={0} 
                    r={6}
                    fill={"white"}
                    stroke={"grey"}
                    strokeWidth={2}
                    strokeOpacity={0.5} 
                    cursor={"nwse-resize"}>
                    </circle>
                </svg>
            </div>
           
        );
    }

    componentDidMount() {
        this.props.registerDragHandler("resizerHandle", {
            "dragMoveHandler" : this.handleMouseMove
        });
    }
}

export default Resizer;