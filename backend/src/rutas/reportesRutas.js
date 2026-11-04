const { Router } = require("express");
const controlador = require("../controladores/reportesControlador"); // el controlador de REPORTES

const router = Router();

router.get("/alumnos", controlador.resumenAlumnos); // GET /api/reportes/alumnos

module.exports = router;