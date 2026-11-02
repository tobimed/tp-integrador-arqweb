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
  res.status(201).json({ mensaje: "El alumno fue guardado", alumno: nuevoAlumno });
 
});

app.put("/api/alumnos/:dni", (req, res) => {
  const dni = req.params.dni;
  const {dni: dniNuevo, nombre, apellido, email} = req.body;
  if(!dniNuevo || !nombre || !apellido || !email){
    return res.status(400).json({mensaje: `mala solicitud, malos datos`});
  }

  if (dniNuevo !== dni) {
    return res.status(400).json({ mensaje: "El DNI del body no coincide con el de la URL" });
  }

  if(!repo.existeDni){
    return res.status(409).json({mensaje: `El alumno no existe con el DNI: ${dni}`});
  }
  const alumnoMod = repo.guardarAlumno({dni, nombre, apellido, email});
  res.status(200).json({ mensaje: "El alumno fue modificado", alumno: alumnoMod });

});

app.delete("/api/alumnos/:dni", (req, res) => {
  const dni = req.params.dni;
  const alumnoE = repo.eliminarAlumno(dni);

  if(!alumnoE){
    return res.status(404).json({ mensaje: "El alumno no existe", alumno: dni});
  }

  res.status(204).end();

});

module.exports = app;

