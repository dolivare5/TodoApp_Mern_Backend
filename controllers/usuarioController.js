// Aquí es donde se comunica el routing y la vista con el controlador de usuarios.

import Usuario from "../models/Usuario.js";
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";

const registrar = async (req, res) => {
    // Evitar registros duplicados
    const { email } = req.body;
    const existeUsuario = await Usuario.findOne({email});
    if(existeUsuario){
        const error = new Error("Usuario ya registrado.");
        return res.status(400).json({msg : error.message});
    }
    try {
        const usuario = new Usuario(req.body);// Envía los datos al modelo para validar que se esté cada campo requerido
        usuario.token = generarId();
        await usuario.save(); // Si no hay problemas entonces se guardan los datos en la BD
        res.json({msg : "Usuario registrado correctamente."});
        // Finalmente, retorno un json con los datos y campos enviados a la BD
    }catch (e) {
        console.log(e)
    }
};

const autenticar = async (req, res) => {
    const { email, password } = req.body;
    // Comprobar si el usuario existe
    const usuario = await Usuario.findOne({email});
    if (!usuario){
        const error = new Error("El usuario no se encuentra registrado");
        return res.status(404).json({msg : error.message});
    }

    // Comprobar si el usuario está confirmado
    if (!usuario.confirmado){
        const error = new Error("Su cuenta no ha sido confirmada");
        return res.status(403).json({msg : error.message});
    }
    // Comprobar su password
    if (await  usuario.comprobarPassword(password)){
        res.json({
            _id: usuario.id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarJWT(usuario._id)
        })
    }else{
        const error = new Error("La contraseña ingresada es incorrecta");
        return res.status(403).json({msg : error.message});
    }
}


const perfil = async (req, res) => {
    const { usuario } = req;
    res.json(usuario);
};

export { registrar, autenticar, perfil }