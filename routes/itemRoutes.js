import express from "express";
import {
    actualizarItem,
    agregarItem,
    cambiarEstado,
    eliminarItem,
    obtenerItem
} from "../controllers/itemController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.post('/', checkAuth, agregarItem);

router
    .route('/:id')
    .get(checkAuth,  obtenerItem)
    .put(checkAuth, actualizarItem)
    .delete(checkAuth, eliminarItem);

router.post("/estado/:id", checkAuth, cambiarEstado);

export default router;