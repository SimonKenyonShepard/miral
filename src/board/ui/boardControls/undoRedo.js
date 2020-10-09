import React, {PureComponent} from 'react';

import './styles.css';

const rfc6902 = require('rfc6902');

class UndoRedo extends PureComponent {

    constructor(props, context) {
        super(props, context);
        this.state = {
          undo : [],
          redo : [],
          updates : []
        };
      }

    handleUndo = () => {

        const newUndo = [...this.state.undo];
        const newUpdates = [...this.state.updates];
        const lastUndoAction = newUndo.pop();
        const lastUpdateAction = newUpdates.pop();
        const newRedo = [...this.state.redo, lastUpdateAction];
        
        const newCombinedData = {
            elements : {...this.props.elements},
            elementState : {...this.props.elementState} 
        };
  
        rfc6902.applyPatch(newCombinedData, lastUndoAction);
        this.setState({
            undo : newUndo,
            redo : newRedo,
            updates : newUpdates
        })
        this.props.handleUpdateElementsAndState({
            elementState :  newCombinedData.elementState,
            elements : newCombinedData.elements,
        });
    }

    handleRedo = () => {
        const newRedo = [...this.state.redo];
        const lastRedoAction = newRedo.pop();
        
        const newCombinedData = {
            elements : {...this.props.elements},
            elementState : {...this.props.elementState} 
        };
        
        rfc6902.applyPatch(newCombinedData, lastRedoAction);
        
        this.setState({
            redo : newRedo
        });

        this.props.handleUpdateElementsAndState({
            elementState :  newCombinedData.elementState,
            elements : newCombinedData.elements,
            storeUndo : true
        });
    }
  
    render() {

        const undoIsPossible = this.state.undo.length > 0,
              redoIsPossible = this.state.redo.length > 0;

        const undoRedoStyles = {
            visibility : "hidden"
        };

        if(undoIsPossible || redoIsPossible) {
            undoRedoStyles.visibility = "visible";
        }

        const redoStyles = {
            pointerEvents : "none",
            opacity : 0.5
        };

        if(redoIsPossible) {
            redoStyles.opacity = 1;
            redoStyles.pointerEvents = "all";
        }

        const undoStyles = {
            opacity : 0.5,
            pointerEvents : "none"
        };

        if(undoIsPossible) {
            undoStyles.opacity = 1;
            undoStyles.pointerEvents = "all";
        }

        return (

            <div className={"undoControls"} style={undoRedoStyles}>
                <span 
                    className={"iconButton undo"}
                    onClick={this.handleUndo}
                    style={undoStyles}
                />
                <span 
                    className={"iconButton redo"}
                    onClick={this.handleRedo}
                    style={redoStyles}
                />
            </div>

        );
    }

    componentDidUpdate(prevProps) {
        const prevCombinedData = {
            elements : prevProps.elements,
            elementState : prevProps.elementState 
        };
        const currentCombinedData = {
            elements : this.props.elements,
            elementState : this.props.elementState 
        };
        const elementsDiffUpdates = rfc6902.createPatch(prevCombinedData, currentCombinedData);
        const elementsDiffUndo = rfc6902.createPatch(currentCombinedData, prevCombinedData);
        
        if(elementsDiffUndo.length > 0 && elementsDiffUpdates.length > 0 && this.props.storeUndo) {
            this.setState({
                undo : [...this.state.undo, elementsDiffUndo],
                updates : [...this.state.updates, elementsDiffUpdates]
            });
            this.props.handleUpdateElementsAndState({storeUndo : false})
        }
    }
    
  }

  export default UndoRedo;