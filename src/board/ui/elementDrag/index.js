import React, {Component} from 'react';

import './styles.css';

class ElementDrag extends Component {

    updateElementDragPosition(e) {
        const {
            zoomLevel
        } = this.state;

        const newElementsData = {...this.state.elements};
        const selectedItems = Object.keys(this.state.elementState).filter(item => {
            if(this.state.elementState[item].selected) {
                return true;
            }
            return false;
        });
        if(selectedItems.length) {
            selectedItems.forEach(element => {
                newElementsData[element].styles.x += e.movementX*zoomLevel;
                newElementsData[element].styles.y += e.movementY*zoomLevel;
            });
            this.setState({
                elements : newElementsData
            });
        }
    }

    render() {
        const { boundingBox } = this.props;
           
        const highlighterStyles = {
            height : `${boundingBox.height}px`,
            width : `${boundingBox.width}px`,
            top : `${boundingBox.y}px`,
            left : `${boundingBox.x}px`
        }

        return (
            <div id={"elementSelectionHighlight"} style={highlighterStyles} />
        );
    }

    componentDidMount() {
        this.props.registerDragHandler("elementSelectionHighlight", {
            "dragMoveHandler" : this.updateElementDragPosition
        });
    }
}

export default ElementDrag;