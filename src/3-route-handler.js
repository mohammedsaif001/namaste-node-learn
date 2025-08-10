const express = require("express");

const app = express();

// 1. The Route can have multiple route handlers
// next function will pass the requiest to next handler so that the next handler is executed
app.use(
  "/",
  (req, res, next) => {
    console.log("Req Handler 1");
    next();
  },
  (req, res, next) => {
    console.log("Req Handler 2");
    next();
  },
  (req, res) => {
    console.log("Req Handler 3");
    res.send("Recieved at Handler 3"); // This will be sent with all the consoles
  }
);

// 2. If I directly send the response from 1st handler it will not trigeer the other 2
app.use(
  "/",
  (req, res, next) => {
    console.log("Req Handler 1");
    res.send("Recieved at Handler 1"); // This will be sent with only 1st console
  },
  (req, res, next) => {
    console.log("Req Handler 2");
    next();
  },
  (req, res) => {
    console.log("Req Handler 3");
    res.send("Recieved at Handler 3");
  }
);

// 3. If I Have both res.send and next after then only it will throw error saying cannot set headers after they are sent but the api will trigger the res.send
app.use(
  "/",
  (req, res, next) => {
    console.log("Req Handler 1");
    res.send("Recieved at Handler 1"); // This will be sent with only 1st console
    next();
  },
  (req, res, next) => {
    console.log("Req Handler 2");
    next();
  },
  (req, res) => {
    console.log("Req Handler 3");
    res.send("Recieved at Handler 3");
  }
);

// 4. If I Have both res.send and next after then only it will throw error saying cannot set headers after they are sent but the api will trigger the res.send
app.use(
  "/",
  (req, res, next) => {
    console.log("Req Handler 1");
    next();
    res.send("Recieved at Handler 1"); // This will be skipped as the next handler called above
  },
  (req, res, next) => {
    console.log("Req Handler 2");
    next();
  },
  (req, res) => {
    console.log("Req Handler 3");
    res.send("Recieved at Handler 3"); // This will be sent with all consoles
  }
);

// 5. If Skip the next() and not returning in the res within that than my app will go on infinite loop as the response is not sending anything , it will print consile 1,2
app.use(
  "/",
  (req, res, next) => {
    console.log("Req Handler 1");
    next();
  },
  (req, res, next) => {
    console.log("Req Handler 2");
    // next();
  },
  (req, res) => {
    console.log("Req Handler 3");
    res.send("Recieved at Handler 3");
  }
);

// 6. If next() is present all but to res.send then it will throw error coz no res is sent at all, but prints all consoles
app.use(
  "/",
  (req, res, next) => {
    console.log("Req Handler 1");
    next();
  },
  (req, res, next) => {
    console.log("Req Handler 2");
    next();
  },
  (req, res, next) => {
    console.log("Req Handler 3");
    next();
  }
);

// 7. If next() is not present at last to res.send then it will go infinite loop, but prints all consoles
app.use(
  "/",
  (req, res, next) => {
    console.log("Req Handler 1");
    next();
  },
  (req, res, next) => {
    console.log("Req Handler 2");
    next();
  },
  (req, res, next) => {
    console.log("Req Handler 3");
    // next();
  }
);

app.listen("7777", () => {
  console.log("Server is Listening at Port 7777");
});
