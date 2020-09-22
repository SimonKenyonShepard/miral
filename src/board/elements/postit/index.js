import React, {PureComponent} from 'react';
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

const postItRectShapeTypes = [
    {
        path : "m17.62857,2.07068l1181.45387,11.11111l-2.96849,742.5926l-1193.32777,-7.40742l14.84239,-746.29629z",
        dropShadow : "m38.82956,79.07068l1130.25287,10.22659l-31.085,669.47711l-979.2025,28.18226l-119.96535,-707.88596l-0.00002,0z",
        filter : "shadow1"
        
    },
    {
        path : "m1.1446,2.07068l1193.7993,0l4.06449,735.92593l-1198.44443,10.37036l0.58064,-746.29629z",
        dropShadow : "m38.82956,79.07068l1020.51677,10.29141l95.90519,684.90187c-372.63597,-16.59437 -741.72988,-42.16213 -1086.02936,10.47042l-30.39258,-705.6637l-0.00002,0c0,0 0,0 0,0c0,0 0,0 0,0c0,0 0,0 0,0c0,0 0,0 0,0c0,0 0,0 0,0c0,0 0,0 0,0c0,0 0,0 0,0c0,0 0,0 0,0z",
        filter : "shadow2"
        
    },
    {
        path : "m1.04544,0.07068l1186.07661,7.11111l8.10862,727.5926l-1183.56818,-0.40742l-10.61705,-734.29629z",
        dropShadow : "m44.90799,62.8746l1026.00134,10.29141l96.42061,684.90187c-352.64362,-34.24142 -695.44185,-12.75037 -1098.15031,14.392l-24.27163,-709.58528l0,0c0,0 0,0 0,0c0,0 0,0 0,0c0,0 0,0 -0.00002,0c0,0 0,0 0,0c0,0 0,0 0,0c0,0 0,0 0,0c0,0 0,0 0,0c0,0 0,0 0,0z",
        filter : "shadow2"
    },
    {
        path : "m22.52924,4.07068l1173.55324,9.83101l-10.76579,727.87271l-1180.53051,-9.22069l17.74306,-728.48303z",
        dropShadow : "m44.90799,62.8746l1076.45309,10.29141l43.9264,667.88059c-369.98423,-34.24142 -615.16788,55.33474 -1066.29656,10.13668l-54.08291,-688.30868l0,0c0,0 0,0 -0.00002,0c0,0 0,0 0,0c0,0 0,0 0,0c0,0 0,0 0,0c0,0 0,0 0,0c0,0 0,0 0,0c0,0 0,0 0,0c0,0 0,0 0,0z",
        filter : "shadow2"
    }

];

const postItRectVShapeTypes = [
    {
        path : "m1.04585,1195.29546l3.45387,-1192.88889l746.53151,13.5926l-9.32777,1181.59258l-740.65761,-2.29629z",
        dropShadow : "m754.08243,96.29727l27.915,980.47711l-708.2025,119.18226l9.03465,-1130.88596l671.25285,31.22659z",
        filter : "shadow1"
        
    },
    {
        path : "m0.3946,4.07068l736.5493,-3.75l10.06449,1198.42593l-746.44443,-0.87964l-0.16936,-1193.79629z",
        dropShadow : "m73.29892,130.81302l693.9526,-100.54906c-23.63597,115.40563 -48.72988,863.83787 1.97064,1090.47042l-706.15792,32.70747l10.23468,-1022.62883z",
        filter : "shadow2"
        
    },
    {
        path : "m12.04544,11.07068l728.07661,-8.88889l-1.89138,1182.5926l-735.56818,11.59258l9.38295,-1185.29629z",
        dropShadow : "m71.90933,126.41601l690.42061,-99.09813c-47.64362,326.75858 -4.44185,938.24963 9.84969,1099.392l-708.27064,23.63328l8.00034,-1023.92715z",
        filter : "shadow2"
    },
    {
        path : "m15.52924,6.07068l732.55324,10.83101l-11.76579,1179.87271l-728.53051,-17.22069l7.74306,-1173.48303z",
        dropShadow : "m83.36108,54.81461l663.9264,-43.76801c-37.98423,384.30965 72.83212,820.15195 1.70344,1168.13671l-591.04146,-3.2778l-74.58838,-1121.0909z",
        filter : "shadow2"
    }

];

class Postit extends PureComponent {

    constructor(props, context) {
      super(props, context);
      this.state = {};
    }

    handleTextEdit = (e) => {
        this.props.handleTextEdit(this.props.data.id);
    }
  
    render() {
        const theme = this.context;
        const {elementState, data} = this.props;
        const shapeProps = {...this.props.data.styles};
        let text = null;
        let postItBaseWidth = 800;
        if(elementState.selected) {
            shapeProps.style = {outline : `${(shapeProps.strokeWidth/2)}px dashed #5086F2`};
        }
        if(data.text) {
            const textBody = data.text.split(/\n|\r/).map((line, i) => {
                return(<div key={`${data.id}_${line}_${i}`}>{line}</div>);
            });
            const fontStyle = {
                ...data.fontStyle,
                lineHeight : `${(data.fontStyle.fontSize*1.4)}px`,
                padding : `${data.padding}px`
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

        let postItShapeData = "";
        if(data.subType === "square") {
            postItShapeData = postItShapeTypes[(elementState.shapeType || 0)];
        } else if (data.subType === "rect") {
            postItShapeData = postItRectShapeTypes[(elementState.shapeType || 0)];
            postItBaseWidth = 1200;
        } else if (data.subType === "rectv") {
            postItShapeData = postItRectVShapeTypes[(elementState.shapeType || 0)];
            postItBaseWidth = 730;
        }
        const postItColor = data.predefinedColor;
        
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
                <g 
                    transform={`translate(${shapeProps.x} ${shapeProps.y}) scale(${(shapeProps.width/postItBaseWidth)})`}
                    pointerEvents={"none"}
                >
                    <path 
                        d={postItShapeData.dropShadow} 
                        fill="rgba(0,0,0, 0.4)" 
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

    
  }

  Postit.contextType = ThemeContext;

  export default Postit;