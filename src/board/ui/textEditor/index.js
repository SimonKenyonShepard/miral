import React, {Component} from 'react';

import './styles.css';

const ELEMENT_TYPE_PROPERTIES = {
    text : {
        isExpandToFit : true,
        isAutoResize : false
    },
    shape : {
        isExpandToFit : false,
        isAutoResize : true
    },
    postit : {
        isExpandToFit : false,
        isAutoResize : true
    }
};

class TextEditor extends Component {

    constructor(props, context) {
      super(props, context);
      this.state = {
        fontSize : 24*props.gridSpace.zoomLevel
      };
    }

    handleLostFocus = (e) => {
        this.props.handleUpdatedText({
            id : this.props.data.id,
            newText : (this.textInput.innerText || this.textInput.textContent).trim(),
            fontSize : this.state.fontSize
        });
        // this.setState({
        //     fontSize : 24*this.props.gridSpace.zoomLevel
        // });
    }

    handleKeyPress = () => {

        const { isAutoResize, isExpandToFit } = ELEMENT_TYPE_PROPERTIES[this.props.data.type];

        if(isAutoResize && (this.textContainer.scrollHeight > this.textContainer.clientHeight)) {
            let newFontSize = 0;
            if(this.state.fontSize > 8*this.props.gridSpace.zoomLevel) {
                newFontSize = this.state.fontSize - 8*this.props.gridSpace.zoomLevel;
                
            } else {
                newFontSize = this.state.fontSize/2;
            }
            this.setState({fontSize : newFontSize});
        } else if(isExpandToFit && (this.textContainer.scrollHeight > this.textContainer.clientHeight)) {
            this.props.handleSetElementHeight(this.props.data.id, this.textContainer.scrollHeight);
        }
    }

    handlePaste = (event) => {
        event.preventDefault();
        document.execCommand('inserttext', false, event.clipboardData.getData('text/plain'));
    }

    handleGotFocus = (e) => {
        this.setState({
            fontSize : this.props.data.fontStyle.fontSize
        });
    }

    shouldComponentUpdate(nextProps) {
        const {
            data
        } = nextProps;

        const needsUpdate = (data !== this.props.data);
        if(needsUpdate) {
            return true;
        }
        return false;
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
        styles.height = `${height}px`; 
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
                    onFocus={this.handleGotFocus}
                    onPaste={this.handlePaste}
                    suppressContentEditableWarning={true}
                    style={{
                        fontSize : this.state.fontSize/this.props.gridSpace.zoomLevel
                    }}
                >
                    {starterText}
                </div>
            </div>
        );
    }

   componentDidUpdate(prevProps, prevState) {
       if(this.props.data) {
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
            
       }
        
        // if(this.props.data && this.props.data.unScaledFontSize && this.props.data.unScaledFontSize !== this.state.fontSize) {
        //     this.setState({fontSize : this.props.data.unScaledFontSize});
        // }
        //Can't remember why this was needed.
   }

    
  }

  export default TextEditor;