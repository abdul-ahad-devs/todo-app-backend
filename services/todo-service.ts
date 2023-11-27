// services/todo-service.js
const { ToDo } = require("../models/ToDo");
const { getRepository } = require("typeorm");

const createToDo = async (title, description) => {
  const todoRepository = getRepository(ToDo);

  const newToDo = todoRepository.create({
    title,
    description,
  });

  await todoRepository.save(newToDo);
  return newToDo;
};

const updateToDo = async (id, title, description) => {
  const todoRepository = getRepository(ToDo);

  const todo = await todoRepository.findOne({ where: { id } });

  if (!todo) {
    throw new Error("ToDo item not found");
  }

  todo.title = title;
  todo.description = description;

  await todoRepository.save(todo);
  return todo;
};

const deleteToDo = async (id) => {
  const todoRepository = getRepository(ToDo);

  const todo = await todoRepository.findOne({ where: { id } });

  if (!todo) {
    throw new Error("ToDo item not found");
  }

  await todoRepository.remove(todo);
};

const getToDos = async (page = 1, itemsPerPage = 3) => {
  const todoRepository = getRepository(ToDo);
  const offset = (page - 1) * itemsPerPage;

  const [todos, total] = await todoRepository.findAndCount({
    skip: offset,
    take: itemsPerPage,
  });

  const totalPages = Math.ceil(total / itemsPerPage);

  return {
    items: todos,
    meta: {
      totalPages,
      currentPage: page,
      totalItems: total,
      itemsPerPage,
    },
  };
};

module.exports = { createToDo, updateToDo, deleteToDo, getToDos };
