import React, {Component} from 'react';

import Shortid from 'shortid';

import './styles.css';

//const server = "https://workshoppr.com";
//const server = "http://localhost:3000/miral";
const server = "https://simonkenyonshepard.github.io/miral";

class Share extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            menuVisible : false,
            sessionActive : false,
            boardID : null,
            name : "",
            initials : "",
            securityCode : Math.floor(1000 + Math.random() * 90000)
        };
    }

    handleOpenShareMenu = () => {
        this.setState({
            menuVisible : !this.state.menuVisible,
            subMenu : []
        });
    }
    
    handleShareBoard = () => {
        //TODO : crude flag for local dev, needs removing to config vars
        //if(window.location.href.indexOf(":3000") !== -1) {

            const {
                name,
                initials,
                securityCode
            } = this.state;

            
            const boardID = this.removeDifficultCharactersToReadForPeople(Shortid.generate());


            this.setState({
                sessionActive : true,
                boardID
            });
        
            this.props.toggleBoardShare({
                boardID,
                name,
                initials,
                securityCode
            });
        //}
    }

    removeDifficultCharactersToReadForPeople(boardID) {
        return boardID.replace(/l/g, "L").replace(/I/g, "i");
    }

    handleCopyToClipBoard = () => {
        const {
            boardID,
            securityCode
        } = this.state;
        const newClip = `Join : ${server}/#j=${boardID}&o=unfoldbio \nPasscode : ${securityCode}`;
        navigator.clipboard.writeText(newClip);
    }

    handleNameUpdate = (e) => {
        this.setState({
            name : e.target.value
        });
    }

    handleInitalsUpdate = (e) => {
        this.setState({
            initials : e.target.value
        });
    }

    handleSecurityCodeUpdate = (e) => {
        this.setState({
            securityCode : e.target.value
        });
    }
  
    render() {

        const { 
            menuVisible,
            sessionActive,
            boardID,
            name,
            initials,
            securityCode
        } = this.state;

        let menuCSS = "share_menu",
            letFirstMenuHidden = "",
            iconAnimation = "",
            iconFillColor = "#333";

        if( menuVisible ) {
            menuCSS += " share_menu_open";
        }

        if(sessionActive) {
            letFirstMenuHidden = "slideLeft";
            iconFillColor= "#33CC7F";
            iconAnimation = "pulse";
        }

        const link = `${server}/#j=${boardID}&o=unfoldbio`;

        return (
            <div className="share_menu_wrapper">
            <div 
                className={`iconButton share ${iconAnimation}`}
                onClick={this.handleOpenShareMenu}
            >
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                    <path fill={iconFillColor} d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/>
                </svg>
            </div>
            <div className={menuCSS}>
                    <div className={"share_menu_arrow"} />
                    <div className={`share_menu_sliderWrapper`} >
                        <div className={`share_menu_slider ${letFirstMenuHidden}`} >
                            <h3>Collaboration session setup:</h3>
                            <div className="share_menu_fieldrow">
                                <label>name : </label>
                                <input 
                                    className="share_menu_input"
                                    placeholder="e.g. john"
                                    value={name}
                                    onChange={this.handleNameUpdate}
                                />
                            </div>
                            <div className="share_menu_fieldrow">
                                <label>Initials : </label>
                                <input 
                                    className="share_menu_input"
                                    placeholder="js"
                                    value={initials}
                                    onChange={this.handleInitalsUpdate}
                                />
                            </div>
                            {/*<div className="share_menu_fieldrow">
                                <label>Session duration (mins): </label>
                                <input 
                                    className="share_menu_input"
                                    defaultValue="40"
                                />
                            </div> */}
                            <div className="share_menu_fieldrow">
                                <label>Security code : </label>
                                <input 
                                    className="share_menu_input"
                                    defaultValue={securityCode}
                                    onChange={this.handleSecurityCodeUpdate}
                                />
                            </div>
                            <div className="share_menu_fieldrow">
                                <button 
                                    className="share_menu_button"
                                    onClick={this.handleShareBoard}
                                >Share board now</button>
                            </div>
                        </div>
                        <div className={`share_menu_slider ${letFirstMenuHidden}`} >
                            <h3>Sharing session active!</h3>
                            <div className="share_menu_fieldrow">
                                <label>Join here : </label><a className="share_menu_link" href={link}>{link}</a>
                            </div>
                            <div className="share_menu_fieldrow">
                                <label>Security code : </label><div>{securityCode}</div>
                            </div>
                            <div className="share_menu_fieldrow">
                                <button 
                                    className="share_menu_button"
                                    onClick={this.handleCopyToClipBoard}
                                >Copy invite to clipboard</button>
                            </div>
                            {/*TODO : <div className="share_menu_fieldrow">
                                <textarea defaultValue="Share with these emails"></textarea>
                                <button 
                                        className="share_menu_button"
                                    >Send invite</button>
                        </div> */}
                            {/*TODO: <div className="share_menu_fieldrow">
                                <label>Time remaining : 40 minutes</label>
                    </div>*/}
                            <div className="share_menu_fieldrow">
                                <button 
                                        className="share_menu_button"
                                    >End session for all</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
  }

  export default Share;