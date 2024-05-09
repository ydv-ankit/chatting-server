const express = require("express");
const app = express();

// environment variables
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 8888;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.get("/health", (req, res) => {
  res.send("Hello World");
});

// server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
