import React, {Component} from 'react';

import Shortid from 'shortid';

import './styles.css';

const rfc6902 = require('rfc6902');

let eventsPerSecond = 0;

const logEventsPerSecond = function() {
    console.log(eventsPerSecond);
    eventsPerSecond = 0;
}

class Cursor extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {};
        this.cursorRef = React.createRef();
        this.cursorAnimation = null;
        this.lastUpdate = null;
    }

    render() {
        // const {
        //     data,
        //     zoomLevel
        // } = this.props;

        // const posX = data.pointerPosition.x/zoomLevel,
        //       posY = data.pointerPosition.y/zoomLevel;

        // const cursorPosition = {
        //     transform : `translate3d(${posX}px, ${posY}px, 0px)`,
        // }

        return (
            <div className="multiUser_UserCursor" ref={this.cursorRef}>
                {this.props.data.initials}
            </div>
        );
    }

    componentDidUpdate(prevProps) {
        const {
            zoomLevel
        } = this.props;

        const currentX = this.props.data.pointerPosition.x/zoomLevel,
              currentY = this.props.data.pointerPosition.y/zoomLevel,
              prevX = prevProps.data.pointerPosition.x/prevProps.zoomLevel,
              prevY = prevProps.data.pointerPosition.y/prevProps.zoomLevel;
        
        const mouseXDidUpdate = (prevX !== currentX);
        const mouseYDidUpdate =  (prevY !== currentY);
        const mouseDidUpdate = mouseXDidUpdate || mouseYDidUpdate;
        if(mouseDidUpdate) {
            
            this.cursorRef.current.animate(
                [
                    {transform : `translate3d(${prevX}px, ${prevY}px, 0px)`},
                    {transform : `translate3d(${currentX}px, ${currentY}px, 0px)`}
                ]
            , {
                fill: 'forwards',
                easing: 'linear',
                duration: 500
              });

        }
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
      this.emitQueue = {};
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
        const socket = io(`http://192.168.178.30:3001/${companyName}`);
        socket.emit("shareBoard", {
            boardID,
            boardContents,
            owner,
            password,
            duration : 40
        });

        socket.on('userJoin', this.userJoin);
        socket.on('updatePointer', this.updatePointer);
        socket.on('updateBoard', this.updateBoard);

        this.setState({
            socket
        });
        //setInterval(logEventsPerSecond, 1000);
        setInterval(this.purgeEmitQueue, 500);
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
        const socket = io(`http://192.168.178.30:3001/${companyName}`);
        socket.emit("joinBoard", {
            boardID,
            user,
            password
        });
        socket.on('initializeBoard', this.initializeBoard)
        socket.on('userJoin', this.userJoin);
        socket.on('updatePointer', this.updatePointer);
        socket.on('updateBoard', this.updateBoard);

        socket.on('shareEnded', this.shareEnded);

        this.setState({
            socket,
            isParticipant : true
        });

        setInterval(this.purgeEmitQueue, 500);
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

    updateBoard = (data) => {
        const newCombinedData = {
            elements : {...this.props.elements},
            elementState : {...this.props.elementState},
            multiUserUpdate : true  
        };
        rfc6902.applyPatch(newCombinedData, data.elementsDiffUpdates);
        console.log("recieved update", newCombinedData);
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
            socket.emit(event, this.emitQueue[event].pop());
            eventsPerSecond += 1;
            delete this.emitQueue[event];
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
                this.addToEmitQueue("updateBoard", {boardID, elementsDiffUpdates});
                //eventsPerSecond += 1;
            }
        } else if (this.props.multiUserUpdate) {
            this.props.handleUpdateElementsAndState({multiUserUpdate : false});
        }
        //Evaluate mouseData
        const { pointerPosition } = this.props;
        const mouseMoved = (pointerPosition.x !== prevProps.pointerPosition.x) || (pointerPosition.y !== prevProps.pointerPosition.y);
        if(isInSharedMeeting && mouseMoved) {
            this.addToEmitQueue("updatePointer", {boardID, id, pointerPosition});
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