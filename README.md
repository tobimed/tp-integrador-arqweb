# Trabajo Práctico Integrador Arquitectura Web

Repositorio correspondiente al Trabajo Práctico Integrador de la materia.

En este repositorio se desarrollará el servidor y los demás componentes solicitados durante la cursada.

El backend consiste en una API para la gestión de alumnos. Su objetivo es permitir registrar, consultar, modificar y eliminar información de alumnos mediante solicitudes HTTP.

## Tecnologías utilizadas

  - Node.js y Express 5 (backend)
  - HTML, CSS y JavaScript.
  - Postman (testin de endpoints)

## Requisitos

  - [Node.js](https://nodejs.org/) versión 18 o superior (incluye npm)
  - [Postman](https://www.postman.com/downloads/), para correr los tests

## Instalación

1) Descomprimir el proyecto o clonarlo con "git clone https://github.com/tobimed/tp-integrador-arqweb.git".

2) Entrar a la carpeta del backend e instalar las dependencias  en la bash:
```bash
cd backend
npm install
```
## Ejecución
Desde la carpeta "backend":
```bash
npm start
```

El servidor queda escuchando en **http://localhost:3000**. El mismo servidor entrega el frontend y la API:

| Dirección | Qué muestra |
|---|---|
| http://localhost:3000 | Página de gestión de alumnos (listado, alta, modificación y baja) |
| http://localhost:3000/reporte.html | Reporte de alumnos |
| http://localhost:3000/api/alumnos | API (responde JSON) |

### Scripts disponibles

| Comando | Qué hace |
|---|---|
| `npm start` | Inicia el servidor |
| `npm run dev` | Inicia el servidor y lo reinicia automáticamente al guardar cambios (modo desarrollo) |

El puerto se puede cambiar con la variable de entorno `PORT`.

## Datos iniciales (seed)

Al iniciar, el servidor carga automáticamente 5 alumnos de ejemplo desde `backend/src/data/seed.js`. Los datos se guardan **en memoria**: las altas, bajas y modificaciones se mantienen mientras el servidor está corriendo, y al reiniciarlo se vuelve a los datos iniciales.

## Estructura del proyecto

```
├── backend/
│   ├── server.js                  # Punto de entrada: levanta el servidor
│   └── src/
│       ├── app.js                 # Configura Express: middlewares, frontend y rutas
│       ├── rutas/                 # Asocian cada verbo y URL con una función del controlador
│       ├── controladores/         # Lógica de cada endpoint: validan y eligen el status code
│       ├── repositorios/          # Acceso a los datos (Map en memoria)
│       └── data/seed.js           # Datos iniciales
├── frontend/
│   ├── index.html / app.js        # ABM de alumnos
│   ├── reporte.html / reportes.js # Reporte de alumnos
│   └── styles.css
└── tests/
    └── TP-ArquitecturaWeb.postman_collection.json
```

Cada request sigue el recorrido **ruta → controlador → repositorio**. Así, si se cambiara la persistencia en memoria por una base de datos, solo habría que modificar el repositorio.

## Tests

La carpeta `tests/` tiene una colección de Postman con 12 requests: una por cada status code que puede devolver la API.

1. En Postman: **Import** y elegir el archivo `tests/TP-ArquitecturaWeb.postman_collection.json`.
2. Iniciar el servidor (o reiniciarlo, para partir de los datos iniciales).
3. Clic derecho en la colección → **Run** → **Run TP-ArquitecturaWeb**.

Las requests se ejecutan en orden y dependen entre sí (por ejemplo, el alta del alumno con DNI 8 se usa después para modificarlo y eliminarlo), por eso hay que correrlas con el servidor recién iniciado. El status esperado de cada una figura al final de su nombre.


## Documentación de la API

**URL base:** `http://localhost:3000/api`

Todas las requests y respuestas usan **JSON**. Para enviar un body hay que incluir el header `Content-Type: application/json`.

### Recurso: alumno

| Campo | Tipo | Descripción |
|---|---|---|
| `dni` | string | Identificador del alumno. No se puede modificar. |
| `nombre` | string | Nombre del alumno |
| `apellido` | string | Apellido del alumno |
| `email` | string | Email del alumno |

