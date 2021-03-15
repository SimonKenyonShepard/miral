import React, {PureComponent} from 'react';
import VisibilityOverlay from '../shared/visibilityOverlay';

import './styles.css';

class Image extends PureComponent {

    constructor(props, context) {
      super(props, context);
      this.state = {};
    }

    handleCrop = (e) => {

    }
  
    render() {
        const {elementState, data} = this.props;
        const shapeProps = {...this.props.data.styles};
        let image = null;
        let shape = null;
        let overlay = null;
        if(this.props.isSelected(data.id)) {
            shapeProps.style = {outline : `${(data.initialZoomLevel)}px dashed #5086F2`};
        } else if(elementState.selected) {
            shapeProps.style = {outline : `${(data.initialZoomLevel)}px solid #666`};
            overlay = (<rect 
                {...shapeProps}
                fillOpacity={"0.3"}
                fill="#000000"
            />);
        }
            
        image = (
            <image
                className="svg_imageContainer"
                href={data.URL}
                x={shapeProps.x}
                y={shapeProps.y}
                height={shapeProps.height}
                width={shapeProps.width}
            />
        );
        shape = <rect
            id={data.id} 
            {...shapeProps}
        />;

        
        return (
            <g 
                onDoubleClick={this.handleCrop}
                height={shapeProps.height}
                width={shapeProps.width}
            >
                {shape}
                {image}
                {overlay}
                {data.hidden && (
                    <VisibilityOverlay 
                        shapeProps={shapeProps}
                    />
                )}
            </g>
        );
    }
    
  }

  export default Image;