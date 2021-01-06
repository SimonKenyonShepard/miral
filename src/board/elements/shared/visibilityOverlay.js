import React, {PureComponent} from 'react';

class VisibilityOverlay extends PureComponent {
  
    render() {
        const {shapeProps} = this.props;
        const iconSize = shapeProps.width/5;
        return (
            <foreignObject
                    className="svg_textContainer_foreignObject"
                    x={shapeProps.x}
                    y={shapeProps.y}
                    height={shapeProps.height}
                    width={shapeProps.width}
                    style={{
                        backgroundColor : "#ccc",
                        backgroundImage : "url('/icons/visibility_off-24px.svg')",
                        backgroundPosition : "center center",
                        backgroundSize : `${iconSize}px ${iconSize}px`,
                        backgroundRepeat : "no-repeat",
                        pointerEvents : "none"
                    }}
                />
        );
    }
    
  }

  export default VisibilityOverlay;