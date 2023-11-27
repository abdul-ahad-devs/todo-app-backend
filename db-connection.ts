// db-connection.js
const { createConnection } = require("typeorm");
const { ToDo } = require("./models/ToDo");

const connectDB = async () => {
  try {
    const connection = await createConnection({
      type: "postgres",
      host: "localhost",
      port: 5433,
      username: "postgres",
      password: "192837",
      database: "todo_app",
      entities: [ToDo],
      synchronize: true,
      logging: true,
    });

    console.log("Connected to the database");
    return connection;
  } catch (error) {
    console.error("Error connecting to the database", error);
    throw error;
  }
};

module.exports = { connectDB };
