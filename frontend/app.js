const tablaAlumnos = document.getElementById("tabla-alumnos"); // <tbody> donde se cargan las filas
const mensaje = document.getElementById("mensaje"); // <p> para mostrar errores

function crearCelda(texto) {
  const celda = document.createElement("td");
  celda.textContent = texto; // textContent y no innerHTML: evita ataques XSS
  return celda;
}

async function cargarAlumnos() { // async para poder usar await adentro
  try {
    const respuesta = await fetch("/api/alumnos"); // GET a la API, espera la respuesta

    if (!respuesta.ok) { // ok = status entre 200 y 299
      mensaje.textContent = "No se pudo obtener la lista de alumnos";
      return;
    }

    const alumnos = await respuesta.json(); // convierte el JSON del body en un array

    tablaAlumnos.innerHTML = ""; // vacía la tabla antes de llenarla
    for (const alumno of alumnos) {
      const fila = document.createElement("tr");
      fila.appendChild(crearCelda(alumno.dni));
      fila.appendChild(crearCelda(alumno.nombre));
      fila.appendChild(crearCelda(alumno.apellido));
      fila.appendChild(crearCelda(alumno.email));
      tablaAlumnos.appendChild(fila); // recién acá la fila aparece en pantalla
    }
  } catch (error) { // fetch falla si no hay respuesta: servidor caído o sin conexión
    mensaje.textContent = "No se pudo conectar con el servidor";
  }
}

cargarAlumnos(); // se ejecuta al abrir la página