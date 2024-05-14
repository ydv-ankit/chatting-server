const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const dotenv = require("dotenv");
dotenv.config({
  path: "./.env",
});

const app = express();
const server = createServer(app);

let onlineUsers = {};

const getOnlineUserSocketId = (userId) => {
  console.log("onlineUsers:", onlineUsers);
  console.log("userId:", userId);
  return onlineUsers[userId];
};

const io = new Server(server, {
  cors: {
    origin: [process.env.CORS_ORIGIN],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");
  if (socket?.handshake?.query?.userId) {
    onlineUsers[socket?.handshake?.query?.userId] = socket.id;
  } else {
    // close connection
    console.log("connection closed as no userId found");
    socket.disconnect();
  }
  console.log("onlineUsers:", onlineUsers);

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

module.exports = { server, io, app, getOnlineUserSocketId };
