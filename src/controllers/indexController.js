const fs = require("fs");
const path = require("path");
const baseController = require("./baseController");

const modelsPath = path.join(__dirname, "../models");
const controllers = {};

fs.readdirSync(modelsPath).forEach((file) => {
  if (file.endsWith(".js")) {
    const modelName = file.replace(".js", "");
    //console.log("Controladores cargados:", controllers);

    const Model = require(`../models/${modelName}`);
    controllers[modelName] = baseController(Model);
  }
});

module.exports = controllers;
