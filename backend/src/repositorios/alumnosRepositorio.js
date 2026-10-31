const alumnosSeed = require("../data/seed");
const alumnos = new Map();


function cargarSeed() {
  alumnos.clear();
  for (const alumno of alumnosSeed) {
    alumnos.set(alumno.dni, { ...alumno });
  }
}

function obtenerTodos() {
  return Array.from(alumnos.values());
}

function devolverAlumno(dni) {
    return alumnos.get(dni);
}

cargarSeed();
module.exports = { obtenerTodos, devolverAlumno};

