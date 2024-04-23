import express from "express";
import fs from "fs";
import path from "path";
import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "../src/App";
import loginRoute from "./controllers/user.controller";
import taskRoute from "./controllers/task.controller"
const bodyParser = require('body-parser');
const cors = require('cors');
const {db}=require("../config/db")


// Enable CORS for all routes

let app = express();
app.use(bodyParser.json());

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/auth", loginRoute);
app.use("/api", taskRoute);
app.use("^/$", (req, res, next) => {
    fs.readFile(path.resolve("./build/index.html"), "utf-8", (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Some error happened");
      }
      return res.send(
        data.replace(
          '<div id="root"></div>',
          `<div id="root">${ReactDOMServer.renderToString(<App />)}</div>`
        )
      );
    });
  });
  
  app.use(express.static(path.resolve(__dirname, '..', 'build')))
  
  app.listen(8000,async () => {
    await db
    console.log(`App launched on ${8000}`);
  });