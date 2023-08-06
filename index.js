const fs = require("fs");
const express = require("express");
const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
const index = fs.readFileSync("index.html", "utf-8");
const products = data.products;
const server = express();
server.use(express.json());
//middle where
//app level

//route level

//api ,endpoint,Route
// Products
//read get /products
server.get("/products", (req, res) => {
  res.json(products);
});
//get single item
server.get("/products/:id", (req, res) => {
  const id = +req.params.id;
  console.log(id);
  const product = products.find((p) => p.id === id);
  console.log();
  res.json(product);
});
//create api
server.post("/products", (req, res) => {
  console.log(req.body);
  products.push(req.body);
  res.status(201).json(req.body);
});
server.put("/products/:id", (req, res) => {
  const id = +req.params.id;
  const index = products.findIndex((p) => p.id === id);
  products.splice(index, 1, { ...req.body, id: id });
  res.status(201).json(req.body);
});
server.patch("/products/:id", (req, res) => {
  const id = +req.params.id;
  const index = products.findIndex((p) => p.id === id);
  const product = products[index];
  products.splice(index, 1, { ...product, ...req.body });
  res.status(201).json(req.body);
});
//delete api
server.delete("/products/:id", (req, res) => {
  const id = +req.params.id;
  const index = products.findIndex((p) => p.id === id);
  const product = products[index];
  products.splice(index, 1);
  res.status(201).json(product);
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
