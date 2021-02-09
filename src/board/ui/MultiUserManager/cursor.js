import React, {Component} from 'react';

import './styles.css';

class Cursor extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {};
        this.cursorRef = React.createRef();
        this.cursorAnimation = null;
        this.lastUpdate = null;
    }

    render() {
        const { color } = this.props.data;

        const wrapperCSS = {
            color
        };

        return (
            <div className="multiUser_UserCursorWrapper" ref={this.cursorRef} style={wrapperCSS}>
                <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" className="multiUser_UserCursor">
                    <path fill={color} d="m0.2125,0.101564l5.116674,15.552611c1.603039,-5.720502 1.863999,-7.627336 10.401108,-9.534169l-15.517782,-6.018442z" />
                </svg>
                {this.props.data.initials}
            </div>
        );
    }
    
    animateMouse = (prevX, prevY, currentX, currentY) => {
        this.cursorRef.current.animate(
            [
                {transform : `translate3d(${prevX}px, ${prevY}px, 0px)`},
                {transform : `translate3d(${currentX}px, ${currentY}px, 0px)`}
            ]
        , {
            fill: 'forwards',
            easing: 'ease-out',
            duration: 500
          });
    }

    componentDidUpdate(prevProps) {
        const {
            offsetX,
            offsetY,
            zoomLevel,
            data
        } = this.props;

        const currentX = data.pointerPosition.x/zoomLevel-(offsetX/zoomLevel),
              currentY = data.pointerPosition.y/zoomLevel-(offsetY/zoomLevel),
              prevX = prevProps.data.pointerPosition.x/prevProps.zoomLevel-(prevProps.offsetX/prevProps.zoomLevel),
              prevY = prevProps.data.pointerPosition.y/prevProps.zoomLevel-(prevProps.offsetY/prevProps.zoomLevel);
        
        const mouseXDidUpdate = (prevX !== currentX);
        const mouseYDidUpdate =  (prevY !== currentY);
        const mouseDidUpdate = mouseXDidUpdate || mouseYDidUpdate;
        if(mouseDidUpdate) {
            
            this.animateMouse(prevX, prevY, currentX, currentY);

        }
    }

    componentDidMount() {
        const {
            offsetX,
            offsetY,
            zoomLevel,
            data
        } = this.props;

        const currentX = data.pointerPosition.x/zoomLevel-(offsetX/zoomLevel),
              currentY = data.pointerPosition.y/zoomLevel-(offsetY/zoomLevel);
        this.animateMouse(0, 0, currentX, currentY);
    }
}

export default Cursor;