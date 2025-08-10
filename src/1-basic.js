const express = require("express");
const PORT = 3000;

const app = express();

// Middleware to parse JSON body
app.use(express.json());

// Individual REST APIS

app.get("/test", (req, res) => {
  res.send("GET Request");
});

app.post("/test", (req, res) => {
  res.send("POST Request");
});

app.put("/test", (req, res) => {
  res.send("PUT Request");
});

app.delete("/test", (req, res) => {
  res.send("DELETE Request");
});

// Testing the Request Body, Request Params & Query Params
// The Fallback Route should always be at last initially all the params should come on top
// Because this is sequence wise
app.get("/posts/:id/:value", (req, res) => {
  const { id, value } = req.params;
  res.send(`Sending POST of Id: ${id}-${value}`);
});

// Dynamic URL
app.get(`/^\/a\+bc$/`, (req, res) => {
  const path = req.path;
  res.send(`URL => ${path}`);
});

app.get("/ab*c", (req, res) => {
  const path = req.path;
  res.send(`URL => ${path}`);
  // abc, abbbc, ac
});

app.get("/posts", (req, res) => {
  const { query } = req.query;
  if (query) {
    res.send(`Sending all POSTS with the Query ${query}`);
  } else {
    res.send("Sending all POSTS");
  }
});

app.post("/posts", (req, res) => {
  const body = req.body;
  console.log(body);
  res.send(`Sending Request Body ${JSON.stringify(body)}`);
});

// This will work for all route handlers
// GET, POST, PUT, DELETE
app.use("/", (req, res) => {
  res.send("Hello People");
});

app.listen(PORT, () => {
  console.log("Server Listening on PORT ", PORT);
});
