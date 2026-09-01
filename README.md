# Trabajo Práctico Integrador

Repositorio correspondiente al Trabajo Práctico Integrador de la materia.

En este repositorio se desarrollará el servidor y los demás componentes solicitados durante la cursada.

El backend consiste en una API para la gestión de alumnos. Su objetivo es permitir registrar, consultar, modificar y eliminar información de alumnos mediante solicitudes HTTP.

Campos de alumno:
dni (string), identificador del alumno.
nombre (string), nombre del alumno.
apellido (string), apellido del alumno.
email (string), email del alumno.

Endpoints:

GET /alumnos
Este endpoint va a servir para obtenerr la lista de alumnos registrados.

Status codes:
200 OK: La lista de alumnos se obtiene correctamente.
500 Internal Server Error: Se produce un error interno al intentar obtener la lista de alumnos.

GET /alumnos/:dni
Obtener un alumno especifico a partir de su dni.

Status codes:
200 OK: El alumno se encuentra y sus datos se devuelven correctamente.
404 Not Found: No existe un alumno registrado con el DNI indicado.

POST /alumnos
Registra un nuevo alumno al sistema.

Body esperado:
{
  "dni": "94155718",
  "nombre": "Tobias",
  "apellido": "Medlam",
  "email": "TOTOM@email.com"
}

Campos requeridos:
- dni
- nombre
- apellido
- email

Status codes:
201 Created: El alumno se registra correctamente.
400 Bad Request: Los datos enviados no cumplen con el formato esperado.
409 Conflict: Ya existe un alumno registrado con el DNI indicado.

PUT /alumnos/:dni 
Modifica los datos de un alumno especifico a partir de su dni.

Body esperado:
{
  "dni": "94155718",
  "nombre": "Tobias",
  "apellido": "Medlam",
  "email": "TOTOM@email.com"
}

Campos requeridos:
- dni
- nombre
- apellido
- email

Status codes:
200 OK: Los datos del alumno se modifican correctamente.
400 Bad Request: Los datos enviados no cumplen con el formato esperado.
404 Not Found: No existe un alumno registrado con el DNI indicado.

DELETE /alumnos/:dni 
Elimina un alumno especifico a partir de su dni.

Status codes:
204 No Content: El alumno se elimina correctamente.
404 Not Found: No existe un alumno registrado con el DNI indicado.
