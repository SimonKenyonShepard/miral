import React, {Component} from 'react';

//Editors

import PredefinedColorPicker from './editors/predefinedColorPicker';
import CustomColorPicker from './editors/customColorPicker';
import CustomBorderColorPicker from './editors/customBorderColorPicker';
import BorderStyle from './editors/borderStyle';
import TextFormat from './editors/textFormat';
import FontStyle from './editors/fontStyle';
import TextAlignment from './editors/textAlignment';
import Link from './editors/link';
import DepthSetter from './editors/depthSetter';
import ElementLocker from './editors/elementLocker';
import ElementDeleter from './editors/elementDeleter';
import ElementEditorMenu from './editors/elementEditorMenu';
import Url from './editors/url';


import './styles.css';

const shapeTypeEditableFeatures = {
    "postit" : ["predefinedColor", "textFormat", "bringForward", "sendBackward", "lock", "delete", "menu"],
    "shape" : ["customColor", "customBorderColor", "borderStyle", "fontStyle", "textFormat",  "textAlignment", "bringForward", "sendBackward", "lock", "delete", "menu"],
    "text" : ["fontStyle", "textFormat", "textAlignment", "bringForward", "sendBackward", "lock", "delete", "menu"],
    "line" : ["customBorderColor", "borderStyle", "bringForward", "sendBackward", "lock", "delete", "menu"],
    "image" : ["url", "customBorderColor", "borderStyle", "bringForward", "sendBackward", "lock", "delete", "menu"],
    "slide" : ["customColor", "bringForward", "sendBackward", "lock", "delete", "menu"],
    "link" : ["link", "lock", "delete", "menu"]
};

const multiElementEditableFeatures = ["bringForward", "sendBackward", "lock", "delete", "menu"];

class ElementEditor extends Component {

    constructor(props, context) {
      super(props, context);
      this.state = {
        currentOpenSubMenu : null
      };
    }

    handleUpdateElementProperty = (data) => {
        data.id = this.props.selectedElements[0].id;
        this.props.handleUpdateElementProperty(data);
    }

    handleSetCurrentOpenSubMenu = (currentOpenSubMenu) => {
        this.setState({currentOpenSubMenu});
    }

    shouldComponentUpdate(nextProps) {
        const shouldUpdate = (this.props.selectedElements.length !== nextProps.selectedElements.length) || (nextProps.selectedElements.length > 0);
        if(shouldUpdate) {
            return true;
        } else {
            return false;
        }
    }

    

    handleKeyPress = (e) => {
        
        const isTextBox = this.props.textEditor !== null || e.target.tagName === "INPUT" || e.target.getAttribute("contentEditable") === "true";
        if(e.key === "Backspace" && !isTextBox) {
            e.preventDefault();
            this.handleDeleteElements();
        } else if(
            (e.ctrlKey === true && e.key === "d") ||
            (e.metaKey === true && e.key === "d")
        ) {
            e.preventDefault();
            this.handleDuplicateElements();
        }
        
    }

