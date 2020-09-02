import React, {Component} from 'react';

import Shortid from 'shortid';

import './styles.css';
import { nullLiteral } from '@babel/types';

const rfc6902 = require('rfc6902');

class Cursor extends Component {
    render() {
        const {
            data,
            zoomLevel
        } = this.props;

        const posX = data.pointerPosition.x/zoomLevel,
              posY = data.pointerPosition.y/zoomLevel;

        const cursorPosition = {
            transform : `translate3d(${posX}px, ${posY}px, 0px)`,
        }

        return (
            <div className="multiUser_UserCursor" style={cursorPosition}>
                {this.props.data.initials}
            </div>
        );
    }
}

class Avatar extends Component {
    render() {
        return (
            <div className="multiUser_UserDockAvatar">
                {this.props.data.name}
            </div>
        );
    }
}

class MultiUserManager extends Component {

    constructor(props, context) {
      super(props, context);
      this.state = {
          isParticipant : false,
          boardError : null,
          socket : null,
          boardUsers : {},
          companyName : "unfoldbio",
          boardID : "2eweor3892",
          password : "miral",
          id : Shortid.generate()
      };
    }

    setupShareBoardSocketConnection = () => {
        const {
            companyName,
            boardID,
            password,
            id
        } = this.state;

        const owner = {
            id,
            name : "simon",
            initials : "ss",
            pointerPosition : this.props.pointerPosition
        };
       
        const io = window.io;
        const boardContents = {
            elements : this.props.elements,
            elementState : this.props.elementState
        };
        const socket = io(`http://localhost:3001/${companyName}`);
        socket.emit("shareBoard", {
            boardID,
            boardContents,
            owner,
            password,
            duration : 40
        });

        socket.on('userJoin', (userData) => {
            console.log("userJoin", userData);
            const newBoardUsers = {...this.state.boardUsers};
            newBoardUsers[userData.id] = userData;
            this.setState({
                boardUsers : newBoardUsers
            });
        });

        socket.on('updatePointer', (data) => {
            const testIfUserJoinedYet = this.state.boardUsers[data.id];
            if(testIfUserJoinedYet) {
                const newBoardUsers = {...this.state.boardUsers};
                newBoardUsers[data.id].pointerPosition = data.pointerPosition;
                this.setState({
                    boardUsers : newBoardUsers
                });
            }
        });

        socket.on('updateBoard', (data) => {
            const newCombinedData = {
                elements : {...this.props.elements},
                elementState : {...this.props.elementState},
                multiUserUpdate : true 
            };
            rfc6902.applyPatch(newCombinedData, data.elementsDiffUpdates);
            this.props.handleUpdateElementsAndState(newCombinedData);
        });

        this.setState({
            socket
        });
    }

    setupJoinBoardSocketConnection = () => {
       const {
            companyName,
            boardID,
            password,
            id
        } = this.state;

        const user = {
            id,
            name : "simonJoin",
            initials : "sks",
            pointerPosition : this.props.pointerPosition
        };

        const io = window.io;
        const socket = io(`http://localhost:3001/${companyName}`);
        socket.emit("joinBoard", {
            boardID,
            user,
            password
        });
        socket.on('initializeBoard', (boardData) => {
            this.props.handleUpdateElementsAndState(boardData.boardContents);
            this.setState({
               boardUsers : boardData.users 
            });
        })
        socket.on('userJoin', (userData) => {
            const newBoardUsers = {...this.state.boardUsers};
            newBoardUsers[userData.id] = userData;
            this.setState({
                boardUsers : newBoardUsers
            });
        });
        socket.on('updatePointer', (data) => {
            console.log("recieve pointer update", data);
            const newBoardUsers = {...this.state.boardUsers};
            newBoardUsers[data.id].pointerPosition = data.pointerPosition;
            this.setState({
                boardUsers : newBoardUsers
            });
        });
        socket.on('updateBoard', (data) => {
            const newCombinedData = {
                elements : {...this.props.elements},
                elementState : {...this.props.elementState},
                multiUserUpdate : true  
            };
            rfc6902.applyPatch(newCombinedData, data.elementsDiffUpdates);
            this.props.handleUpdateElementsAndState(newCombinedData);
        });
        socket.on('shareEnded', (data) => {
            this.setState({
                boardError : data.reason
            });
        });
        this.setState({
            socket,
            isParticipant : true
        });
    }

    render() {

        const {
            boardUsers,
            isParticipant,
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
                            zoomLevel={this.props.zoomLevel}
                        />);
                    }
                })
            }
            if(boardError) {
                containerStyles.pointerEvents = "auto";
            }
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
                <div className={"multiUser_boardError"}>
                    <span className={"multiUser_boardErrorText"}>Board unavailable : {boardError}</span>
                </div>
            )}
            </div>
            
        );
    }

    componentDidUpdate(prevProps) {
        const {
            boardID,
            socket,
            isParticipant,
            id,
            boardError
        } = this.state;
        
        if(prevProps.shareBoard !== this.props.shareBoard) {
            if(this.props.shareBoard && !socket) {
                this.setupShareBoardSocketConnection();
            } else {
                //TODO : emit unShareBoard event
            }
        }
        const isInSharedMeeting = (this.props.shareBoard || isParticipant) && socket && boardError === null;
        if(isInSharedMeeting && !this.props.multiUserUpdate) {
            const prevCombinedData = {
                elements : prevProps.elements,
                elementState : prevProps.elementState 
            };
            const currentCombinedData = {
                elements : this.props.elements,
                elementState : this.props.elementState 
            };
            const elementsDiffUpdates = rfc6902.createPatch(prevCombinedData, currentCombinedData);
            if(elementsDiffUpdates.length > 0) {
                socket.emit("updateBoard", {boardID, elementsDiffUpdates});
            }
        } else if (this.props.multiUserUpdate) {
            this.props.handleUpdateElementsAndState({multiUserUpdate : false});
        }
        //Evaluate mouseData
        const { pointerPosition } = this.props;
        const mouseMoved = (pointerPosition.x !== prevProps.pointerPosition.x) || (pointerPosition.y !== prevProps.pointerPosition.y);
        if(isInSharedMeeting && mouseMoved) {
            socket.emit("updatePointer", {boardID, id, pointerPosition});
        }
    }

    componentDidMount(){
        //check if is joining a remote board
        if(window.location.hash.indexOf("join") !== -1) {
            this.setupJoinBoardSocketConnection();
        }
    }

    componentWillUnmount(){
        
    }
    
  }

  export default MultiUserManager;