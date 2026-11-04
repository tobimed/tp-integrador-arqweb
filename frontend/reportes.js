/*
 * reporte.js
 * Script de la página reporte.html.
 * Pide al backend el reporte de alumnos (GET /api/reportes/alumnos)
 * y muestra el total de alumnos y una tabla con la cantidad por dominio de email.
 * Respuesta esperada de la API: { total: 5, dominios: { "gmail.com": 3, "hotmail.com": 1, ... } }
 */

// Referencias a elementos del HTML (se buscan una sola vez, al cargar la página)
const total = document.getElementById("total"); // <strong> donde se muestra el total de alumnos
const tablaDominios = document.getElementById("tabla-dominios"); // <tbody> donde se cargan las filas
const mensaje = document.getElementById("mensaje"); // <p> para mostrar errores al usuario

// Pide el reporte a la API y lo muestra en la página.
// Es async porque espera la respuesta del servidor con await.
async function cargarReporte() {
  try { // si algo falla adentro, salta al catch
    const respuesta = await fetch("/api/reportes/alumnos"); // GET al endpoint del reporte; espera la respuesta

    if (!respuesta.ok) { // ok = status entre 200 y 299; si no, la API respondió con un error
      mensaje.textContent = "No se pudo obtener el reporte"; // avisa al usuario
      return; // corta la función: no hay datos para mostrar
    }

    const reporte = await respuesta.json(); // convierte el JSON del body en un objeto: { total, dominios }

    total.textContent = reporte.total; // escribe el total en el <strong>

    tablaDominios.innerHTML = ""; // vacía la tabla antes de llenarla (es seguro: no inserta datos)

    // Object.entries convierte { "gmail.com": 3 } en [["gmail.com", 3]] para poder recorrerlo con for...of.
    // [dominio, cantidad] desarma cada par en dos variables (desestructuración de arrays).
    for (const [dominio, cantidad] of Object.entries(reporte.dominios)) {
      const fila = document.createElement("tr"); // crea una fila nueva (todavía no está en la página)

      const celdaDominio = document.createElement("td"); // celda para el dominio
      celdaDominio.textContent = dominio; // textContent y no innerHTML: evita ataques XSS
      fila.appendChild(celdaDominio); // agrega la celda a la fila

      const celdaCantidad = document.createElement("td"); // celda para la cantidad
      celdaCantidad.textContent = cantidad; // cuántos alumnos tienen ese dominio
      fila.appendChild(celdaCantidad); // agrega la celda a la fila

      tablaDominios.appendChild(fila); // mete la fila en el <tbody>: recién acá aparece en pantalla
    }
  } catch (error) { // fetch falla si no hay respuesta (servidor caído), o hubo un error en el código
    console.error(error); // muestra el error real en la consola del navegador (F12) para depurar
    mensaje.textContent = "No se pudo conectar con el servidor"; // mensaje simple para el usuario
  }
}

cargarReporte(); // se ejecuta apenas se carga el script, o sea, al abrir reporte.html