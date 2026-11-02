const { Router } = require("express");
const controlador = require("../controladores/alumnosControlador");

const router = Router();

router.get("/", controlador.listar);
router.get("/:dni", controlador.obtener);
router.post("/", controlador.crear);
router.put("/:dni", controlador.modificar);
router.delete("/:dni", controlador.eliminar);

module.exports = router;