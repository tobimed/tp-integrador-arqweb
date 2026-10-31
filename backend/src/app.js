const express = require("express");
const repo = require("./repositorios/alumnosRepositorio");
const app = express();

app.use(express.json());

app.get("/api/alumnos", (req, res)=> {
  res.status(200).json(repo.obtenerTodos())
});

app.get("/api/alumnos/:dni", (req, res) => {
  const dni = req.params.dni;
  res.status(200).json(repo.devolverAlumno(dni))
});

app.post("/api/alumnos", (req, res) => {
 
});

app.put("/api/alumnos/:dni", (req, res) => {
  
});

app.delete("/api/alumnos/:dni", (req, res) => {
  
});

module.exports = app;

