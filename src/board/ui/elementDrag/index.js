import React, {Component} from 'react';

import './styles.css';

class ElementDrag extends Component {

    handleSelect(e) {
        const elementID = e.target.id;
        const isMultiSelect = e.metaKey;
        this.handleSetCurrentElement(elementID, isMultiSelect);
    }

    updateElementDragPosition(e) {
        const {
            zoomLevel
        } = this.state;

        const newElementsData = {...this.state.elements};
        const selectedItemKeys = Object.keys(this.state.elementState).filter(item => {
            if(this.isSelected(item)) {
                return true;
            }
            return false;
        });
        if(selectedItemKeys.length) {
            selectedItemKeys.forEach(element => {
                const newElement = {...newElementsData[element]};
                const newStyles = {...newElementsData[element].styles};
                newStyles.x += e.movementX*zoomLevel;
                newStyles.y += e.movementY*zoomLevel;
                newElement.styles = newStyles;
                newElementsData[element] = newElement;
            });
            this.setState({
                elements : newElementsData
            });
        }
    }

    shouldComponentUpdate(nextProps) {
        const needsUpdate = (nextProps.boundingBox.rawHeight !== this.props.boundingBox.rawHeight) ||
        (nextProps.boundingBox.rawWidth !== this.props.boundingBox.rawWidth) ||
        (nextProps.boundingBox.rawX !== this.props.boundingBox.rawX) ||
        (nextProps.boundingBox.rawY !== this.props.boundingBox.rawY) ||
        (nextProps.elementKeys.length !== this.props.elementKeys.length);

        return needsUpdate;
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
        
        const currentElements = this.props.elementKeys,
              prevElements = prevProps.elementKeys;

        const removedElements = prevElements.filter(element => {
            if(currentElements.indexOf(element) === -1) {
                return true;
            }
            return false;
        });

        const addedElements = currentElements.filter(element => {
            if(prevElements.indexOf(element) === -1) {
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
                    "dragMoveHandler" : this.updateElementDragPosition,
                    "clickHandler" : this.handleSelect
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