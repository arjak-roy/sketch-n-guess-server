// const socketId = require('../Models/socketId');
const room = require('../Models/room');
const { json } = require('express');

//*importing socketIo from app.js
const io = require('../app').io;

const rooms = {};//stores the rooms
const roomState = {}; //max room current canvas data and members
const MAX = 8;

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
        }
        rooms[assignedRoom].push(socket.id);
        console.log(`ROOMS:\n${JSON.stringify(rooms[assignedRoom])}`);
        socket.join(assignedRoom);
        console.log(`User ${socket.id} joined ${assignedRoom}`);
        socket.emit('roomAssigned', assignedRoom); //notifying user that they have joined some room
        socket.broadcast.to(assignedRoom).emit('userJoined', {
            socketId: socket.id,
        });
        //Syncing newly joined socket
        socket.emit('recievedata', {
            canvasData : roomState[assignedRoom],
            roomMembers : (rooms[assignedRoom])
        });
        //disconnect
        socket.on("disconnect", (data) => {
            console.log(`Socket disconnected: ${socket.id} + ${data}`);
            if (assignedRoom) {
                const index = rooms[assignedRoom].indexOf(socket.id);
                if (index !== -1) {
                    rooms[assignedRoom].splice(index, 1);

                    // Clean up empty rooms
                    if (rooms[assignedRoom].length === 0) {
                        delete rooms[assignedRoom];
                        console.log(`Room ${assignedRoom} deleted`);
                    }
                }
            }
        });
        socket.on("draw", async (datafromclient) => {
            var json = JSON.parse(datafromclient);
            roomState[assignedRoom] = json;
            io.to(assignedRoom).emit("recievedata", {
                canvasData : roomState[assignedRoom],
                roomMembers : (rooms[assignedRoom])


            });
        })

    })
}