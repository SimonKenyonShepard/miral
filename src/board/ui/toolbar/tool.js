import React, {Component} from 'react';

import './styles.css';

class Tool extends Component {

  
    handleToolSelect = (e) => {
        e.stopPropagation();
        this.props.handleToolSelect(this.props.type);
        this.props.handleDrawCanvasShow();
        this.props.registerDragHandler("drawCanvas", {
            "dragStartHandler" : this.props.handleDragStart,
            "dragMoveHandler" : this.props.handleDragMove,
            "dragEndHandler" : this.props.handleDragEnd,
            "clickHandler" : this.props.handleClick
        });
    }

  
    render() {
        return (
            <span 
                className={`toolbar_tool toolbar_${this.props.type}`}
                onClick={this.handleToolSelect}
            />
        );
    }
    
  }

  export default Tool;