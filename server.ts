// app.js
const express = require("express");
const { connectDB } = require("./db-connection");
const bodyParser = require("body-parser");
const todoController = require("./controllers/todo-controller");
const cors = require("cors");

export const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());

// connect to database
connectDB();

// Middleware for parsing JSON data
app.use(bodyParser.json());

// Use ToDo controller
app.use("/", cors(), todoController);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
