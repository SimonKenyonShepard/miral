import React, {PureComponent} from 'react';

import './styles.css';

class Line extends PureComponent {

    constructor(props, context) {
      super(props, context);
      this.state = {};
    }

    handleSelect = (e) => {
        const isMultiSelect = e.metaKey;
        this.props.handleSetCurrentElement(this.props.data.id, isMultiSelect);
    }

    handleTextEdit = (e) => {
        this.props.handleTextEdit(this.props.data.id);
    }
  
    render() {
        const {elementState, data} = this.props;
        const shapeProps = {...this.props.data.styles};
        let text = null;
        let shape = null;
        if(elementState.selected) {
            shapeProps.style = {outline : `${(data.initialZoomLevel)}px dashed #5086F2`};
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
                onClick={this.handleSelect}
                onDoubleClick={this.handleTextEdit}
                height={shapeProps.height}
                width={shapeProps.width}
            >
                {shape}
                {text}
            </g>
        );
    }
    
  }

  export default Line;