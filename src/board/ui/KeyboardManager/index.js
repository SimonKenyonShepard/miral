import React, {Component} from 'react';


class KeyboardManager extends Component {

    constructor(props, context) {
      super(props, context);
      this.state = {
      };
    }

    handleKeyPress = (e) => {
        if(e.key === "Backspace" && this.props.textEditor === null && e.target.tagName !== "INPUT") {
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