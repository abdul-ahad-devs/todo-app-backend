const {
  createToDoErrorHandler,
} = require("../error-handler/todo-error-handler");

// controllers/todo-controller.js
const express = require("express");
const router = express.Router();
const {
  createToDo,
  updateToDo,
  deleteToDo,
  getToDos,
} = require("../services/todo-service");

// Create ToDo item
router.post("/todo", createToDoErrorHandler, async (req, res) => {
  try {
    const { title, description } = req.body;
    const newToDo = await createToDo(title, description);
    res.status(201).json(newToDo);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "Something unexpected occurred",
    });
  }
});

// Update ToDo item
router.patch("/todo/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { title, description } = req.body;
    const updatedToDo = await updateToDo(id, title, description);
    res.json(updatedToDo);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "Something unexpected occurred",
    });
  }
});

// Delete ToDo item
router.delete("/todo/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await deleteToDo(id);
    res.json({ message: "ToDo item deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "Something unexpected occurred",
    });
  }
});

// View ToDo items with pagination
router.get("/todo", async (req, res) => {
  try {
    const page = req.query.page;
    const itemsPerPage = req.query.itemsPerPage;
    const todos = await getToDos(
      parseInt(page, 10) ?? 1,
      parseInt(itemsPerPage, 10) ?? 10
    );
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "Something unexpected occurred",
    });
  }
});

module.exports = router;
