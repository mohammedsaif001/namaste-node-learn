const express = require("express");
const connectDB = require("./config/db");
const User = require("./5-user-schema");

const app = express();

// Middleware to parse JSON body
app.use(express.json());

app.post("/signUp", async (req, res) => {
  const newObj = {
    firstName: "Mohammed",
    lastName: "Saif",
    emailId: "msaif@basofa.com",
    password: "123456",
  };

  // Create a new instance of the User model
  const user = new User(newObj);
  try {
    const response = await user.save(newObj);
    res.send("Object Saved Successfully");
  } catch (error) {
    res.status(400).send("Error Saving the user", error.message);
  }
});

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
