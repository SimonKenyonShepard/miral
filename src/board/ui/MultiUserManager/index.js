import React, {Component} from 'react';

import Shortid from 'shortid';

import './styles.css';

const rfc6902 = require('rfc6902');

class Cursor extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {};
        this.cursorRef = React.createRef();
        this.cursorAnimation = null;
        this.lastUpdate = null;
    }

    render() {
        const color = "#007fff";

        const wrapperCSS = {
            color
        };

        return (
            <div className="multiUser_UserCursorWrapper" ref={this.cursorRef} style={wrapperCSS}>
                <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" className="multiUser_UserCursor">
                    <path fill={color} d="m0.2125,0.101564l5.116674,15.552611c1.603039,-5.720502 1.863999,-7.627336 10.401108,-9.534169l-15.517782,-6.018442z" />
                </svg>
                {this.props.data.initials}
            </div>
        );
    }

    componentDidUpdate(prevProps) {
        const {
            offsetX,
            offsetY,
            zoomLevel
        } = this.props;

        const currentX = this.props.data.pointerPosition.x/zoomLevel-(offsetX/zoomLevel),
              currentY = this.props.data.pointerPosition.y/zoomLevel-(offsetY/zoomLevel),
              prevX = prevProps.data.pointerPosition.x/prevProps.zoomLevel-(prevProps.offsetX/prevProps.zoomLevel),
              prevY = prevProps.data.pointerPosition.y/prevProps.zoomLevel-(prevProps.offsetY/prevProps.zoomLevel);
        
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