import React, {Component} from 'react';

import './styles.css';

class Tool extends Component {
  
    handleToolSelect = (e) => {
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

        const {
            currentSelectedTool,
            type
        } = this.props;
        
        let isSelectedCSS = "";

        if(type === currentSelectedTool) {
            isSelectedCSS = "toolbar_tool_selected";
        }

        return (
            <div 
                className={`toolbar_tool toolbar_${this.props.type} ${isSelectedCSS}`}
                onClick={this.handleToolSelect}
            ></div>
        );
    }

    componentDidUpdate() {

        if(this.props.autoActivate) {
            this.handleToolSelect();
        }

    }
    
  }

  export default Tool;