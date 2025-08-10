const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Middleware to parse JSON body
app.use(express.json());

app.post("/signup", (req, res) => {});

// Connect to MongoDB then start server
connectDB()
  .then(() => {
    console.log("Database Connected");
    app.listen(7777, () => {
      console.log("Server is Listening at Port 7777");
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });
