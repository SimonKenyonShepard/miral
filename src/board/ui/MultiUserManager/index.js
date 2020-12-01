import React, {Component} from 'react';

import Avatar from "./avatar";
import Cursor from "./cursor";
import Credentials from "./credentials";

import {createNewObjectsForChangedElements} from "../../utils";

import './styles.css';

const rfc6902 = require('rfc6902');

//const colors = ["#A5DDE8", "#2B9DD6", "#F7DA34", "#F79854", "#E8553F"];
const colors = ["#F2275A", "#1B73B8", "#58BF3B", "#FFE800", "#F26130"];

//const HOST = "http://192.168.178.30:3001/";
const HOST = "https://miral-server.herokuapp.com/";

class MultiUserManager extends Component {

    constructor(props, context) {
      super(props, context);
      let min = 0,
          max = 4;
      this.state = {
          isParticipant : false,
          requestCreds : false,
          boardError : null,
          socket : null,
          boardUsers : {},
          companyName : "unfoldbio",
          boardID : "",
          securityCode : "",
          name : "",
          initials : "",
          id : this.props.userID,
          color : colors[Math.floor(Math.random(Date.now()) * (max - min + 1)) + min],
          prevCombinedBoardData : {
              elements : {...this.props.elements},
              elementState : {...this.elementState}
          }
      };
      this.emitQueue = {};
    }

    getJoinCreds = (organisation, boardID) => {
        const newState = {
            requestCreds : true
        };
        if(organisation) {
            newState.organisation = organisation;
        }
        if(boardID) {
            newState.boardID = boardID;
        }
        this.setState(newState);
    }

    setJoinCreds = (creds) => {
        const newState = Object.assign({}, creds, {requestCreds : false});
        this.setState(newState);
        this.setupJoinBoardSocketConnection(creds);
    }

    cancelJoinCreds = () => {
        const newState =  {requestCreds : false};
        this.setState(newState);
    }

    setupShareBoardSocketConnection = (meetingData) => {
        const {
            companyName
        } = this.state;

        const {
            boardID,
            securityCode,
            name,
            initials
        } = meetingData;

        const io = window.io;
        
        const socket = io(`${HOST}${companyName}`, {'reconnectionAttempts': 10});
        this.setState({
            socket,
            boardID,
            securityCode,
            name,
            initials
        });

        socket.on("connect", this.shareBoard);
        socket.on("connect_error", this.connectionFailed);
        socket.on('userJoin', this.userJoin);
        socket.on('userLeft', this.userLeft);
        socket.on('updatePointer', this.updatePointer);
        socket.on('updateBoard', this.updateBoard);

        
        
    }

    setupJoinBoardSocketConnection = (creds) => {
        const {
            securityCode,
            name,
            initials
        } = creds;

        const {
            companyName
        } = this.state;

        const io = window.io;
        const socket = io(`${HOST}${companyName}`, {'reconnectionAttempts': 10});
        
        this.setState({
            securityCode,
            name,
            initials,
            socket,
            isParticipant : true
        });

        socket.on("connect", this.joinBoard);
        socket.on("connect_error", this.connectionFailed);
        socket.on('initializeBoard', this.initializeBoard)
        socket.on('userJoin', this.userJoin);
        socket.on('userLeft', this.userLeft);
        socket.on('updatePointer', this.updatePointer);
        socket.on('updateBoard', this.updateBoard);

        socket.on('shareEnded', this.shareEnded);
       
    }

    shareBoard = () => {
        const {
            id,
            color,
            boardID,
            securityCode,
            name,
            initials,
            socket
        } = this.state;

        const owner = {
            id,
            color,
            name,
            initials,
            pointerPosition : this.props.pointerPosition,
        };

        const boardContents = {
            elements : this.props.elements,
            elementState : this.props.elementState
        };
        
        socket.emit("shareBoard", {
            boardID,
            boardContents,
            owner,
            securityCode,
            duration : 40
        });
        setInterval(this.purgeEmitQueue, 500);
        setInterval(this.checkBoardForUpdates, 1000);
    }

    connectionFailed = (error) => {
        console.log(error);
        this.state.socket.disconnect();
        this.setState({
            boardError : "connection to sharing server failed"
        });
    }

    joinBoard = () => {
        const {
            id,
            color,
            boardID,
            securityCode,
            name,
            initials,
            socket
        } = this.state;

        const user = {
            id,
            color,
            name,
            initials,
            pointerPosition : this.props.pointerPosition
        };

        socket.emit("joinBoard", {
            boardID,
            user,
            securityCode
        });

        setInterval(this.purgeEmitQueue, 500);
        setInterval(this.checkBoardForUpdates, 1000);
    }

    hideErrorScreen = () => {
        //this.props.clearSharingData();
        this.setState({
            boardError : null
        });
    }

    initializeBoard = (boardData) => {
        this.props.handleUpdateElementsAndState(boardData.boardContents);
        this.setState({
           boardUsers : boardData.users 
        });
    }

    updatePointer = (data) => {
        const testIfUserJoinedYet = this.state.boardUsers[data.id];
        if(testIfUserJoinedYet) {
            const newBoardUsers = {...this.state.boardUsers};
            const newBoardUser = {...newBoardUsers[data.id]};
            newBoardUser.pointerPosition = data.pointerPosition;
            newBoardUsers[data.id] = newBoardUser;
            this.setState({
                boardUsers : newBoardUsers
            });
        }
    }

    userJoin = (userData) => {
        const newBoardUsers = {...this.state.boardUsers};
        newBoardUsers[userData.id] = userData;
        this.setState({
            boardUsers : newBoardUsers
        });
    }

