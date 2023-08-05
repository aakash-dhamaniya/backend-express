const fs = require("fs");
const express = require("express");
const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
const index = fs.readFileSync("index.html", "utf-8");
const product = data.products;

const server = express();

//middle where
//app level
server.use((req, res, next) => {
  console.log(req.method, req.ip, req.hostname);
  next();
});
//route level
const auth = (req, res, next) => {
  console.log(req.query);
  if (req.query.password === "123") {
    next();
  } else {
    res.sendStatus(401);
  }
};
server.use(auth);
//api ,endpoint,Route
server.post("/", (req, res) => {
  res.json({ type: "post" });
});
server.put("/", (req, res) => {
  res.json({ type: "PUT" });
});
server.patch("/", (req, res) => {
  res.json({ type: "PATCH" });
});
server.delete("/", (req, res) => {
  res.json({ type: "POSt" });
});
server.get("/", (req, res) => {
  res.json({ type: "GET" });
});
// server.get("/demo", (req, res) => {
//   // res.send("<h1>hello</h1>");
//   // res.sendFile()
//   // res.sendStatus(404);
//   res.json(product);
// });
server.listen(8080, () => {
  console.log("server started");
});
