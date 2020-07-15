import React, {Component} from 'react';

import './styles.css';


class Altimeter extends Component {
  
    render() {
        return (
            <div className={"zoomLevel"}>Scale : {this.props.zoomLevel}%</div>
        );
    }
    
  }

  export default Altimeter;