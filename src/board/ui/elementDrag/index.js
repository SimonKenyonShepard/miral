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

        return (
            <rect 
                id={"elementSelectionArea"}
                height={boundingBox.rawHeight}
                width={boundingBox.rawWidth}
                x={boundingBox.rawX}
                y={boundingBox.rawY}
                fillOpacity={0}
            />
        );
    }
    
    componentDidUpdate(prevProps) {
        const currentSelectedElements = this.props.selectedElementKeys,
              prevSelectedElements = prevProps.selectedElementKeys;

        const removedElements = prevSelectedElements.filter(element => {
            if(currentSelectedElements.indexOf(element) === -1) {
                return true;
            }
            return false;
        });

        const addedElements = currentSelectedElements.filter(element => {
            if(prevSelectedElements.indexOf(element) === -1) {
                return true;
            }
            return false;
        });

        if(removedElements.length > 0) {
            removedElements.forEach(id => {
                this.props.removeDragHandler(id);
            });
        }

        if(addedElements.length > 0) {
            addedElements.forEach(id => {
                this.props.registerDragHandler(id, {
                    "dragMoveHandler" : this.updateElementDragPosition
                });
            })
        }
        

    }

    componentDidMount() {
        this.props.registerDragHandler("elementSelectionArea", {
            "dragMoveHandler" : this.updateElementDragPosition
        });
    }
}

export default ElementDrag;