import React, {PureComponent} from 'react';
import VisibilityOverlay from '../shared/visibilityOverlay';

import './styles.css';

class Emoji extends PureComponent {

    constructor(props, context) {
      super(props, context);
      this.state = {};
    }
  
    render() {
        const {elementState, data} = this.props;
        const shapeProps = {...this.props.data.styles};
        let emoji = null;
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
        emoji = (
            <g
            transform={`translate(${shapeProps.x} ${shapeProps.y}) scale(${(shapeProps.width/24)})`}
            pointerEvents={"none"}
            >
                <text
                    fontFamily={"'Noto Color Emoji', 'Apple Color Emoji', 'Segoe UI Emoji', Times, Symbola, Aegyptus, Code2000, Code2001, Code2002, Musica, serif, LastResort"}
                    fontSize={"24px"}
                    x={0}
                    y={24}
                    dy={-1}
                    textLength={24}
                    pointerEvents={"none"}
                    style={{userSelect: "none"}}
                >
                    {data.emojiCharacterCode}
                </text>
            </g>
        );
        shape = <rect
            id={data.id} 
            {...shapeProps}
        />;

        
        return (
            <g 
                height={shapeProps.height}
                width={shapeProps.width}
            >
                {shape}
                {emoji}
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

  export default Emoji;