### Formato de los errores

Los errores responden con un objeto con un mensaje:

```json
{ "mensaje": "no existe el alumno solicitado con este DNI: 11111111" }
```

Cualquier endpoint puede responder **500 Internal Server Error** si ocurre un error inesperado en el servidor.

### Resumen de endpoints

| Método | Ruta | Descripción | Status codes |
|---|---|---|---|
| GET | `/api/alumnos` | Lista todos los alumnos | 200 |
| GET | `/api/alumnos/:dni` | Obtiene un alumno por DNI | 200, 404 |
| POST | `/api/alumnos` | Registra un alumno | 201, 400, 409 |
| PUT | `/api/alumnos/:dni` | Modifica un alumno | 200, 400, 404 |
| DELETE | `/api/alumnos/:dni` | Elimina un alumno | 204, 404 |
| GET | `/api/reportes/alumnos` | Reporte: total de alumnos y cantidad por dominio de email | 200 |

---

### GET /api/alumnos

Devuelve la lista de alumnos registrados.

**Status codes:**
- `200 OK`: la lista se obtiene correctamente (puede estar vacía).

**Respuesta (200):**

```json
[
  { "dni": "40123456", "nombre": "Lucía", "apellido": "Fernández", "email": "lucia.fernandez@gmail.com" },
  { "dni": "41234567", "nombre": "Martín", "apellido": "Gómez", "email": "martin.gomez@hotmail.com" }
]
```

---

### GET /api/alumnos/:dni

Devuelve un alumno a partir de su DNI.

**Status codes:**
- `200 OK`: el alumno existe y se devuelven sus datos.
- `404 Not Found`: no existe un alumno con ese DNI.

**Respuesta (200):**

```json
{ "dni": "40123456", "nombre": "Lucía", "apellido": "Fernández", "email": "lucia.fernandez@gmail.com" }
```

---

### POST /api/alumnos

Registra un nuevo alumno.

**Body:**

```json
{ "dni": "45000000", "nombre": "Ana", "apellido": "Ruiz", "email": "ana@mail.com" }
```

Los cuatro campos son obligatorios.

**Status codes:**
- `201 Created`: el alumno se registra correctamente.
- `400 Bad Request`: falta alguno de los campos obligatorios.
- `409 Conflict`: ya existe un alumno con ese DNI.

**Respuesta (201):**

```json
{
  "mensaje": "El alumno fue guardado",
  "alumno": { "dni": "45000000", "nombre": "Ana", "apellido": "Ruiz", "email": "ana@mail.com" }
}
```

---

### PUT /api/alumnos/:dni

Modifica los datos de un alumno. Reemplaza el alumno completo, por lo que hay que enviar los cuatro campos.

**Body:**

```json
{ "dni": "45000000", "nombre": "Ana María", "apellido": "Ruiz", "email": "ana@mail.com" }
```

El `dni` del body tiene que coincidir con el de la URL: el DNI identifica al alumno y no se puede cambiar.

**Status codes:**
- `200 OK`: los datos se modifican correctamente.
- `400 Bad Request`: falta alguno de los campos obligatorios, o el DNI del body no coincide con el de la URL.
- `404 Not Found`: no existe un alumno con ese DNI.

**Respuesta (200):**

```json
{
  "mensaje": "El alumno fue modificado",
  "alumno": { "dni": "45000000", "nombre": "Ana María", "apellido": "Ruiz", "email": "ana@mail.com" }
}
```

---

### DELETE /api/alumnos/:dni

Elimina un alumno a partir de su DNI.

**Status codes:**
- `204 No Content`: el alumno se elimina correctamente (la respuesta no tiene body).
- `404 Not Found`: no existe un alumno con ese DNI.

---

### GET /api/reportes/alumnos

Devuelve un reporte calculado a partir de los alumnos actuales: el total de alumnos y la cantidad de alumnos por dominio de email. No se guarda: se calcula en cada request, por lo que siempre refleja los datos del momento.

**Status codes:**
- `200 OK`: el reporte se genera correctamente.

**Respuesta (200):**

```json
{
  "total": 5,
  "dominios": {
    "gmail.com": 3,
    "hotmail.com": 1,
    "yahoo.com": 1
  }
}
```