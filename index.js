import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import conectarDB from './config/db.js';
import usuarioRoutes from "./routes/usuarioRoutes.js";
import tareaRoutes from "./routes/tareaRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";

const app = express();
app.use(express.json())

dotenv.config();

conectarDB();


// Configurar Cors
// Dominios permitidos
const corsOptions = {
    origin: '*',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 200,
}

app.use(cors(corsOptions));

/* Routing -- Aquí se definen y agrupan cada uno de los
 * verbos rutas disponibles por cada página para tener un mejor orden
 * y de esta forma separo cada una de las funcionalidades de este proyecto
 * para que sea fácil de mantener
 */

// Todos los request o peticiones que se realicen hacia api/usuarios serán dirigidos hacia el archivo usuarioRoutes
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/tareas", tareaRoutes);
app.use("/api/items", itemRoutes);

const port =  process.env.PORT || 4000;

app.listen(port)

