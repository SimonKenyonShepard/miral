import React, {PureComponent} from 'react';

import './styles.css';

class Text extends PureComponent {

    constructor(props, context) {
      super(props, context);
      this.state = {};
    }

    handleTextEdit = () => {
        this.props.handleTextEdit(this.props.data.id);
    }
  
    render() {
        const {elementState, data} = this.props;
        const shapeProps = {...this.props.data.styles};
        let text = null;
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
            let textAlign = "center";
            if(data.fontStyle.alignItems === "top") {
                textAlign = "flex-start";
            } else if(data.fontStyle.alignItems === "bottom") {
                textAlign = "flex-end";
            }
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
                        style={{
                            alignItems : textAlign
                        }}
                    >
                        <div className="svg_textContainer_line" style={fontStyle}>{textBody}</div>
                    </div>
                    
                </foreignObject>
            );
        }
        
        return (
            <g 
                onDoubleClick={this.handleTextEdit}
                cursor={this.state.cursor}
                height={shapeProps.height}
                width={shapeProps.width}
            >
                <rect 
                    id={data.id}
                    {...shapeProps}
                />
                {text}
                {overlay}
            </g>
        );
    }

    componentDidMount() {
        if(this.props.isUniqueSelected(this.props.data.id)) {
            setTimeout(() => {
                    this.handleTextEdit();
            }, 300);
        }
    }
    
  }

  export default Text;