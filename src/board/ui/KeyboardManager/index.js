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