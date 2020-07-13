import React, {Component} from 'react';

import './styles.css';


class TextEditor extends Component {

    constructor(props, context) {
      super(props, context);
      this.state = {
        fontSize : 24,
        expandToFit : null
      };
    }

    handleLostFocus = (e) => {
        this.props.handleUpdatedText({
            id : this.props.data.id,
            newText : (this.textInput.innerText || this.textInput.textContent).trim(),
            fontSize : this.state.fontSize
        });
        this.setState({
            fontSize : 24
        });
    }

    handleKeyPress = () => {
        let isAutoResize = (this.props.data.type !== "text"),
            isExpandToFit = (this.props.data.type === "text");

        if(isAutoResize && (this.textContainer.scrollHeight > this.textContainer.clientHeight)) {
            let newFontSize = 0;
            if(this.state.fontSize > 8) {
                newFontSize = this.state.fontSize - 8;
                
            } else {
                newFontSize = this.state.fontSize/2;
            }
            this.setState({fontSize : newFontSize});
        } else if(isExpandToFit && (this.textContainer.scrollHeight > this.textContainer.clientHeight)) {
            this.setState({expandToFit : this.textContainer.scrollHeight});
            this.props.handleSetElementHeight(this.props.data.id, this.textContainer.scrollHeight);
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
       let editorKey = "blank";
       if(data && data.id && data.styles) {
        const componentStyles = data.styles;
            let x = ((componentStyles.x || componentStyles.cx)/gridSpace.zoomLevel)-(gridSpace.offsetX/gridSpace.zoomLevel),
                y = ((componentStyles.y || componentStyles.cy)/gridSpace.zoomLevel)-(gridSpace.offsetY/gridSpace.zoomLevel),
                width = componentStyles.width/gridSpace.zoomLevel,
                height = componentStyles.height/gridSpace.zoomLevel;
            styles.top = `${y}px`;
            styles.left = `${x}px`; 
            styles.height = `${(this.state.expandToFit || height)}px`; 
            styles.width = `${width}px`;
            styles.visibility = "visible";
            styles.overflow = "scroll";
            if(data.text.length > 0) {
                starterText = data.text.split(/\n|\r/).map((line, i) => {
                    return(<div key={`editor_${data.id}_${line}_${i}`}>{line}</div>);
                });
            }
            editorKey=this.props.data.id;
            
       }
        
        return (
            <div
                style={styles}
                onKeyPress={this.handleKeyPress}
                ref={(container) => { this.textContainer = container; }}
            >
                <div 
                    key={`textEditor_${editorKey}`}
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
        const moveCaretToEnd = this.props.data ? this.props.data.text.length > 0 : false;

        if(moveCaretToEnd && document.createRange) {
            let range = document.createRange();
            range.selectNodeContents(this.textInput);
            range.collapse(false);
            let selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
        }

        if(this.props.data && this.props.data.unScaledFontSize && this.props.data.unScaledFontSize !== this.state.fontSize) {
            this.setState({fontSize : this.props.data.unScaledFontSize});
        }

   }

    
  }

  export default TextEditor;