    render() {
        const containerPosition = {},
            {
                selectedElements,
                boundingBox,
                getSlides
            } = this.props;
        let containerClass = "elementEditor",
            editButtonTypes = null,
            editButtons = null;
        
        const selectedIDs = selectedElements.map(element => {
            return element.id;
        });
        
        if(selectedElements.length === 1) {
            editButtonTypes = shapeTypeEditableFeatures[selectedElements[0].type];
        } else if (selectedElements.length > 1) {
            editButtonTypes = multiElementEditableFeatures;
        }
        if(editButtonTypes) {
            editButtons = editButtonTypes.map(button => {
                switch (button) {
                    case 'predefinedColor':
                        return <PredefinedColorPicker 
                                    key={`${selectedElements[0].id}_${button}`}
                                    fillColor={selectedElements[0].predefinedColor}
                                    handleUpdateElementProperty={this.handleUpdateElementProperty}
                                    handleSetCurrentOpenSubMenu={this.handleSetCurrentOpenSubMenu}
                                    currentOpenSubMenu={this.state.currentOpenSubMenu}
                                />;
                    case 'customColor':
                        return <CustomColorPicker 
                                    key={`${selectedElements[0].id}_${button}`}
                                    currentStyles={selectedElements[0].styles}
                                    handleUpdateElementProperty={this.handleUpdateElementProperty}
                                    handleSetCurrentOpenSubMenu={this.handleSetCurrentOpenSubMenu}
                                    currentOpenSubMenu={this.state.currentOpenSubMenu}
                                />;
                    case 'customBorderColor':
                        return <CustomBorderColorPicker 
                                    key={`${selectedElements[0].id}_${button}`}
                                    currentStyles={selectedElements[0].styles}
                                    handleUpdateElementProperty={this.handleUpdateElementProperty}
                                    handleSetCurrentOpenSubMenu={this.handleSetCurrentOpenSubMenu}
                                    currentOpenSubMenu={this.state.currentOpenSubMenu}
                                />;
                    case 'borderStyle':
                        return <BorderStyle 
                                    key={`${selectedElements[0].id}_${button}`}
                                    currentStyles={selectedElements[0].styles}
                                    initialZoomLevel={selectedElements[0].initialZoomLevel}
                                    handleUpdateElementProperty={this.handleUpdateElementProperty}
                                    handleSetCurrentOpenSubMenu={this.handleSetCurrentOpenSubMenu}
                                    currentOpenSubMenu={this.state.currentOpenSubMenu}
                                />;
                    case 'textFormat':
                    return <TextFormat 
                                key={`${selectedElements[0].id}_${button}`}
                                fontStyle={selectedElements[0].fontStyle}
                                initialZoomLevel={selectedElements[0].initialZoomLevel}
                                handleUpdateElementProperty={this.handleUpdateElementProperty}
                                handleSetCurrentOpenSubMenu={this.handleSetCurrentOpenSubMenu}
                                currentOpenSubMenu={this.state.currentOpenSubMenu}
                            />;
                    case 'fontStyle':
                        return <FontStyle 
                                    key={`${selectedElements[0].id}_${button}`}
                                    fontStyle={selectedElements[0].fontStyle}
                                    initialZoomLevel={selectedElements[0].initialZoomLevel}
                                    handleUpdateElementProperty={this.handleUpdateElementProperty}
                                    handleSetCurrentOpenSubMenu={this.handleSetCurrentOpenSubMenu}
                                    currentOpenSubMenu={this.state.currentOpenSubMenu}
                                />;
                    case 'textAlignment':
                        return <TextAlignment 
                                    key={`${selectedElements[0].id}_${button}`}
                                    fontStyle={selectedElements[0].fontStyle}
                                    handleUpdateElementProperty={this.handleUpdateElementProperty}
                                    handleSetCurrentOpenSubMenu={this.handleSetCurrentOpenSubMenu}
                                    currentOpenSubMenu={this.state.currentOpenSubMenu}
                                />;
                    case 'link':
                        return <Link 
                                    key={`${selectedElements[0].id}_${button}`}
                                    link={selectedElements[0].link}
                                    getSlides={getSlides}
                                    handleUpdateElementProperty={this.handleUpdateElementProperty}
                                    handleSetCurrentOpenSubMenu={this.handleSetCurrentOpenSubMenu}
                                    currentOpenSubMenu={this.state.currentOpenSubMenu}
                                />;
                    case 'bringForward':
                        return <DepthSetter 
                                    type="forward" 
                                    key={`${selectedElements[0].id}_${button}`}
                                    handleShiftElementPosition={this.props.handleShiftElementPosition}
                                    ids={selectedIDs}
                                />;
                    case 'sendBackward':
                        return <DepthSetter 
                                    type="backward" 
                                    key={`${selectedElements[0].id}_${button}`}
                                    handleShiftElementPosition={this.props.handleShiftElementPosition}
                                    ids={selectedIDs}
                                />;
                    case 'lock':
                        return <ElementLocker key={`${selectedElements[0].id}_${button}`} />;
                    case 'delete':
                        return <ElementDeleter 
                                    key={`${selectedElements[0].id}_${button}`} 
                                    handleDeleteElements={this.props.handleDeleteElements}
                                />;
                    case 'url':
                        return <Url 
                                    key={`${selectedElements[0].id}_${button}`}
                                    imgURL={selectedElements[0].imgURL}
                                    handleUpdateElementProperty={this.handleUpdateElementProperty}
                                    handleSetCurrentOpenSubMenu={this.handleSetCurrentOpenSubMenu}
                                    currentOpenSubMenu={this.state.currentOpenSubMenu}
                                />;
                    case 'menu':
                        return <ElementEditorMenu options={shapeTypeEditableFeatures[selectedElements[0].type]} key={`${selectedElements[0].id}_${button}`} />;
                    default:
                      return null;
                  }
            });
            
            containerClass += " isVisible";

            const editorHeightPlusMargin = 40+56,
                  halfEditorWidth = (editButtons.length*40)/2,
                  halfElementWidth = boundingBox.width/2,
                  finalLeft = (boundingBox.x+halfElementWidth)-halfEditorWidth,
                  finalTop = boundingBox.y-editorHeightPlusMargin;

            containerPosition.left = `${finalLeft}px`;
            containerPosition.top = `${finalTop}px`;

        }
        
        return (
            <div className={containerClass} style={containerPosition}>
               {editButtons}
            </div>
        );
    }

    
  }

  export default ElementEditor;