import React, {PureComponent} from 'react';

import './styles.css';

class Shape extends PureComponent {

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
        if(data.text) {
            const textBody = data.text.split(/\n|\r/).map((line, i) => {
                return(<div key={`${data.id}_${line}_${i}`}>{line}</div>);
            });
            const fontStyle = {
                ...data.fontStyle,
                lineHeight : `${(data.fontStyle.fontSize*1.4)}px`,
                padding : `${data.padding}px`,
                width : "100%"
            };
            text = (
                <foreignObject
                    className="svg_textContainer_foreignObject"
                    x={shapeProps.x}
                    y={shapeProps.y}
                    height={shapeProps.height}
                    width={shapeProps.width}
                >
                    <div
                        className="svg_textContainer"
                    >
                        <div className="svg_textContainer_line" style={fontStyle}>{textBody}</div>
                    </div>
                    
                </foreignObject>
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
            </g>
        );
    }
    
  }

  export default Shape;