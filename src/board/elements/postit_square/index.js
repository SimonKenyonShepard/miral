import React, {Component} from 'react';

import './styles.css';

class PostitSquare extends Component {

    constructor(props, context) {
      super(props, context);
      this.state = {
        drag: 0,
        cursor : "crosshair"
      };
    }

    handleMouseDown = (e) => {
        if(this.props.elementState.selected === true) {
            e.stopPropagation();
            this.setState({
                cursor : "grabbing",
                drag : 1
            });
        }
    }

    handleMouseMove = (e) => {
        if(this.state.drag === 1 || this.state.drag === 2) {
            if(this.state.drag === 1) {
                this.setState({
                    drag : 2
                });
            }
            e.stopPropagation();
            this.props.handleUpdatePosition({
                x : e.movementX,
                y : e.movementY
            });
        }
    }

    handleMouseUp = (e) => {
        console.log("postit mouse up");
        const wasDrag = this.state.drag === 2;
        if(wasDrag) {
            e.stopPropagation();
            this.setState({
                drag : 0,
                cursor : "grab",
            });
           
        } else if(this.state.drag === 0 || this.state.drag === 1) {
            const isMultiSelect = e.metaKey;
            this.props.handleSetCurrentElement(this.props.data.id, true, isMultiSelect);
            console.log("reset selected element posit");
            this.setState({
                drag : 0,
                cursor : "grab"
            });
        }
    }

    handleTextEdit = (e) => {
        this.props.handleTextEdit(this.props.data.id);
    }
  
    render() {
        const {elementState, data} = this.props;
        const shapeProps = {...this.props.data.styles};
        let text = null;
        const postItBaseWidth = 760;
        if(elementState.selected) {
            shapeProps.style = {outline : `${(shapeProps.strokeWidth/2)}px dashed #5086F2`};
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
            );
        }
        
        return (
            <g 
                onDoubleClick={this.handleTextEdit}
                onMouseDown={this.handleMouseDown}
                onMouseMove={this.handleMouseMove}
                onMouseUp={this.handleMouseUp}
                cursor={this.state.cursor}
                height={shapeProps.width}
                width={shapeProps.width}
            >
                <rect 
                    {...shapeProps}
                    height={shapeProps.width}
                />
                <g transform={`translate(${shapeProps.x} ${shapeProps.y}) scale(${(shapeProps.width/postItBaseWidth)})`}>
                    <path 
                        d="m12.04544,2.07068l737.03703,11.11111l-1.85186,742.5926l-744.44443,-7.40742l9.25926,-746.29629z" 
                        fill="yellow"
                        filter="url(#shadow)"
                    />
                </g>
                {text}
            </g>
        );
    }

    componentDidUpdate(prevProps) {
        if (this.props.elementState.drawn === true && this.state.cursor === "crosshair") {
          this.setState({"cursor" : "pointer"});
        }
    }

    
  }

  export default PostitSquare;