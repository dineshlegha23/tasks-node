const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();
const tasksRouter = require("./routes/tasksRouter");
const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use("/api/v1/tasks", tasksRouter);

const startServer = async () => {
  try {
    await connectDB(process.env.MONGODB_USERNAME, process.env.MONGODB_PASSWORD);

    app.listen(3000, () => {
      console.log("Server is running on port:3000");
    });
  } catch (err) {
    console.log(err);
  }
};

startServer();
