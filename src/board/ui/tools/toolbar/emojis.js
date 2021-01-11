import React, {Component} from 'react';
import MultiTool from './multiTool';
import { store } from '../../../context/tools';

import './styles.css';

import Emoji from './emoji';

class Emojis extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
          previousSelectedShapeTool : "emoji-128513",
          menuActivated : false
        };
    }

    handleToolSelect = (tool) => {
        if(this.props.currentSelectedTool !== tool) {
            this.setState({
                previousSelectedShapeTool : tool
            });
            this.context.dispatch({type : "activateTool", data : {tool}});
        }
    }
  
    render() {
        const {
            handleDrawCanvasShow,
            registerDragHandler,
            handleDragMove,
            handleDragEnd,
            currentSelectedTool
        } = this.props;

        const autoActivate = {};

        if(this.state.menuActivated) {
            autoActivate[this.state.previousSelectedShapeTool] = true;
        }

        var emojRange = [
            [128513, 128591], [9986, 10160], [128640, 128704]
        ];

        const subMenuTools = [];

        const emojiStyle = {
            display : "flex",
            alignItems : "center",
            height : "40px",
            justifyContent : "center",
            fontFamily : "'Noto Color Emoji', 'Apple Color Emoji', 'Segoe UI Emoji', Times, Symbola, Aegyptus, Code2000, Code2001, Code2002, Musica, serif, LastResort",
            fontSize : "24px"
        };

        for (var i = 0; i < emojRange.length; i++) {
            var range = emojRange[i];
            for (var x = range[0]; x < range[1]; x++) {
              autoActivate["emoji-"+x] = false;
              subMenuTools.push(
                <Emoji
                    emojiCharacter={(
                    <span style={emojiStyle}>    
                        {String.fromCodePoint((String(x).toString(16)))}
                    </span>
                    )}
                    key={"tool_emoji-"+x}
                    handleDeselectAllElements={this.handleDeselectAllElements}
                    handleDrawCanvasShow={handleDrawCanvasShow}
                    registerDragHandler={registerDragHandler}
                    handleDragMove={handleDragMove}
                    handleDragEnd={handleDragEnd}
                    currentSelectedTool={currentSelectedTool}
                    autoActivate={autoActivate["emoji-128513"]}
                />
            );

            }
          
        }

        return (
           
            <MultiTool 
                type="emoji" 
                subMenuItems={subMenuTools}
                openSubMenu={this.props.openSubMenu}
                handleSetCurrentOpenSubMenu={this.props.handleSetCurrentOpenSubMenu} 
            />
                   
        );
    }

    componentDidUpdate(prevProps) {
        if(this.props.openSubMenu !== prevProps.openSubMenu && this.props.openSubMenu === "emoji") {
            this.setState({menuActivated : true});
        } else if (this.state.menuActivated) {
            this.setState({menuActivated : false});
        }
    }   
    
  }

  Emojis.contextType = store;

  export default Emojis;