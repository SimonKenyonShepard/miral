import React, {PureComponent} from 'react';


class KeyboardManager extends PureComponent {

    constructor(props, context) {
      super(props, context);
      this.state = {
      };
    }

    handleKeyPress = (e) => {
        
        const isTextBox = this.props.textEditor !== null || e.target.tagName === "INPUT" || e.target.getAttribute("contentEditable") === "true";
        if(e.key === "Backspace" && !isTextBox) {
            e.preventDefault();
            this.props.handleDeleteElements();
        } else if(
            (e.ctrlKey === true && e.key === "d") ||
            (e.metaKey === true && e.key === "d")
        ) {
            e.preventDefault();
            let direction = "right";
            if(e.shiftKey) {
                direction = "down";
            }
            this.props.handleDuplicateElements(direction);

        } else if (e.key === "ArrowDown" && !isTextBox) {
            this.props.shuntSelectedElements("down");
        } else if (e.key === "ArrowUp" && !isTextBox) {
            this.props.shuntSelectedElements("up");
        } else if (e.key === "ArrowLeft" && !isTextBox) {
            this.props.shuntSelectedElements("left");
        } else if (e.key === "ArrowRight" && !isTextBox) {
            this.props.shuntSelectedElements("right");
        } else if (
            ((e.ctrlKey === true && e.key === "c") ||
            (e.metaKey === true && e.key === "c")) && !isTextBox
        ) {
            e.preventDefault();
            this.props.copy();
        } else if (
            ((e.ctrlKey === true && e.key === "x") ||
            (e.metaKey === true && e.key === "x")) && !isTextBox
        ) {
            e.preventDefault();
            this.props.cut();
        } else if (
            ((e.ctrlKey === true && e.key === "v") ||
            (e.metaKey === true && e.key === "v")) && !isTextBox
        ) {
            e.preventDefault();
            this.props.paste();
        }
        //TAB THROUGH ELEMENTS
    }

    render() {
        return (
            <div
                id="keyboardManager"
                styles={{
                    display: "none"
                }}
            />
            
        );
    }

    componentDidMount(){
        document.addEventListener('keydown', this.handleKeyPress);
    }

    componentWillUnmount(){
        document.removeEventListener('keydown', this.handleKeyPress);
    }
    
  }

  export default KeyboardManager;