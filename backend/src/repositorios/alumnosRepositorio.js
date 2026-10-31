const alumnosSeed = require("../data/seed");
const alumnos = new Map();


function cargarSeed() {
  alumnos.clear();
  for (const alumno of alumnosSeed) { //recorro array 
    alumnos.set(alumno.dni, { ...alumno }); //voy agregando
  }
}

function obtenerTodos() {
  return Array.from(alumnos.values());
}

function devolverAlumno(dni) {
    return alumnos.get(dni);
}

function existeDni(dni){
  return alumnos.has(dni);

}

function guardarAlumno(alumno){
  alumnos.set(alumno.dni, { ...alumno }); //agrego al array
  return alumno;
}

cargarSeed();
module.exports = { obtenerTodos, devolverAlumno, existeDni, guardarAlumno};

