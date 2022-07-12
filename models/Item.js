import mongoose from "mongoose";

const itemSchema = mongoose.Schema(
    {
        nombre: {
            type: String,
            trim: true,
            required: true,
        },
        descripcion: {
            type: String,
            trim: true,
            required: true,
        },
        estado: {
            type: Boolean,
            default: false,
        },
        fechaLimite: {
            type: Date,
            required: true,
        },
        prioridad: {
            type: String,
            required: true,
            enum: ['Baja', 'Media', 'Alta'],
        },
        tarea: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tarea'
        }
    },
    {
        timestamps: true
    }
);

const Item = mongoose.model('Item', itemSchema);

export default Item;