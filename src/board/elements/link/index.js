import React, {PureComponent} from 'react';

import './styles.css';

class Link extends PureComponent {

    constructor(props, context) {
      super(props, context);
      this.state = {};
    }

    handleLinkClick = (e) => {
        if(this.props.data.link.indexOf("element://") !== -1) {
            const element = this.props.data.link.split("://")[1];
            this.props.animateToElement(element, 1);
        } else if (this.props.data.link.indexOf("wswb") !== -1) {
            const realURL = this.props.data.link.replace(/wswb/, "http");
            this.props.loadRemoteBoard(realURL);
        } else if (this.props.data.link.indexOf("http") !== -1) {
            window.open(this.props.data.link,'_blank');
        }
        
    }
  
    render() {
        const {elementState, data} = this.props;
        const shapeProps = {...this.props.data.styles};
        let shape = null;
        let overlay = null;
        let linkHitArea = null;
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

        const strokeWidth = 20*data.initialZoomLevel;

        shapeProps.fill = "url(#diagonalHatch)";
        shapeProps.fillOpacity = "1";
        shapeProps.stroke = "#ccc";
        shapeProps.strokeOpacity = "0.3";
        shapeProps.strokeWidth = strokeWidth;
        

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

        if(data.link) {
            
            linkHitArea = (<rect 
                height={shapeProps.height-strokeWidth}
                width={shapeProps.width-strokeWidth}
                x={shapeProps.x+(strokeWidth/2)}
                y={shapeProps.y+(strokeWidth/2)}
                fillOpacity={0}
                onClick={this.handleLinkClick}
                cursor={"pointer"}
            />);

        }

        return (
            <g 
                height={shapeProps.height}
                width={shapeProps.width}
            >
                {shape}
                {linkHitArea}
                {overlay}
            </g>
        );
    }
    
  }

  export default Link;