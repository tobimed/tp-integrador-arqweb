const express = require("express");
const path = require("path");
const alumnosRutas = require("./rutas/alumnosRutas");


const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "../../frontend"))); //middleware se fija si la URL coincide con un archivo
app.use("/api/alumnos", alumnosRutas);


module.exports = app;

