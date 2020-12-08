import React, {Component} from 'react';

import './styles.css';

const ELEMENT_TYPE_PROPERTIES = {
    text : {
        isExpandToFit : true,
        isAutoResize : false
    },
    shape : {
        isExpandToFit : false,
        isAutoResize : false
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
        fontSize : 24,
        elementHeight : 0
      };
      this.sizeCheckerInterval = null;
    }

    handleLostFocus = (e) => {
        this.props.handleUpdatedText({
            id : this.props.data.id,
            newText : (this.textInput.innerText || this.textInput.textContent).trim(),
            fontSize : this.state.fontSize*this.props.gridSpace.zoomLevel
        });
    }

    sizeChecker = () => {

        const { isAutoResize, isExpandToFit } = ELEMENT_TYPE_PROPERTIES[this.props.data.type];

        if(isAutoResize && (this.textContainer.scrollHeight > this.textContainer.clientHeight)) {
            const newFontSize = (this.state.fontSize/3)*2;
            this.setState({fontSize : newFontSize});
        } else if(isAutoResize && (this.textInput.clientHeight < this.textContainer.clientHeight) && this.state.fontSize < 24) {
            const twoThirds = (1/3*2);
            const nextExpectedHeight = (this.textInput.clientHeight/(twoThirds*100))*100;
            if(nextExpectedHeight < this.textContainer.clientHeight) {
                const newFontSize = (this.state.fontSize/(twoThirds*100))*100;
                this.setState({fontSize : newFontSize});
            }
        } else if(isExpandToFit && (this.textContainer.scrollHeight > this.textContainer.clientHeight)) {
            if(this.state.elementHeight !== this.textContainer.scrollHeight) {
                this.props.handleSetElementHeight(this.props.data.id, this.textContainer.scrollHeight);
                this.setState({elementHeight : this.textContainer.scrollHeight});
            }
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

    shouldComponentUpdate(nextProps, nextState) {
        const {
            data
        } = nextProps;

        const {
            fontSize,
            elementHeight
        } = nextState;

        const needsUpdateData = (data !== this.props.data);
        const needsUpdateFont = (fontSize !== this.state.fontSize);
        const needsUpdateLayout = (elementHeight !== this.state.elementHeight);

        if(needsUpdateData || needsUpdateFont || needsUpdateLayout) {
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
       const textStyles = {
            fontSize : this.state.fontSize
       };
       let starterText = "";
       let editorKey = "blank";
       if(data && data.id && data.styles) {
        const componentStyles = data.styles;
        let x = ((componentStyles.x || componentStyles.cx)/gridSpace.zoomLevel)-(gridSpace.offsetX/gridSpace.zoomLevel),
            y = ((componentStyles.y || componentStyles.cy)/gridSpace.zoomLevel)-(gridSpace.offsetY/gridSpace.zoomLevel),
            width = componentStyles.width/gridSpace.zoomLevel,
            height = this.state.elementHeight;
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
        if(data.fontStyle.textAlign) {
            textStyles.textAlign = data.fontStyle.textAlign;
            if(data.fontStyle.textAlign === "left") {
                styles.justifyContent = "flex-start";
            } else if (data.fontStyle.textAlign === "right") {
                styles.justifyContent = "flex-end";
            }
        }

        //TOTEST : text aligns correctly
        if(data.fontStyle.alignItems) {
            textStyles.alignItems = "center";
            if(data.fontStyle.alignItems === "top") {
                styles.alignItems = "flex-start";
            } else if (data.fontStyle.alignItems === "bottom") {
                styles.alignItems = "flex-end";
            }
        }
        if(data.fontStyle.color) {
            textStyles.color = data.fontStyle.color;
        }

        editorKey=this.props.data.id;
            
       }
        
        return (
            <div
                style={styles}
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
                    style={textStyles}
                >
                    {starterText}
                </div>
            </div>
        );
    }

   componentDidUpdate(prevProps, prevState) {
       if(this.props.data && this.props.data.id) {
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
            if(!prevProps.data || (this.props.data.id !== prevProps.data.id)) {
                this.setState({
                    fontSize :  this.props.data.fontStyle.fontSize/this.props.gridSpace.zoomLevel,
                    elementHeight : this.props.data.styles.height/this.props.gridSpace.zoomLevel
                });
                this.sizeCheckerInterval = setInterval(this.sizeChecker, 100);
            }
            
       } else {
           clearInterval(this.sizeCheckerInterval);
       }
   }
    
  }

  export default TextEditor;