    userLeft = (userID) => {
        const newBoardUsers = {...this.state.boardUsers};
        delete newBoardUsers[userID];
        this.setState({
            boardUsers : newBoardUsers
        });
    }

    updateBoard = (data) => {
        const newCombinedData = createNewObjectsForChangedElements({
            elements : {...this.props.elements},
            elementState : {...this.props.elementState}
        }, data.elementsDiffUpdates);
        rfc6902.applyPatch(newCombinedData, data.elementsDiffUpdates);
        console.log("new patch", data.elementsDiffUpdates);
        console.log("recieved update", newCombinedData);
        this.setState({
            prevCombinedBoardData : newCombinedData
        });
        this.props.handleUpdateElementsAndState(newCombinedData);
    }

    shareEnded = (data) => {
        this.setState({
            boardError : data.reason
        });
    }

    addToEmitQueue = (event, payload) => {
        const {
            emitQueue
        } = this;
        if(!emitQueue[event]) {
            emitQueue[event] = [];
        }
        emitQueue[event].push(payload);
    }

    purgeEmitQueue = () => {
        const {
            socket
        } = this.state;
        Object.keys(this.emitQueue).forEach(event => {
            const lastItem = this.emitQueue[event].pop();
            socket.emit(event, lastItem);
            delete this.emitQueue[event];
        });
    }

    render() {

        const {
            boardID,
            boardUsers,
            isParticipant,
            requestCreds,
            socket,
            boardError
        } = this.state;

        const {
            shareBoard
        } = this.props;

        let userDockItems = [];
        let userCursors = [];

        const containerStyles = {
            pointerEvents: "none",
            position: "absolute",
            left : 0,
            top: 0,
            height: "100vh",
            width : "100vw"
        };

        const isInSharedMeeting = (shareBoard || isParticipant) && socket && boardError === null;

        if(isInSharedMeeting) {
            if(Object.keys(boardUsers).length > 0) {
                Object.keys(boardUsers).forEach(boardUser => {
                    userDockItems.push(<Avatar key={boardUser} data={boardUsers[boardUser]}/>);
                    if(boardUser !== this.state.id) {
                        userCursors.push(<Cursor 
                            key={boardUsers[boardUser].id+"_key"} 
                            data={boardUsers[boardUser]}
                            offsetX={this.props.offsetX}
                            offsetY={this.props.offsetY}
                            zoomLevel={this.props.zoomLevel}
                        />);
                    }
                })
            }
            if(boardError) {
                containerStyles.pointerEvents = "auto";
            }
        }

        if(boardError || requestCreds) {
            containerStyles.pointerEvents = "auto";
        }
        
        return (
            <div
                id="mutliUserManager"
                style={containerStyles}
            >
            {((Object.keys(boardUsers).length > 0) &&
                <> 
                <div className={"multiUser_UserDock"}>
                    {userDockItems}
                </div>
                <div className={"multiUser_UserCursors"}>
                    {userCursors}
                </div>
                </>
            )}
            {(boardError && 
                <div className={"multiUser_boardOverlay"}>
                    <span className={"multiUser_boardErrorText"}>Board unavailable : {boardError}</span>
                    <div 
                        className={"multiUser_boardErrorReturn"}
                        onClick={this.hideErrorScreen} 
                    >Back</div>
                </div>
            )}
            {(requestCreds && 
                <div className={"multiUser_boardOverlay"}>
                    <Credentials
                        boardID={boardID}
                        setJoinCreds={this.setJoinCreds}
                        cancelJoinCreds={this.cancelJoinCreds}
                    />
                </div>
            )}
            </div>
            
        );
    }

    checkBoardForUpdates = () => {
        const {
            boardID,
            socket,
            isParticipant,
            boardError,
            prevCombinedBoardData
        } = this.state;

        const isInSharedMeeting = (this.props.shareBoard || isParticipant) && socket && boardError === null;

        if(isInSharedMeeting) {
            const currentCombinedData = {
                elements : this.props.elements,
                elementState : this.props.elementState 
            };
            const elementsDiffUpdates = rfc6902.createPatch(prevCombinedBoardData, currentCombinedData);
            if(elementsDiffUpdates.length > 0) {
                socket.emit("updateBoard", {boardID, elementsDiffUpdates});
                this.setState({
                    prevCombinedBoardData : currentCombinedData
                });
            }
        }
    }

    componentDidUpdate(prevProps) {
        const {
            boardID,
            socket,
            id,
            isParticipant,
            boardError
        } = this.state;
        
        if(prevProps.shareBoard !== this.props.shareBoard) {
            if(this.props.shareBoard && !socket) {
                console.log(this.props.shareBoard);
                this.setupShareBoardSocketConnection(this.props.shareBoard);
            } else {
                //TODO : emit unShareBoard event
            }
        }
        const isInSharedMeeting = (this.props.shareBoard || isParticipant) && socket && boardError === null;
        //Evaluate mouseData
        const { pointerPosition } = this.props;
        const mouseMoved = (pointerPosition.x !== prevProps.pointerPosition.x) || (pointerPosition.y !== prevProps.pointerPosition.y);
        if(isInSharedMeeting && mouseMoved) {
            this.addToEmitQueue("updatePointer", {boardID, id, pointerPosition});
        }
    }

    componentDidMount(){
        //check if is joining a remote board
        if(window.location.hash.indexOf("j=") !== -1) {
            const organisation = window.location.hash.match(/o=([^&$]*)/m)[1];
            const boardID = window.location.hash.match(/j=([^&$]*)/m)[1];
            this.setState({
                companyName : organisation,
                boardID,
                requestCreds : true
            });
        }
        window.workshoppr = {};
        window.workshoppr.joinBoard = this.getJoinCreds;
    }

    componentWillUnmount(){
        
    }
    
  }

  export default MultiUserManager;