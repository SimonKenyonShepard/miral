import React, {Component} from 'react';

import './styles.css';


class Rect extends Component {

    constructor(props, context) {
      super(props, context);
      this.state = {
        selected : false,
        dragging : false,
        cursor : "crosshair"
      };
    }

    handleSelect = (e) => {
        this.setState({
            selected : true,
            cursor : "grab"
        });
    }

    handleMouseDown = (e) => {
        if(this.state.selected === true) {
            e.stopPropagation();
            this.setState({
                cursor : "grabbing",
                dragging : true
            });
        }
    }

    handleMouseMove = (e) => {
        if(this.state.dragging === true) {
            e.stopPropagation();
            this.props.handleUpdatePosition({
                id : this.props.data.id,
                x : e.movementX,
                y : e.movementY
            });
        }
    }

    handleMouseUp = (e) => {
        if(this.state.dragging === true) {
            e.stopPropagation();
            this.setState({
                dragging : false,
                cursor : "grab",
            });
        }
    }

    handleTextEdit = (e) => {
        this.setState({
            selected : false
        });
        this.props.handleTextEdit(this.props.data.id);
    }
  
    render() {
        const {selected} = this.state;
        const data = this.props.data;
        const shapeProps = {...this.props.data.styles};
        let text = null;
        if(selected) {
            shapeProps.style = {outline : `${(shapeProps.strokeWidth/2)}px dashed cyan`};
        }
        if(data.text) {
            const textBody = data.text.split(/\n|\r/).map((line, i) => {
                return(<div key={`${data.id}_${line}_${i}`}>{line}</div>);
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
                onMouseDown={this.handleMouseDown}
                onMouseMove={this.handleMouseMove}
                onMouseUp={this.handleMouseUp}
                cursor={this.state.cursor}
            >
                <rect 
                    {...shapeProps}
                />
                {text}
            </g>
        );
    }

    componentDidUpdate(prevProps) {
        if (this.props.data.drawn === true && this.state.cursor === "crosshair") {
          this.setState({"cursor" : "pointer"});
        }
      }

    
  }

  export default Rect;