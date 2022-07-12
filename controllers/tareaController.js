import Tarea from "../models/Tarea.js";

const obtenerTareas = async (req, res) => {
    const tareas = await
        Tarea.find()
        .where('creador')
        .equals(req.usuario).select("-items")
    ;
    res.json(tareas);
}

const nuevaTarea = async (req, res) => {
    const tarea = new Tarea(req.body);
    tarea.creador = req.usuario._id;
    try {
        const tareaAlmacenada = await tarea.save();
        res.json(tareaAlmacenada);
    }catch (e) {
        console.log(e);
    }
}

const obtenerTarea = async (req, res) => {
    const { id } = req.params;
    const tarea = await Tarea.findById(id).populate('items');

    if (!tarea){
        return res.status(404).json({msg: "Tarea no encontrada."});
    }
    if (tarea.creador.toString() !== req.usuario._id.toString()){
        return res.status(401).json({msg : "Acción nombre permitida"});
    }


    res.json( tarea );
}

const editarTarea = async (req, res) => {
    const { id } = req.params;
    const tarea = await Tarea.findById(id);

    if (!tarea){
        return res.status(404).json({msg: "Tarea no encontrada."});
    }
    if (tarea.creador.toString() !== req.usuario._id.toString()){
        return res.status(401).json({msg : "Acción no permitida"});
    }
    tarea.titulo = req.body.titulo || tarea.titulo;
    tarea.cliente = req.body.cliente || tarea.cliente;
    tarea.descripcion = req.body.descripcion || tarea.descripcion;
    tarea.fechaLimite = req.body.fechaLimite || tarea.fechaLimite;
    try {
        const tareaAlmacenada = await tarea.save();
        res.json(tareaAlmacenada);
    }catch (e) {
        console.log(error)
    }

}

const eliminarTarea = async (req, res) => {
    const { id } = req.params;
    const tarea = await Tarea.findById(id);

    if (!tarea){
        return res.status(404).json({msg: "Tarea no encontrada."});
    }
    if (tarea.creador.toString() !== req.usuario._id.toString()){
        return res.status(401).json({msg : "Acción no permitida"});
    }
    try {
        await tarea.deleteOne();
        res.json({msg : 'Tarea eliminadas correctamente'})
    }catch (e) {
        console.log(e);
    }
}


export {
    obtenerTarea,
    obtenerTareas,
    editarTarea,
    eliminarTarea,
    nuevaTarea
}