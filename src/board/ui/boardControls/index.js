import React, {Component} from 'react';

import './styles.css';


class BoardControls extends Component {
  
    render() {
        const undoRedoStyles = {
            visibility : "hidden"
        };
        if(this.props.undoIsPossible) {
            undoRedoStyles.visibility = "visible";
        }
        const redoStyles = {
            opacity : 0.5
        };
        if(this.props.redoIsPossible) {
            redoStyles.opacity = 1;
        }
        return (
            <div className={"boardControls"}>
                <div className={"primaryControls"}>
                    <span className={"boardName"}>Your board name</span>
                    <span className={"iconButton share"}></span>
                </div>
                <div className={"undoControls"} style={undoRedoStyles}>
                    <span 
                        className={"iconButton undo"}
                        onClick={this.props.handleUndo}
                    />
                    <span 
                        className={"iconButton redo"}
                        onClick={this.props.handleRedo}
                        style={redoStyles}
                    />
                </div>
            </div>
        );
    }
    
  }

  export default BoardControls;