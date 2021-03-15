import React, {Component} from 'react';
import VisibilityOverlay from '../shared/visibilityOverlay';
import WrappedText from '../shared/wrappedText';

import './styles.css';

class Shape extends Component {

    constructor(props, context) {
      super(props, context);
      this.state = {};
    }

    handleTextEdit = (e) => {
        this.props.handleTextEdit(this.props.data.id);
    }
  
    render() {
        const {elementState, data} = this.props;
        const shapeProps = {...this.props.data.styles};
        let text = null;
        let shape = null;
        let overlay = null;
        let visibility = null;
        if(this.props.isSelected(data.id)) {
            shapeProps.style = {outlineWidth : `${(data.initialZoomLevel)}px`};
            shapeProps.className = "elementSelectedByUser";
        } else if(elementState.selected) {
            shapeProps.style = {outlineWidth : `${(data.initialZoomLevel)}px`};
            shapeProps.className = "elementSelectedByOtherUser";
            overlay = (<rect 
                {...shapeProps}
                fillOpacity={"0.3"}
                fill="#000000"
            />);
        }
        
        if(data.text) {
            text = (
                <WrappedText
                    shapeProps={shapeProps}
                    fontStyle={data.fontStyle}
                    text={data.text}
                    padding={data.padding}
                />
            );
        }

        if(data.shapeType === 0) {
            shape = <rect
                id={data.id} 
                {...shapeProps}
            />;
        } else if (data.shapeType === 1) {
            shapeProps.r = shapeProps.width/2;
            shapeProps.cx = shapeProps.x+shapeProps.r;
            shapeProps.cy = shapeProps.y+shapeProps.r;
            
            shape = <circle
                id={data.id} 
                {...shapeProps}
            />;
        } else if (data.shapeType === 2) {
            const triangleStart = `${shapeProps.x+shapeProps.width/2},${shapeProps.y}`,
                  triangleMid = `${shapeProps.x},${shapeProps.y+shapeProps.height}`,
                  triangleEnd = `${shapeProps.x+shapeProps.width},${shapeProps.y+shapeProps.height}`;
            shapeProps.points = `${triangleStart} ${triangleMid} ${triangleEnd}`;
            shape = <polygon
                id={data.id} 
                {...shapeProps}
            />;
        } else {
            shape = <text>No Shape Type Set</text>;
        }

        return (
            <g 
                onDoubleClick={this.handleTextEdit}
                height={shapeProps.height}
                width={shapeProps.width}
            >
                {shape}
                {text}
                {overlay}
                {visibility}
                {data.hidden && (
                    <VisibilityOverlay 
                        shapeProps={shapeProps}
                    />
                )}
            </g>
        );
    }
    
  }

  export default Shape;