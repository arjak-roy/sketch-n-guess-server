// const socketId = require('../Models/socketId');
// const room = require('../Models/room');
const getrandom = require('../services/word-dictionary').giveRandomWord;
const { json } = require('express');

//*importing socketIo from app.js
const io = require('../app').io;

const socketTousername = {}; //stores the socket to username
const socketToRoom = {}; //stores the socket to room
const rooms = {};//stores the rooms members
const roomState = {}; //max room current canvas data
const roomGameEngine = {};//stores the game data
const usernamesbyRoom = {};
/*
{
    roomName : {
        isGameActive : true of false
        currentTurn : //current player turn
        roomMembers : []
        currentWord : //current word
    }
}
*/
const MAX = 5;

/**
 * Initializes and manages socket connections for handling real-time interactions.
 * 
 * This function listens for new socket connections and assigns them to rooms,
 * ensuring that each room does not exceed the maximum number of members. Upon
 * connection, it emits events to notify users of room assignments and updates
 * them with the current room state. It also listens for disconnection events
 * and updates room membership accordingly, deleting empty rooms when necessary.
 * 
 * Listens for the following socket events:
 * - 'connection': Assigns the new socket to a room and manages room membership.
 * - 'disconnect': Removes the socket from its assigned room and cleans up if
 *   the room is empty.
 * - 'draw': Updates the room state with drawing data received from clients and
 *   broadcasts it to all members in the room.
 */

