import React, {Component} from 'react';

import './styles.css';

const iconColor = "#333";

class DepthSetter extends Component {

    constructor(props, context) {
      super(props, context);
      this.state = {
        
      };
    }

    handleBringForward = () => {
      this.props.handleShiftElementPosition("forward", this.props.ids);
    }

    handleSendBackward = () => {
      this.props.handleShiftElementPosition("backward", this.props.ids);
    }

    render() {
        
        const isForward = (this.props.type === "forward");
        return (
          <div className={"editor_option"}>
            
              {isForward ?
                <div 
                  className={"editor_icon"}
                  title={"Bring to front"}
                  onClick={this.handleBringForward}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                    <path d="M0 0h24v24H0V0z" fill="none"/>
                    <path fill={iconColor} d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm12 12h2v-2h-2v2zm6-18H7v14h14V3zm-2 12H9V5h10v10zm-8 6h2v-2h-2v2zm-4 0h2v-2H7v2zm-4 0h2v-2H3v2z"/>
                  </svg>
                </div>
                :
                <div 
                  className={"editor_icon"}
                  title={"Send to back"}
                  onClick={this.handleSendBackward}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                    <path d="M0 0h24v24H0V0z" fill="none"/>
                    <path d="M9 7H7v2h2V7zm0 4H7v2h2v-2zm4 4h-2v2h2v-2zm0-12h-2v2h2V3zM9 3H7v2h2V3zm12 0h-2v2h2V3zm0 12h-2v2h2v-2zM9 15H7v2h2v-2zm10-2h2v-2h-2v2zm0-4h2V7h-2v2zM5 7H3v14h14v-2H5V7zm10-2h2V3h-2v2zm0 12h2v-2h-2v2z"/>
                  </svg>
                </div>
              }
          </div>
        );
    }

    
  }

  export default DepthSetter;