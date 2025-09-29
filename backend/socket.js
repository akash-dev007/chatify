const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const {Server} = require("socket.io");


// init socket.io server
const io = new Server(server,{
  cors:{
    origin: '*',
  }
})
// store online user
const userSocketMap = {} // {userId:socketId}

// socket.io connection event
io.on("connection",(socket) => {
  const userId = socket.handshake.query.userId;
  console.log("New user connected",userId);
  if(userId) {
    userSocketMap[userId] = socket.id;
  }

  // emit online users to all connected
  io.emit('getOnlineUsers',Object.keys(userSocketMap));
  socket.on("disconnect",()=>{
    console.log("user disconnected",userId);
    if(userId) {
      delete userSocketMap[userId];
    }
    // update online users to all connected
    io.emit('getOnlineUsers',Object.keys(userSocketMap));
  })
})
 
module.exports = {
    app,io,userSocketMap,server 
}