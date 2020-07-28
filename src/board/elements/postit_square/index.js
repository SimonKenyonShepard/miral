import React, {Component} from 'react';
import {ThemeContext} from '../../../theme-context';

import './styles.css';

const postItShapeTypes = [
    {
        path : "m12.04544,2.07068l737.03703,11.11111l-1.85186,742.5926l-744.44443,-7.40742l9.25926,-746.29629z",
        dropShadow : "m38.82956,79.07068l640.25289,10.22659l-17.60868,669.47711l-554.68758,28.18226l-67.95662,-707.88596l-0.00001,0z",
        filter : "shadow1"
        
    },
    {
        path : "m0.934329,2.07068l761.481475,-0.000001l2.592584,735.925933l-764.44443,10.370358l0.370371,-746.29629z",
        dropShadow : "m38.82956,79.07068l640.25289,10.291407l60.169098,684.901871c-233.784749,-16.594366 -465.347276,-42.16213 -681.354247,10.470427l-19.067731,-705.663705l-0.000005,0c0,0 0,0 -0.000001,0c0,0 0,0 0,0c0,0 0,0 -0.000001,0c0,0 0,0 0,0c0,0 -0.000001,0 -0.000001,0c0,0 0,0 -0.000001,0c0,0 0,0 0,0c-0.000001,0 -0.000001,0 -0.000001,0z",
        filter : "shadow2"
        
    },
    {
        path : "m1.04544,0.07068l753.03703,7.11111l5.14814,727.5926l-751.44443,-0.40742l-6.74074,-734.29629z",
        dropShadow : "m44.907991,62.874602l640.25289,10.291407l60.169098,684.901871c-220.059258,-34.241425 -433.974727,-12.750366 -685.275815,14.391995l-15.146163,-709.585273l-0.000005,0c0,0 0,0 -0.000001,0c0,0 0,0 0,0c0,0 0,0 -0.000001,0c0,0 0,0 0,0c0,0 -0.000001,0 -0.000001,0c0,0 0,0 -0.000001,0c0,0 0,0 0,0c-0.000001,0 -0.000001,0 -0.000001,0z",
        filter : "shadow2"
    },
    {
        path : "m16.095067,4.07068l747.987379,9.831012l-6.861786,727.872709l-752.43448,-9.220688l11.308887,-728.483033z",
        dropShadow : "m44.907991,62.874602l640.25289,10.291407l26.126545,667.880594c-220.059258,-34.241425 -365.889621,55.334741 -634.211985,10.136676l-32.16744,-688.308677l-0.000005,0c0,0 0,0 -0.000001,0c0,0 0,0 0,0c0,0 0,0 -0.000001,0c0,0 0,0 0,0c0,0 -0.000001,0 -0.000001,0c0,0 0,0 -0.000001,0c0,0 0,0 0,0c-0.000001,0 -0.000001,0 -0.000001,0z",
        filter : "shadow2"
    }

];

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
        const theme = this.context;
        const {elementState, data} = this.props;
        const shapeProps = {...this.props.data.styles};
        let text = null;
        const postItBaseWidth = 800;
        if(elementState.selected) {
            shapeProps.style = {outline : `${(shapeProps.strokeWidth/2)}px dashed #5086F2`};
        }
        if(data.text) {
            const textBody = data.text.split(/\n|\r/).map((line, i) => {
                return(<div key={`${data.id}_${line}_${i}`}>{line}</div>);
            });
            const fontStyle = {
                ...data.fontStyle,
                fontSize : `${shapeProps.fontSize}px`,
                lineHeight : `${(shapeProps.fontSize*1.4)}px`,
                padding : `${shapeProps.padding}px`
            };
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
                        <div style={fontStyle}>{textBody}</div>
                    </div>
                    
                </foreignObject>
            );
        }

        const postItShapeData = postItShapeTypes[(elementState.shapeType || 0)],
              postItColor = data.predefinedColor;

        
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
                        d={postItShapeData.dropShadow} 
                        fill="#cccccc" 
                        filter={`url(#${postItShapeData.filter})`}
                    />
                    <path 
                        d={postItShapeData.path} 
                        fill={(theme.preDefinedColors[postItColor])}
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

  PostitSquare.contextType = ThemeContext;

  export default PostitSquare;