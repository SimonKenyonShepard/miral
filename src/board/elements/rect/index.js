import React, {Component} from 'react';

import './styles.css';


class Rect extends Component {

    constructor(props, context) {
      super(props, context);
      this.state = {
        selected : false
      };
    }

    handleSelect = (e) => {
        this.setState({
            selected : true
        });
    }

    handleTextEdit = (e) => {

        this.props.handleTextEdit(this.props.data.id);
    }
  
    render() {
        const {selected} = this.state;
        const shapeProps = {...this.props.data};
        let text = null;
        if(selected) {
            shapeProps.style = {outline : `${(shapeProps.strokeWidth/2)}px dashed cyan`};
        }
        if(shapeProps.text) {
            const textBody = shapeProps.text.split(/\n|\r/).map(line => {
                return(<div key={line}>{line}</div>);
            });
            const fontSize = `${shapeProps.fontSize}px`,
                lineHeight = `${(shapeProps.fontSize*1.4)}px`;
            text = (
                <foreignObject
                    x={shapeProps.x}
                    y={shapeProps.y}
                    height={shapeProps.height}
                    width={shapeProps.width}
                >
                    <div
                        className="svg_textContainer"
                    >
                        <div style={{fontSize, lineHeight}}>{textBody}</div>
                    </div>
                    
                </foreignObject>
            )
        }
        
        return (
            <g 
                onClick={this.handleSelect}
                onDoubleClick={this.handleTextEdit}
            >
                <rect 
                    {...shapeProps}
                    cursor={"pointer"}
                />
                {text}
            </g>
        );
    }

    
  }

  export default Rect;