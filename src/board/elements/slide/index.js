import React, {PureComponent} from 'react';

import './styles.css';

class Slide extends PureComponent {

    constructor(props, context) {
      super(props, context);
      this.state = {};
    }
  
    render() {
        const {elementState, data} = this.props;
        const shapeProps = {...this.props.data.styles};
        let background = null;
        let shape = null;
        let overlay = null;
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

        const fontSize = `${16*data.initialZoomLevel}px`,
              lineHeight = `${16*data.initialZoomLevel*1.4}px`;

        const slideTitle = (data.slideName === "Unnamed") ? `Slide ${this.props.slideNumber}` : data.slideName;
            
        background = (
            <foreignObject
                className="svg_slideContainer_foreignObject"
                x={shapeProps.x}
                y={shapeProps.y}
                height={shapeProps.height}
                width={shapeProps.width}
            >
                <div className={"svg_SlideWrapper"}>
                    <div 
                        className="svg_slideHeader"
                    >
                        <div
                            style={{
                                fontSize,
                                lineHeight,
                                padding : `0 ${(16*data.initialZoomLevel)}px`
                            }}
                        >{slideTitle}</div>
                    </div>
                    <div 
                        className="svg_slideBackground"
                        style={{
                            border : `${(data.initialZoomLevel*2)}px outset`,
                            width : `${(shapeProps.width-(data.initialZoomLevel*4))}px`,
                            backgroundColor : shapeProps.fill
                        }}
                    />
                </div>
            </foreignObject>
        );
        shape = <rect
            id={data.id} 
            {...shapeProps}
            fillOpacity={0}
        />;

        
        return (
            <g
                height={shapeProps.height}
                width={shapeProps.width}
            >
                {shape}
                {background}
                {overlay}
            </g>
        );
    }
    
  }

  export default Slide;