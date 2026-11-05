/*
 * Este script maneja el alta, baja y modificación de alumnos consumiendo la API REST
 * del backend con fetch. Al abrir la página se registran los eventos y se carga la
 * tabla con GET /api/alumnos; cada fila tiene un botón Editar y uno Eliminar que
 * recuerdan el alumno de su fila. El formulario se usa para dar de alta y para
 * modificar: la variable dniEditando indica el modo. Si vale null, Guardar hace un
 * POST a /api/alumnos; si tiene un DNI, los campos se cargan con los datos de ese
 * alumno, el DNI queda bloqueado por ser su identificador, y Guardar hace un PUT a
 * /api/alumnos/:dni. El botón Eliminar pide confirmación y hace un DELETE. Los
 * mensajes de éxito y error los define el backend y se muestran en la página; si el
 * servidor no responde, se muestra un mensaje propio y el detalle queda en la
 * consola. Los datos se insertan con textContent y no con innerHTML para evitar XSS.
 */

const tablaAlumnos = document.getElementById("tabla-alumnos"); // <tbody> donde se cargan las filas
const mensaje = document.getElementById("mensaje"); // <p> para mostrar errores
const formAlumno = document.getElementById("form-alumno"); // el <form>
const mensajeForm = document.getElementById("mensaje-form"); // <p> para el resultado del alta
const tituloForm = document.getElementById("titulo-form"); // <h2> del formulario: cambia según el modo
const botonCancelar = document.getElementById("cancelar-edicion"); // botón oculto del paso 1
let dniEditando = null; // null = modo alta; con un DNI = editando ese alumno

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
      const celdaAcciones = document.createElement("td"); // celda para los botones (como)
      const botonEditar = document.createElement("button");
      botonEditar.textContent = "Editar";
      botonEditar.addEventListener("click", () => editarAlumno(alumno));
      celdaAcciones.appendChild(botonEditar);
      const botonEliminar = document.createElement("button"); // crea un <button>
      botonEliminar.textContent = "Eliminar";
      botonEliminar.addEventListener("click", () => eliminarAlumno(alumno.dni)); // al clickear, elimina ESTE alumno
      celdaAcciones.appendChild(botonEliminar);
      fila.appendChild(celdaAcciones);
      tablaAlumnos.appendChild(fila); // recién acá la fila aparece en pantalla
    }
  } catch (error) { // fetch falla si no hay respuesta: servidor caído o sin conexión
    mensaje.textContent = "No se pudo conectar con el servidor";
  }
}

formAlumno.addEventListener("submit", async (evento) => { // se ejecuta al apretar "Guardar"
  evento.preventDefault(); // evita que el navegador recargue la página

  const alumno = { // arma el objeto con lo que escribió el usuario
    dni: document.getElementById("dni").value,
    nombre: document.getElementById("nombre").value,
    apellido: document.getElementById("apellido").value,
    email: document.getElementById("email").value,
  };

  try {
    const url = dniEditando ? `/api/alumnos/${dniEditando}` : "/api/alumnos"; // PUT lleva el DNI en la URL
    const metodo = dniEditando ? "PUT" : "POST"; // editando → PUT; si no → POST
    const respuesta = await fetch(url, {
      method: metodo,
      headers: { "Content-Type": "application/json" }, // avisa que el body es JSON
      body: JSON.stringify(alumno), // convierte el objeto a texto JSON
    });

    const datos = await respuesta.json(); // la API responde { mensaje, ... }
    mensajeForm.textContent = datos.mensaje; // muestra el mensaje de la API (éxito, 400 o 409)

    if (respuesta.ok) { // solo si se guardó
      salirEdicion();
      cargarAlumnos(); // recarga la tabla
    }
  } catch (error) {
    mensajeForm.textContent = "No se pudo conectar con el servidor";
  }
});

async function eliminarAlumno(dni) {
  if (!confirm(`¿Eliminar al alumno con DNI ${dni}?`)) { // ventana de confirmación del navegador
    return; // si apretó "Cancelar", no hace nada
  }

  try {
    const respuesta = await fetch(`/api/alumnos/${dni}`, { method: "DELETE" }); // el DNI va en la URL

    if (respuesta.status === 204) { // se eliminó: el 204 no tiene body, así que no se lee con .json()
      mensaje.textContent = `Alumno ${dni} eliminado`;
      cargarAlumnos(); // recarga la tabla sin ese alumno
      return;
    }

    const datos = await respuesta.json(); // 404: tu API manda { mensaje }
    mensaje.textContent = datos.mensaje;
  } catch (error) {
    console.error(error);
    mensaje.textContent = "No se pudo conectar con el servidor";
  }
}

function editarAlumno(alumno){
  dniEditando = alumno.dni;
  document.getElementById("dni").value = alumno.dni;
  document.getElementById("nombre").value = alumno.nombre;
  document.getElementById("apellido").value = alumno.apellido;
  document.getElementById("email").value = alumno.email;
  document.getElementById("dni").readOnly = true; // el DNI no se puede cambiar (el backend daría 400)
  tituloForm.textContent = `Editar alumno ${alumno.dni}`;
  botonCancelar.hidden = false;
  mensajeForm.textContent = ""; // borra mensajes viejos
}

function salirEdicion(){
  dniEditando = null;
  formAlumno.reset();
  document.getElementById("dni").readOnly = false; //puedo vovler a escribir dni
  tituloForm.textContent = "Nuevo Alumno";
  botonCancelar.hidden = true;
}
botonCancelar.addEventListener("click", salirEdicion); // al apretar "Cancelar edición"botonCancelar.addEventListener("click", salirDeEdicion); // al apretar "Cancelar edición"

cargarAlumnos(); // se ejecuta al abrir la página