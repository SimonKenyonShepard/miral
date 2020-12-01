import React, {PureComponent} from 'react';

import './styles.css';

class Youtube extends PureComponent {

    constructor(props, context) {
      super(props, context);
      this.state = {
          iframePointerEvents : "none"
      };
      this.iframe = null;
      this.currentFocus = null;
    }

    checkFocus = () => {
        if(document.activeElement.title !== this.currentFocus) {
          this.disableInteraction();
        } else {
            setTimeout(this.checkFocus, 1000);
        }
      }

    handlePlayIntent = () => {
        this.setState({iframePointerEvents : "auto"});
        this.iframe.contentWindow.focus();
        this.currentFocus = document.activeElement.title;
        setTimeout(this.checkFocus, 1000);
    }

    disableInteraction = () => {
        this.setState({iframePointerEvents : "none"});
    }
  
    render() {
        const {elementState, data} = this.props;
        const shapeProps = {...this.props.data.styles};
        let iframe = null;
        let overlay = null;
        let hitArea = null;
        let playArea = null;
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

        let iframeOpacity = 1;
        if(this.state.iframePointerEvents === "none") {
            iframeOpacity = 0.6;
        }
        
        iframe = 
            <foreignObject
                x={shapeProps.x}
                y={shapeProps.y}
                height={shapeProps.height}
                width={shapeProps.width}
                fill="#000"
                pointerEvents={this.state.iframePointerEvents}

            >
                <iframe
                    title={"youtubeVideo"+data.id}
                    width={(shapeProps.width/data.initialZoomLevel)}
                    height={(shapeProps.height/data.initialZoomLevel)} 
                    src={data.URL} 
                    frameBorder="0" 
                    allow="clipboard-write; encrypted-media; picture-in-picture"
                    allowFullScreen={true}
                    style={{
                        transform : `scale(${data.initialZoomLevel})`,
                        transformOrigin : "top",
                        opacity: iframeOpacity
                    }}
                    ref={(container) => { this.iframe = container; }}
                />
            
            </foreignObject>;
            
        hitArea = (<rect
            id={data.id} 
            x={shapeProps.x}
            y={shapeProps.y}
            height={shapeProps.height}
            width={shapeProps.width}
            fillOpacity={0}
        />);
        // CHANGE THIS SO THERE IS TEXT WHEN IT IS GREYED OUT SAYING DOUBLE CLICK TO ACIVATE, 
        if(this.state.iframePointerEvents === "none") {
            playArea = (
                <rect
                    x={(shapeProps.x+(shapeProps.width/2)-(68*data.initialZoomLevel)/2)}
                    y={(shapeProps.y+(shapeProps.height/2)-(48*data.initialZoomLevel)/2)}
                    height={(48*data.initialZoomLevel)}
                    width={(68*data.initialZoomLevel)}
                    fillOpacity={0}
                    cursor={"pointer"}
                    onClick={this.handlePlayIntent}
                />
            );
        }
        


        return (
            <g 
                height={shapeProps.height}
                width={shapeProps.width}
            >
                {hitArea}
                {iframe}
                {playArea}
                {overlay}
            </g>
        );
    }
    
  }

  export default Youtube;