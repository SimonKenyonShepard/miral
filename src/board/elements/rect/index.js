import React, {Component} from 'react';

import './styles.css';


class Rect extends Component {

    constructor(props, context) {
      super(props, context);
      this.state = {
        selected : false
      };
    }

    handleSelect = (e) => {
        this.setState({
            selected : true
        });
    }

    handleTextEdit = (e) => {

        this.props.handleTextEdit(this.props.data.id);
    }
  
    render() {
        const {selected} = this.state;
        const shapeProps = {...this.props.data};
        let gridLines = null;
        if(selected) {
            shapeProps.style = {outline : `${(shapeProps.strokeWidth/2)}px dashed cyan`};
        }
        return (
            <g 
                onClick={this.handleSelect}
                onDoubleClick={this.handleTextEdit}
            >
                <rect 
                    {...shapeProps}
                    cursor={"pointer"}
                />
            </g>
        );
    }

    
  }

  export default Rect;