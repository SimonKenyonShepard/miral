import React, {Component} from 'react';

import './styles.css'; //WHY IS THIS BEING IGNORED?


class Altimeter extends Component {
  
    render() {
        return (
            <div className="altitude">Altitude : {this.props.zoomLevel}m</div>
        );
    }
    
  }

  export default Altimeter;