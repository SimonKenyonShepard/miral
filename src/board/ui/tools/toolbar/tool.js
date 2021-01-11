import React, {Component} from 'react';
import { store } from '../../../context/tools';

import './styles.css';

class Tool extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {};
    }
  
    handleToolSelect = (e) => {
        this.context.dispatch({type : "activateTool", data : {tool : this.props.type}});
        this.props.handleDeselectAllElements();
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
            >{(this.props.content || null)}</div>
        );
    }

    componentDidUpdate() {

        if(this.context.state.autoActivate === this.props.type) {
            this.handleToolSelect();
            this.context.dispatch({type : "resetAutoActivate"});
        }

    }
    
  }


  Tool.contextType = store;

  export default Tool;