const express = require("express");
const path = require("path");
const alumnosRutas = require("./rutas/alumnosRutas");
const reportesRutas = require("./rutas/reportesRutas");


const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "../../frontend"))); //se fija si la URL coincide con un archivo
app.use("/api/alumnos", alumnosRutas);
app.use("/api/reportes", reportesRutas);


module.exports = app;

