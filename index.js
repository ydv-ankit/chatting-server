const express = require("express");
const app = express();
const cors = require("cors");
const userRoutes = require("./routes/user.route");
const authRoutes = require("./routes/auth.route");
const { connectDB } = require("./db/config");

// environment variables
const dotenv = require("dotenv");
dotenv.config();
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

// routes
app.get("/health", (req, res) => {
  res.send("Hello World");
});
// additional routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
// app.use("/api/messages", messageRoutes);

// server
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
