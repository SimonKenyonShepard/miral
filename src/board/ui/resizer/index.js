import React, {Component} from 'react';

import './styles.css';

class Resizer extends Component {

    handleMouseMove(e) {
        const currentState = this.state;
        const selectedElements = [];
        Object.keys(this.state.elementState).forEach(item => {
            if(this.state.elementState[item].selected === this.state.userID) {
                selectedElements.push(this.state.elements[item]);
            }
        });
        const newState = {};
        if(selectedElements) {
            const newElementsData = {...currentState.elements};
            if(selectedElements.length > 1) {
                const boundingBox = this.calculateSelectedElementsBoundingBox(selectedElements, currentState.zoomLevel, currentState.offsetX, currentState.offsetY);
                const xPercentageIncrease = (boundingBox.rawWidth + (e.movementX*currentState.zoomLevel))/boundingBox.rawWidth,
                      yPercentageIncrease = (boundingBox.rawHeight + (e.movementY*currentState.zoomLevel))/boundingBox.rawHeight;
                selectedElements.forEach(item => {
                    const newElement = {...newElementsData[item.id]};
                    newElementsData[item.id] = newElement;
                    const newElementStyles = {...newElement.styles};
                    newElement.styles = newElementStyles;
                    //TOTEST : Multi-selected elements resize correctly 
                    newElement.styles.width *= xPercentageIncrease;
                    newElement.styles.height *= yPercentageIncrease;
                    const relativeXOffset = newElement.styles.x-boundingBox.rawX,
                          relativeYOffset = newElement.styles.y-boundingBox.rawY;

                    newElement.styles.x = (newElement.styles.x-relativeXOffset)+(relativeXOffset*xPercentageIncrease);
                    newElement.styles.y = (newElement.styles.y-relativeYOffset)+(relativeYOffset*yPercentageIncrease);

                    if(newElement.fontSizeAuto) {
                        newElement.fontStyle = {...newElement.fontStyle};
                        const fontStyleIncreaseMultiplier = (newElementsData[item.id].styles.width + (e.movementX*currentState.zoomLevel)) / newElementsData[item.id].styles.width;
                        newElementsData[item.id].fontStyle.fontSize = fontStyleIncreaseMultiplier * newElementsData[item.id].fontStyle.fontSize;
                    }
                });
            } else if(selectedElements.length === 1 && selectedElements[0].fixedRatio) {
                //TOTEST : Fixed ratio elements resize correctly 
                let element = newElementsData[selectedElements[0].id];
                const newElement = {...element};
                newElementsData[selectedElements[0].id] = newElement;
                const newElementStyles = {...newElement.styles};
                newElement.styles = newElementStyles;
                newElementStyles.width += e.movementX*currentState.zoomLevel;
                newElementStyles.height += e.movementX*currentState.zoomLevel;
                if(element.fontSizeAuto) {
                    newElement.fontStyle = {...newElement.fontStyle};
                    const fontStyleIncreaseMultiplier = (newElement.styles.width + (e.movementX*currentState.zoomLevel)) / newElement.styles.width;
                    newElement.fontStyle.fontSize = fontStyleIncreaseMultiplier * newElement.fontStyle.fontSize;
                }
            } else if(selectedElements.length === 1) {
                //TOTEST : Single elements resize correctly
                let element = newElementsData[selectedElements[0].id];
                const newElement = {...element};
                newElementsData[selectedElements[0].id] = newElement;
                const newElementStyles = {...newElement.styles};
                newElement.styles = newElementStyles;
                newElement.styles.width += e.movementX*currentState.zoomLevel;
                newElement.styles.height += e.movementY*currentState.zoomLevel;
                if(newElement.fontSizeAuto) {
                    const fontStyleIncreaseMultiplier = (newElement.styles.width+ (e.movementX*currentState.zoomLevel)) / newElement.styles.width;
                    newElement.fontStyle.fontSize = fontStyleIncreaseMultiplier * newElement.fontStyle.fontSize;
                }
            }
            newState.elements = newElementsData;
            this.setState(newState);
        }
        
    }

    handleResizeEnd() {
        this.setState({
            storeUndo : true
        });
    }

    shouldComponentUpdate(nextProps) {
        const needsUpdate = (nextProps.boundingBox.height !== this.props.boundingBox.height) ||
        (nextProps.boundingBox.width !== this.props.boundingBox.width) ||
        (nextProps.boundingBox.x !== this.props.boundingBox.x) ||
        (nextProps.boundingBox.y !== this.props.boundingBox.y) ||
        (nextProps.boundingBox.cx !== this.props.boundingBox.cx) ||
        (nextProps.boundingBox.cy !== this.props.boundingBox.cy) ||
        (nextProps.isVisible !== this.props.isVisible);

        return needsUpdate;
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
            "dragMoveHandler" : this.handleMouseMove,
            "dragEndHandler" : this.handleResizeEnd
        });
    }
}

export default Resizer;