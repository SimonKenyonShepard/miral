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
            this.props.handleDuplicateElements();
        } else if (e.key === "ArrowDown") {
            this.props.shuntSelectedElements("down");
        } else if (e.key === "ArrowUp") {
            this.props.shuntSelectedElements("up");
        } else if (e.key === "ArrowLeft") {
            this.props.shuntSelectedElements("left");
        } else if (e.key === "ArrowRight") {
            this.props.shuntSelectedElements("right");
        } else if (
            (e.ctrlKey === true && e.key === "c") ||
            (e.metaKey === true && e.key === "c")
        ) {
            e.preventDefault();
            this.props.copy();
        } else if (
            (e.ctrlKey === true && e.key === "x") ||
            (e.metaKey === true && e.key === "x")
        ) {
            e.preventDefault();
            this.props.cut();
        } else if (
            (e.ctrlKey === true && e.key === "v") ||
            (e.metaKey === true && e.key === "v")
        ) {
            e.preventDefault();
            this.props.paste();
        }
        
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