const express = require("express");
const authMiddleWare = require("./middleware/auth");
const userMiddleWare = require("./middleware/user");

const app = express();

// Middleware to parse JSON body
app.use(express.json());

// Goes inside this middleware and check auth if authenticated then below routes will be executed
app.use("/admin", authMiddleWare);

// I can multiple different middlewares
app.use("/user", userMiddleWare);

// Admin Routes
app.post("/admin/dashboard", (req, res) => {
  res.send("Sending Dashboard Details");
});

// Since this url has some error this will throw error in api but we have globally handled this error
app.post("/admin/getUserCount", (req, res) => {
  throw new Error("Error Occured While Fetching Data");
  res.send("Sending Dashboard Details");
});

app.post("/admin", (req, res) => {
  res.send("Sending Admin Details");
});

// User Routes
app.post("/user", (req, res) => {
  res.send("Sending User Info");
});

// Global Handle of error if anything goes error
// Make Sure this is placed at last
app.use("/", (err, req, res, next) => {
  if (err) res.status(500).send("Something Went Wrong :(");
});

app.listen("7777", () => {
  console.log("Server is Listening at Port 7777");
});
