const express = require("express");
const alumnosRutas = require("./rutas/alumnosRutas");
const path = require("path");

const app = express();

app.use(express.json());
app.use("/api/alumnos", alumnosRutas);
app.use(express.static(path.join(__dirname, "../../frontend"))); //middleware se fija si la URL coincide con un archivo

module.exports = app;

