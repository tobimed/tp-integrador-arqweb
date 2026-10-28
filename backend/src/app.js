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
  res.status(200).json(Array.from(alumnos.values())); //entender
};

app.get("/api/alumnos", obtenerTodos);

app.get("/api/alumnos/:dni", (req, res) => {
  res.status(200).json([]);
});

app.post("/api/alumnos", (req, res) => {
  res.status(200).json([]);
});

app.put("/api/alumnos/:dni", (req, res) => {
  res.status(200).json([]);
});

app.delete("/api/alumnos/:dni", (req, res) => {
  res.status(200).json([]);
});


cargarSeed();
module.exports = app;

