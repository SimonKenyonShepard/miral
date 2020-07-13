import React, {Component} from 'react';

import './styles.css';


class BoardControls extends Component {
  
    render() {
        return (
            <div className={"boardControls"}>
                <div className={"primaryControls"}>
                    <span className={"boardName"}>Your board name</span>
                    <span className={"iconButton share"}></span>
                </div>
                <div className={"undoControls"}>
                    <span 
                        className={"iconButton undo"}
                        onClick={this.props.handleUndo}
                    />
                    <span 
                        className={"iconButton redo"}
                        onClick={this.props.handleRedo}
                    ></span>
                </div>
            </div>
        );
    }
    
  }

  export default BoardControls;