exports.socketController = () => {
    io.on("connection", (socket) => {
        socket.on("handshake", (data) => {
            console.log(`Socket connected: ${socket.id}`);
            //logic to assign room---
            let assignedRoom = null;
            for (roomName in rooms) {
                if (rooms[roomName].length < MAX) {
                    assignedRoom = roomName;
                    break;
                }
            }
            if (assignedRoom == null) {
                assignedRoom = `room_${Object.keys(rooms).length + 1}`;
                rooms[assignedRoom] = [];
                roomState[assignedRoom] = null;
                usernamesbyRoom[assignedRoom] = [];
                roomGameEngine[assignedRoom] = {
                    isGameActive : false,
                    currentTurn : null,
                    roomMembers : [],
                    currentWord : null
                }
            }
            rooms[assignedRoom].push(socket.id);
            socketTousername[socket.id] = data;
            usernamesbyRoom[assignedRoom].push(socketTousername[socket.id]);
            // console.log(usernamesbyRoom);
            // console.log(socketTousername);
            console.log(`ROOMS:\n${JSON.stringify(usernamesbyRoom[assignedRoom])}`);
            socket.join(assignedRoom);
            console.log(`User ${socketTousername[socket.id]} joined ${assignedRoom}`);
            socket.emit('roomAssigned', assignedRoom); //notifying user that they have joined some room
            socket.broadcast.to(assignedRoom).emit('userJoined', {
                socketId: socket.id,
                // roomMembers : (rooms[assignedRoom]),
                roomMembers : (usernamesbyRoom[assignedRoom]),
                username : socketTousername[socket.id]
            });
            //Syncing newly joined socket
    
            socket.emit('recievedata', {
                canvasData : roomState[assignedRoom],
                // roomMembers : (rooms[assignedRoom]),
                roomMembers : (usernamesbyRoom[assignedRoom]),
                gameData : roomGameEngine[assignedRoom]
            });
            socketToRoom[socket.id] = assignedRoom;
            //checks if game can be started
            if(rooms[assignedRoom].length >= 2){
                if(roomGameEngine[assignedRoom]['isGameActive'] != true){
                    roomGameEngine[assignedRoom]['isGameActive'] = true;
                }
            }
            else{
                io.to(assignedRoom).emit('gamemessage','Waiting for more players');
            }
    
            //if game is active
            if(roomGameEngine[assignedRoom]['isGameActive'] === true && rooms[assignedRoom].length === 2){
                //initilizing game
                socket.to(assignedRoom).emit('gamemessage',`Game has started in ${assignedRoom}`);
                roomGameEngine[assignedRoom]['currentTurn'] = usernamesbyRoom[assignedRoom][0];
                roomGameEngine[assignedRoom]['roomMembers'] = usernamesbyRoom[assignedRoom];
                roomGameEngine[assignedRoom]['currentWord'] = getrandom();
                io.to(assignedRoom).emit('gameEngineData',roomGameEngine[assignedRoom]);
                //Continueing game
                socket.on('timeoutForSocket',(datafromclient)=>{
                    var json = JSON.parse(datafromclient);
                    // console.log(`Socket timeout:${json.currentTurn}`);
                    roomGameEngine[assignedRoom]['currentTurn'] = usernamesbyRoom[assignedRoom][(usernamesbyRoom[assignedRoom].indexOf(json.currentTurn) + 1) % usernamesbyRoom[assignedRoom].length];
                    roomGameEngine[assignedRoom]['roomMembers'] = usernamesbyRoom[assignedRoom];
                    roomGameEngine[assignedRoom]['currentWord'] = getrandom();
                    io.to(assignedRoom).emit('gameEngineData',roomGameEngine[assignedRoom]);
    
                })
            }
            //guessedWord
            socket.on('correctguess',(datafromclient)=>{
                var json = JSON.parse(datafromclient);
                io.to(assignedRoom).emit("wordGuessedBySocket", json);
            });
            //disconnect
            socket.on("disconnect", (data) => {
                let username = socketTousername[socket.id];
                const assignedRoom = socketToRoom[socket.id]; // Retrieve room for this socket
                delete socketTousername[socket.id];
                delete socketToRoom[socket.id];
                console.log(`Socket disconnected: ${socket.id} + ${data}`);
                if (assignedRoom) {
                    const indexforRoom = rooms[assignedRoom].indexOf(socket.id);
                    const index = usernamesbyRoom[assignedRoom].indexOf(username);

                    if (index !== -1) {
                        rooms[assignedRoom].splice(indexforRoom, 1);
                        usernamesbyRoom[assignedRoom].splice(index, 1);
                        // Clean up empty rooms
                        if (rooms[assignedRoom].length === 0) {
                            delete rooms[assignedRoom];
                            delete roomState[assignedRoom];
                            delete roomGameEngine[assignedRoom];
                            delete usernamesbyRoom[assignedRoom];
                            console.log(`Room ${assignedRoom} deleted`);
                        }
                        if(roomGameEngine[assignedRoom]){
                            if(username === roomGameEngine[assignedRoom]['currentTurn']){
                                if(rooms[assignedRoom].length === 1){
                                    roomGameEngine[assignedRoom]['isGameActive'] = false;
                                    roomGameEngine[assignedRoom]['currentTurn'] = "";
                                    roomGameEngine[assignedRoom]['currentWord'] = "";
                                    io.to(assignedRoom).emit('gameEngineData',roomGameEngine[assignedRoom]);
                                    io.to(assignedRoom).emit('resetTimeOut',`Player ${socket.id} has left the game`);
                
                                }
                                if(rooms[assignedRoom].length > 1){                    
                                    roomGameEngine[assignedRoom]['currentTurn'] = usernamesbyRoom[assignedRoom][(usernamesbyRoom[assignedRoom].indexOf(roomGameEngine[assignedRoom]['currentTurn']) + 1) % usernamesbyRoom[assignedRoom].length];
                                    roomGameEngine[assignedRoom]['roomMembers'] = usernamesbyRoom[assignedRoom];
                                    roomGameEngine[assignedRoom]['currentWord'] = getrandom();
                                    io.to(assignedRoom).emit('gameEngineData',roomGameEngine[assignedRoom]);
                                    io.to(assignedRoom).emit('resetTimeOut',`Player ${username} has left the game`);
                                }
                            }
                        }
                        
                        if(roomGameEngine[assignedRoom]){
                            if(rooms[assignedRoom].length === 1){
                                roomGameEngine[assignedRoom]['isGameActive'] = false;
                                roomGameEngine[assignedRoom]['currentTurn'] = "";
                                roomGameEngine[assignedRoom]['currentWord'] = "";
                                io.to(assignedRoom).emit('gameEngineData',roomGameEngine[assignedRoom]);
                                io.to(assignedRoom).emit('resetTimeOut',`Player ${socket.id} has left the game`);
            
                            }
                                   
                        }
    
                    }
    
                }
    
                if (assignedRoom in rooms){
                    socket.broadcast.to(assignedRoom).emit('userLeft', {
                        socketId: username,
                        // roomMembers : (rooms[assignedRoom])
                        roomMembers : (usernamesbyRoom[assignedRoom]),

                    });
                    if(rooms[assignedRoom].length < 2){
                        roomGameEngine[assignedRoom]['isGameActive'] = false;
                        io.to(assignedRoom).emit('gamemessage','Waiting for more players');
                    }
                }
            });
    
            
            socket.on("draw", async (datafromclient) => {
                console.log(assignedRoom);
                var json = JSON.parse(datafromclient);
                roomState[assignedRoom] = json;
                socket.broadcast.to(assignedRoom).emit("recievedata", {
                    canvasData : roomState[assignedRoom],
                    // roomMembers : (rooms[assignedRoom])
                    roomMembers : (usernamesbyRoom[assignedRoom]),
                });
            })
    
            socket.on("messagebroadcast",(datafromclient) => {
                console.log(datafromclient);
                var json = JSON.parse(datafromclient);
                io.to(assignedRoom).emit("messagebroadcast", json);
            })
        })



    })
}
