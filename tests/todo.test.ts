const request = require("supertest");
const express = require("express");
const bodyParser = require("body-parser");
const todoController = require("../controllers/todo-controller");

const { connectDB } = require("../db-connection");

const app = express();

// Before all tests, connect to the database
beforeAll(async () => {
  await connectDB(); // Assuming connectDB is a function that connects to your database

  // Middleware for parsing JSON data
  app.use(bodyParser.json());

  // Use ToDo controller
  app.use("/", todoController);

  // Start the server
  app.listen(8080, () => {
    console.log(`Server is running on http://localhost:8080`);
  });
});

describe("ToDo API Endpoints", () => {
  let createdToDoId: number;

  test("Create ToDo item", async () => {
    const response = await request(app)
      .post("/todo")
      .send({ title: "Test Title", description: "Test Description" });

    expect(response.status).toEqual(201);
    createdToDoId = response.body.id;
  });

  test("Update ToDo item", async () => {
    const response = await request(app)
      .patch(`/todo/${createdToDoId}`)
      .send({ title: "Updated Title", description: "Updated Description" });

    expect(response.status).toEqual(200);
  });

  test("Get ToDo items with pagination", async () => {
    const response = await request(app).get("/todo?page=1&itemsPerPage=10");

    expect(response.status).toEqual(200);
  });

  test("Delete ToDo item", async () => {
    const response = await request(app).delete(`/todo/${createdToDoId}`);

    expect(response.status).toEqual(200);
  });
});

// After all tests, close the database connection
afterAll(async () => {
  // Assuming there is a function to close the database connection
  // Add any additional cleanup steps here if needed
});
