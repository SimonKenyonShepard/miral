import React, {Component} from 'react';

import './styles.css';


class TextEditor extends Component {

    constructor(props, context) {
      super(props, context);
      this.state = {
        selected : true
      };
    }

    handleLostFocus = (e) => {
        this.props.handleUpdatedText({
            id : this.props.data.id,
            newText : this.textInput.innerText.trim()
        })
        this.setState({"selected" : false})
    }

    render() {
       const {data, gridSpace} = this.props;
       const styles = {
           position : "absolute",
           display : "flex",
           alignItems : "center",
           justifyContent : "center",
           visibility: "hidden"
       };
       let starterText = "";
       if(data && data.id) {
            let x = ((data.x || data.cx)/gridSpace.zoomLevel)+(gridSpace.offsetX/gridSpace.zoomLevel),
                y = ((data.y || data.cy)/gridSpace.zoomLevel)+(gridSpace.offsetY/gridSpace.zoomLevel),
                width = data.width/gridSpace.zoomLevel,
                height = data.height/gridSpace.zoomLevel;
            styles.top = `${y}px`;
            styles.left = `${x}px`; 
            styles.height = `${height}px`; 
            styles.width = `${width}px`;
            styles.visibility = "visible";
       }
        return (
            <div
                style={styles}
            >
                <div 
                    contentEditable={this.state.selected}
                    ref={(input) => { this.textInput = input; }}
                    className="textContainer"
                    onBlur={this.handleLostFocus}
                    suppressContentEditableWarning={true}
                >
                    {starterText}
                </div>
            </div>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        this.textInput.focus();
   }

    
  }

  export default TextEditor;