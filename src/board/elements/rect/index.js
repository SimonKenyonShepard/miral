import React, {Component} from 'react';

import './styles.css';

class Rect extends Component {

    constructor(props, context) {
      super(props, context);
      this.state = {};
    }

    handleSelect = (e) => {
        const isMultiSelect = e.metaKey;
        this.props.handleSetCurrentElement(this.props.data.id, true, isMultiSelect);
    }

    handleTextEdit = (e) => {
        this.props.handleTextEdit(this.props.data.id);
    }
  
    render() {
        const {elementState, data} = this.props;
        const shapeProps = {...this.props.data.styles};
        let text = null;
        if(elementState.selected) {
            shapeProps.style = {outline : `${(shapeProps.strokeWidth/2)}px dashed #5086F2`};
        }
        if(data.text) {
            const textBody = data.text.split(/\n|\r/).map((line, i) => {
                return(<div key={`${data.id}_${line}_${i}`}>{line}</div>);
            });
            const fontStyle = {
                ...data.fontStyle,
                fontSize : `${(shapeProps.fontSize)}px`,
                lineHeight : `${(shapeProps.fontSize*1.4)}px`,
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
        
        return (
            <g 
                onClick={this.handleSelect}
                onDoubleClick={this.handleTextEdit}
                height={shapeProps.height}
                width={shapeProps.width}
            >
                <rect
                    id={data.id} 
                    {...shapeProps}
                />
                {text}
            </g>
        );
    }
    
  }

  export default Rect;