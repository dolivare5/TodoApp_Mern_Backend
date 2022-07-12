import express from "express";
import {
    editarTarea,
    eliminarTarea,
    nuevaTarea,
    obtenerTarea,
    obtenerTareas
} from "../controllers/tareaController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router
    .route('/')
    .get(checkAuth, obtenerTareas)
    .post(checkAuth, nuevaTarea)
router
    .route('/:id')
    .get(checkAuth, obtenerTarea)
    .put(checkAuth, editarTarea)
    .delete(checkAuth, eliminarTarea)
export default router;