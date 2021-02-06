const express = require("express");
const pdf = require("html-pdf");
const pdfTemplate = require("../documents");
const path = require("path");

// import all controllers
// import SessionController from './app/controllers/SessionController';

const routes = express.Router();
const targetPath = path.join(__dirname, "../");

// Add routes
routes.post("/", (req, res) => {
  console.log(req.body);
  pdf.create(pdfTemplate(req.body), {}).toFile("result.pdf", (err) => {
    if (err) {
      res.send(Promise.reject());
    }
    res.send(Promise.resolve());
  });
});
routes.get("/", (req, res) => {
  res.sendFile(`${targetPath}/result.pdf`);
});
routes.put("/");
routes.delete("/");

module.exports = routes;
