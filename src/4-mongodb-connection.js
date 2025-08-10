const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Middleware to parse JSON body
app.use(express.json());

// Connect to MongoDB then start server
connectDB()
  .then(() => {
    console.log("Database Connected");
    app
      .listen(7777, () => {
        console.log("Server is Listening at Port 7777");
      })
      .on("error", (error) => {
        console.error("Server error:", error);
        process.exit(1);
      });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
    process.exit(1);
  });
