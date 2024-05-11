const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userRoutes = require("./routes/user.route");
const authRoutes = require("./routes/auth.route");
const chatRoutes = require("./routes/chat.route");
const messageRoutes = require("./routes/message.route");
const { connectDB } = require("./db/config");
const { server, app } = require("./socket/socket");

// environment variables
const dotenv = require("dotenv");
const { protectedRoute } = require("./utils/protectedRoute");
dotenv.config({
  path: "./.env",
});
const PORT = process.env.PORT || 8888;

// middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.get("/health", (req, res) => {
  res.send("server is running smoothly!");
});

// additional routes
app.use("/api/auth", authRoutes);
app.use("/api/users", protectedRoute, userRoutes);
app.use("/api/chats", protectedRoute, chatRoutes);
app.use("/api/messages", protectedRoute, messageRoutes);

// server listening
server.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
