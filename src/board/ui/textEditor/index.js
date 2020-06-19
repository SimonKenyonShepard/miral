import React, {Component} from 'react';

import './styles.css';


class TextEditor extends Component {

    constructor(props, context) {
      super(props, context);
      this.state = {
        fontSize : 24,
        lineHeight : 32,
      };
    }

    handleLostFocus = (e) => {
        this.props.handleUpdatedText({
            id : this.props.data.id,
            newText : this.textInput.innerText.trim(),
            fontSize : this.state.fontSize
        });
        this.textInput.innerHTML = "";
        this.setState({
            fontSize : 24,
            lineHeight : 32
        });
    }

    handleKeyPress = (e) => {
        if(this.textContainer.scrollHeight > this.textContainer.clientHeight) {
            let newFontSize = 0;
            if(this.state.fontSize > 8) {
                newFontSize = this.state.fontSize - 8;
                
            } else {
                newFontSize = this.state.fontSize/2;
            }
            this.setState({fontSize : newFontSize});
        }
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
            let x = ((data.x || data.cx)/gridSpace.zoomLevel)-(gridSpace.offsetX/gridSpace.zoomLevel),
                y = ((data.y || data.cy)/gridSpace.zoomLevel)-(gridSpace.offsetY/gridSpace.zoomLevel),
                width = data.width/gridSpace.zoomLevel,
                height = data.height/gridSpace.zoomLevel;
            styles.top = `${y}px`;
            styles.left = `${x}px`; 
            styles.height = `${height}px`; 
            styles.width = `${width}px`;
            styles.visibility = "visible";
            styles.overflow = "scroll";
       }
        return (
            <div
                style={styles}
                onKeyPress={this.handleKeyPress}
                ref={(container) => { this.textContainer = container; }}
            >
                <div 
                    contentEditable={true}
                    ref={(input) => { this.textInput = input; }}
                    className="textContainer"
                    onBlur={this.handleLostFocus}
                    suppressContentEditableWarning={true}
                    style={{
                        fontSize : this.state.fontSize
                    }}
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