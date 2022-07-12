import mongoose from "mongoose";
const tareaSchema = mongoose.Schema(
    {
        titulo: {
            type: String,
            trim: true,
            required : true
        },
        cliente: {
            type: String,
            trim: true,
            required : true
        },
        descripcion: {
            type: String,
            trim: true,
            required : true
        },
        fechaLimite: {
            type: Date,
            default: Date.now(),
            required : true
        },
        creador: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Usuario'
        },
        items: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Item'
            }
        ],
        colaboradores: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Usuario'
            }
        ]


    },
    {
        timestamps: true
    }
);

const Tarea = mongoose.model('Tarea', tareaSchema);

export default Tarea;