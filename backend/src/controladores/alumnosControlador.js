const repo = require("../repositorios/alumnosRepositorio");

function listar(req, res) {
  res.status(200).json(repo.obtenerTodos());
}

function obtener(req, res) {
  const dni = req.params.dni;
  const alumnoDni = repo.devolverAlumno(dni);

  if(!alumnoDni){
    return res.status(404).json({mensaje: `no existe el alumno solicitado con este DNI: ${dni}`});
  }
  res.status(200).json(alumnoDni);
};

function crear(req, res) {
  const {dni, nombre, apellido, email} = req.body;
  if(!dni || !nombre || !apellido || !email){
    return res.status(400).json({mensaje: `mala solicitud, faltan datos`});
  }
  if(repo.existeDni(dni)){
    return res.status(409).json({mensaje: `El alumno ya existe con el DNI: ${dni}`});
  }
  
  const nuevoAlumno = repo.guardarAlumno({dni, nombre, apellido, email});
  res.status(201).json({ mensaje: "El alumno fue guardado", alumno: nuevoAlumno });
 
};

function modificar(req, res) {
  const dni = req.params.dni;
  const {dni: dniNuevo, nombre, apellido, email} = req.body;
  if(!dniNuevo || !nombre || !apellido || !email){
    return res.status(400).json({mensaje: `mala solicitud, malos datos`});
  }

  if (dniNuevo !== dni) {
    return res.status(400).json({ mensaje: "El DNI no puede ser modificado" });
  }

  if(!repo.existeDni(dni)){
    return res.status(404).json({mensaje: `El alumno no existe con el DNI: ${dni}`});
  }
  const alumnoMod = repo.guardarAlumno({dni, nombre, apellido, email});
  res.status(200).json({ mensaje: "El alumno fue modificado", alumno: alumnoMod });

};

function eliminar(req, res) {
  const dni = req.params.dni;
  const alumnoE = repo.eliminarAlumno(dni);

  if(!alumnoE){
    return res.status(404).json({ mensaje: `No existe un alumno con el DNI: ${dni}`});
  }

  res.status(204).end();

};


module.exports = { listar, obtener, crear, modificar, eliminar};