import Tarea from "../models/Tarea.js";
import Item from "../models/Item.js";
import tarea from "../models/Tarea.js";

const agregarItem = async (req, res) => {
    const { tarea } = req.body;
    console.log(tarea)
    const existeTarea = await Tarea.findById(tarea);

    if (!existeTarea){
        const error = new Error("La tarea no existe");
        return res.status(404).json({msg : error.message});
    }
    if (existeTarea.creador.toString() !== req.usuario._id.toString()){
        const error = new Error("No cuentas con permisos para agregar Items");
        return res.status(404).json({msg : error.message});
    }
    try {
        const itemAlmacenado = await Item.create(req.body);
        // Almacenar el ID en el proyecto
        existeTarea.items.push(itemAlmacenado._id);
        await existeTarea.save();
        res.json(itemAlmacenado)
    }catch (e) {
        console.log(e);
    }
};


const obtenerItem = async (req, res) => {
    const { id } = req.params;
    const item = await Item.findById(id).populate("tarea");
    if (!item){
        const error = new Error("Item no encontrado");
        return res.status(404).json({msg : error.message});
    }

    if (item.tarea.creador.toString() !== req.usuario._id.toString()){
        const error = new Error("Acción no permitida");
        return res.status(403).json({msg : error.message});
    }
    res.json(item);
};

const actualizarItem = async (req, res) => {
    const { id } = req.params;
    const item = await Item.findById(id).populate("tarea");
    if (!item){
        const error = new Error("Item no encontrado");
        return res.status(404).json({msg : error.message});
    }

    if (item.tarea.creador.toString() !== req.usuario._id.toString()){
        const error = new Error("Acción no permitida");
        return res.status(403).json({msg : error.message});
    }
    item.nombre = req.body.nombre || item.nombre;
    item.descripcion = req.body.descripcion || item.descripcion;
    item.prioridad = req.body.prioridad || item.prioridad;
    item.fechaLimite = req.body.fechaLimite || item.fechaLimite;
    try {
        const tareaAlmacenada = await item.save();
        res.json(tareaAlmacenada);
    }catch (e) {
        console.log(e);
    }
};

const eliminarItem = async (req, res) => {
    const { id } = req.params;
    const item = await Item.findById(id).populate("tarea");
    if (!item){
        const error = new Error("Item no encontrado");
        return res.status(404).json({msg : error.message});
    }

    if (item.tarea.creador.toString() !== req.usuario._id.toString()){
        const error = new Error("Acción no permitida");
        return res.status(403).json({msg : error.message});
    }
    try {
        await item.deleteOne();
        res.json({msg : 'Item eliminado correctamente'})
    }catch (e) {
        console.log(e);
    }
};

const cambiarEstado = async (req, res) => {
    const {id } = req.params;
    const item = await Item.findById(id).populate("tarea");
    if (!item){
        const error = new Error("Item no encontrado");
        return res.status(404).json({msg : error.message});
    }

    if (item.tarea.creador.toString() !== req.usuario._id.toString()){
        const error = new Error("Acción no permitida");
        return res.status(403).json({msg : error.message});
    }
    try {
        item.estado = !item.estado;
        await item.save();
        res.json(item);
    }catch (e) {
        console.log(e);
    }
};

export { agregarItem, obtenerItem, actualizarItem, eliminarItem, cambiarEstado}