// Para controlar las rutas y tener un buen orden utilizo express.

import express from 'express';
import {
    autenticar, perfil, registrar
} from "../controllers/usuarioController.js";
import checkAuth from "../middleware/checkAuth.js";
// Gracias a express.Router es posible soportar los verbos get, put delete, etc.
const router = express.Router();
// Lo que esta a partir de la línea 7 se ejecutara una vés se realize una petición get hacia /usuarios.
// Autenticación, Registro y Confirmación de usuarios
router.post('/', registrar); // Crea un nuevo usuario
router.post('/login', autenticar);

router.get('/perfil', checkAuth, perfil);
export default router;
