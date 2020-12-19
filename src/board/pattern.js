import React, {Component} from 'react';




class Pattern extends Component {

    constructor(props, context) {
      super(props, context);
      this.state = {
        
      };
    }

    

    render() {
       
        const widthHeight = 10*this.props.zoomLevel,
              strokeWidth = 5*this.props.zoomLevel;

        return (
            <>
            <pattern id="diagonalHatch" width={widthHeight} height={widthHeight} patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                <line x1="0" y1="0" x2="0" y2={widthHeight} style={{stroke:"#ccc", strokeWidth: strokeWidth, strokeOpacity : 0.2 }} />
            </pattern>
            </>
        );
    }
    
  }

  export default Pattern;