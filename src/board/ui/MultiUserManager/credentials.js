import React, {Component} from 'react';

import './styles.css';


class Credentials extends Component {

    constructor(props, context) {
      super(props, context);
      
      this.state = {
          boardID : this.props.boardID,
          securityCode : "",
          name : "",
          initials : "",
      };
    }

    handleNicknameUpdate = (e) => {
        this.setState({
            name : e.target.value
        });
    }

    handleBoardIDUpdate = (e) => {
        this.setState({
            boardID : e.target.value
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

    handleSubmitCredentials = () => {
        const {
            securityCode,
            name,
            initials,
            boardID
        } = this.state;

        const creds = {
            securityCode,
            name,
            initials,
            boardID
        };
       this.props.setJoinCreds(creds);

    }

    render() {

        const {
            securityCode,
            name,
            initials,
            boardID
        } = this.state;
        
        return (
            <div className={"multiUser_requestCreds"}>
                <h3>Enter session credentials</h3>
                <div className="share_menu_fieldrow">
                    <label>Board ID : </label>
                    <input 
                        className="share_menu_input"
                        placeholder="xxxxxx"
                        value={boardID}
                        onChange={this.handleBoardIDUpdate}
                    />
                </div>
                <div className="share_menu_fieldrow">
                    <label>your nickname : </label>
                    <input 
                        className="share_menu_input"
                        placeholder="e.g. john"
                        value={name}
                        onChange={this.handleNicknameUpdate}
                    />
                </div>
                <div className="share_menu_fieldrow">
                    <label>your initials : </label>
                    <input 
                        className="share_menu_input"
                        placeholder="js"
                        value={initials}
                        onChange={this.handleInitalsUpdate}
                    />
                </div>
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
                        onClick={this.handleSubmitCredentials}
                    >Join board</button>
                </div>
                <div className="share_menu_fieldrow">
                    <button 
                        className="share_menu_button"
                        onClick={this.props.cancelJoinCreds}
                    >Cancel</button>
                </div>
            </div>
        );
    }
    
  }

  export default Credentials;