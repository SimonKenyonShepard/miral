import React, {Component} from 'react';

//Editors

import PredefinedColorPicker from './editors/predefinedColorPicker';
import FontStyle from './editors/fontStyle';
import TextAlignment from './editors/textAlignment';
import Link from './editors/link';
import DepthSetter from './editors/depthSetter';
import ElementLocker from './editors/elementLocker';
import ElementDeleter from './editors/elementDeleter';
import ElementEditorMenu from './editors/elementEditorMenu';


import './styles.css';

const shapeTypeEditableFeatures = {
    "postit_square" : ["predefinedColor", "fontStyle", "textAlignment", "link", "bringForward", "sendBackward", "lock", "delete", "menu"],
    "rect" : ["predefinedColor", "fontStyle", "textAlignment", "link", "bringForward", "sendBackward", "lock", "delete", "menu"]
};


class ElementEditor extends Component {

    constructor(props, context) {
      super(props, context);
      this.state = {
        
      };
    }

    handleUpdateElementProperty = (data) => {
        data.id = this.props.selectedElements[0].id;
        this.props.handleUpdateElementProperty(data);
    }

    render() {

        const containerPosition = {},
              {selectedElements, gridSpace} = this.props;
        let containerClass = "elementEditor",
            editButtons = null;
        
        if(selectedElements.length === 1) {

            editButtons = shapeTypeEditableFeatures[selectedElements[0].type].map(button => {
                switch (button) {
                    case 'predefinedColor':
                        return <PredefinedColorPicker 
                                    key={`${selectedElements[0].id}_${button}`}
                                    fillColor={selectedElements[0].predefinedColor}
                                    handleUpdateElementProperty={this.handleUpdateElementProperty}
                                />;
                    case 'fontStyle':
                        return <FontStyle key={`${selectedElements[0].id}_${button}`}/>;
                    case 'textAlignment':
                        return <TextAlignment key={`${selectedElements[0].id}_${button}`}/>;
                    case 'link':
                        return <Link key={`${selectedElements[0].id}_${button}`}/>;
                    case 'bringForward':
                        return <DepthSetter type="forward" key={`${selectedElements[0].id}_${button}`} />;
                    case 'sendBackward':
                        return <DepthSetter type="backward" key={`${selectedElements[0].id}_${button}`} />;
                    case 'lock':
                        return <ElementLocker key={`${selectedElements[0].id}_${button}`} />;
                    case 'delete':
                        return <ElementDeleter key={`${selectedElements[0].id}_${button}`} />;
                    case 'menu':
                        return <ElementEditorMenu options={shapeTypeEditableFeatures[selectedElements[0].type]} key={`${selectedElements[0].id}_${button}`} />;
                    default:
                      return null;
                  }
            });
            
            containerClass += " isVisible";

            const editorHeightPlusMargin = 40+56,
                  halfEditorWidth = (editButtons.length*40)/2,
                  halfElementWidth = (selectedElements[0].styles.width/gridSpace.zoomLevel)/2,
                  elementX = ((selectedElements[0].styles.x/gridSpace.zoomLevel)+halfElementWidth)-halfEditorWidth,
                  elementY = (selectedElements[0].styles.y/gridSpace.zoomLevel)-editorHeightPlusMargin;

            containerPosition.left = `${elementX}px`;
            containerPosition.top = `${elementY}px`;

        }
        
        return (
            <div className={containerClass} style={containerPosition}>
               {editButtons}
            </div>
        );
    }

    
  }

  export default ElementEditor;