import React, {Component} from 'react';

import './styles.css'; //WHY IS THIS BEING IGNORED?


class Altimeter extends Component {
  
    render() {
        return (
            <div className="altitude">Scale - 1:{this.props.zoomLevel}</div>
        );
    }
    
  }

  export default Altimeter;