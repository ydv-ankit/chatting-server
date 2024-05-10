const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const dotenv = require("dotenv");
dotenv.config({
  path: "./.env",
});

const app = express();
const server = createServer(app);

const io = new Server(server,{
  cors: {
    origin: [process.env.CORS_ORIGIN],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

module.exports = { server, io, app };
