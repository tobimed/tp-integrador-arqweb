const express = require("express");
const alumnosRutas = require("./rutas/alumnosRutas");
const app = express();

app.use(express.json());
app.use("/api/alumnos", alumnosRutas);

module.exports = app;

