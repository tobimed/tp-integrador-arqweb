const express = require("express");

const app = express();

app.use(express.json());

const alumnosSeed = require("./seed");
const alumnos = new Map();

function cargarSeed() {
  alumnos.clear();
  for (const alumno of alumnosSeed) {
    alumnos.set(alumno.dni, { ...alumno });
  }
}

const obtenerTodos= (req, res) => {
  return Array.from(alumnos.values());
};

app.get("/alumnos", obtenerTodos);

app.get("/alumnos/:dni", (req, res) => {
  res.status(200).json([]);
});

app.post("/alumnos", (req, res) => {
  res.status(200).json([]);
});

app.put("/alumnos/:dni", (req, res) => {
  res.status(200).json([]);
});

app.delete("/alumnos/:dni", (req, res) => {
  res.status(200).json([]);
});


cargarSeed();
module.exports = app;

