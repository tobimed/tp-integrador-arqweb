const express = require("express");
const repo = require("./repositorios/alumnosRepositorio");
const app = express();

app.use(express.json());

app.get("/api/alumnos", (req, res)=> {
  res.status(200).json(repo.obtenerTodos())
});

app.get("/api/alumnos/:dni", (req, res) => {
  const dni = req.params.dni;
  const alumnoDni = repo.devolverAlumno(dni);

  if(!alumnoDni){
    return res.status(404).json({mensaje: `no existe el alumno solicitado con este DNI: ${dni}`});
  }
  res.status(200).json(alumnoDni);
});

app.post("/api/alumnos", (req, res) => {
  const {dni, nombre, apellido, email} = req.body;
  if(!dni || !nombre || !apellido || !email){
    return res.status(400).json({mensaje: `mala solicitud, faltan datos`});
  }
  if(repo.existeDni(dni)){
    return res.status(409).json({mensaje: `El alumno ya existe con el DNI: ${dni}`});
  }
  
  const nuevoAlumno = repo.guardarAlumno({dni, nombre, apellido, email});
  res.status(201).json(nuevoAlumno, {mensaje: `El alumno fue guardado`});
 
});

app.put("/api/alumnos/:dni", (req, res) => {
  
});

app.delete("/api/alumnos/:dni", (req, res) => {
  
});

module.exports = app;

