const repo = require("../repositorios/alumnosRepositorio");

function resumenAlumnos(req, res) {
  const alumnos = repo.obtenerTodos(); // array con todos los alumnos
  const dominios = {}; // acá se cuenta cuántos hay de cada dominio

  for (const alumno of alumnos) {
    const dominio = alumno.email.split("@")[1].toLowerCase(); // "ana@Gmail.com" → "gmail.com"
    dominios[dominio] = (dominios[dominio] || 0) + 1; // si no existía arranca en 0, y suma 1
  }

  res.status(200).json({ total: alumnos.length, dominios });
}

module.exports = {resumenAlumnos};