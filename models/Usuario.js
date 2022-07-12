import mongoose from "mongoose";
import bcrypt from 'bcrypt';
// Creación de la estructura de los datos para los usuarios
const usuarioSchema = mongoose.Schema(
    {
        nombre : {
            type : String,
            required : true,
            trim: true
        },
        password : {
            type : String,
            required : true,
            trim: true
        },
        email : {
            type : String,
            required : true,
            trim: true,
            unique: true
        },
        token : {
            type : String,
        },
        confirmado : {
            type : Boolean,
            default : true
        }
    },
    {
        // Crea 2 columnas, una para credo y otra para actualizado
        timestamps: true

    }
);

usuarioSchema.pre('save', async function(next) {
    // Sy ya el usuario tiene un password y ésta encriptado no se vuelve encriptar.
    if (!this.isModified("password")){
        next();
    }
    // Encripta el password registrado por el usuario a través de bcrypt;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

usuarioSchema.methods.comprobarPassword = async function (passwordForm){
    return await bcrypt.compare(passwordForm, this.password);
}

const Usuario = mongoose.model("Usuario", usuarioSchema);

// Se coloca disponible en el proyecto para poder registrar nuevos usuarios
export default Usuario;



