import React, {PureComponent} from 'react';

import './styles.css';

class Line extends PureComponent {

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
        // if(data.text) {
        //     const textBody = data.text.split(/\n|\r/).map((line, i) => {
        //         return(<div key={`${data.id}_${line}_${i}`}>{line}</div>);
        //     });
        //     const fontStyle = {
        //         ...data.fontStyle,
        //         lineHeight : `${(shapeProps.fontSize*1.4)}px`,
        //         padding : `${data.padding}px`,
        //         width : "100%"
        //     };
        //     text = (
        //         <foreignObject
        //             className="svg_textContainer_foreignObject"
        //             x={shapeProps.x}
        //             y={shapeProps.y}
        //             height={shapeProps.height}
        //             width={shapeProps.width}
        //         >
        //             <div
        //                 className="svg_textContainer"
        //             >
        //                 <div className="svg_textContainer_line" style={fontStyle}>{textBody}</div>
        //             </div>
                    
        //         </foreignObject>
        //     );
        // }

        if(data.shapeType === 0) {
            shapeProps.x1 = shapeProps.x;
            shapeProps.y1 = shapeProps.y + shapeProps.height;
            shapeProps.x2 = shapeProps.x + shapeProps.width;
            shapeProps.y2 = shapeProps.y;
            shape = <line
                id={data.id} 
                {...shapeProps}
            />;
        } else if (data.shapeType === 1) {
            shapeProps.d = `M ${shapeProps.x} ${shapeProps.y + shapeProps.height} q 0 ${-shapeProps.height} ${(shapeProps.width)} ${(-shapeProps.height)}`;
            shape = <path
                id={data.id} 
                {...shapeProps}
            />;
        } else if (data.shapeType === 2) {
           
            shape = <path
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

  export default Line;