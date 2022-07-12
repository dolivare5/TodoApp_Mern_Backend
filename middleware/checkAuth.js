import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.js";

const checkAuth = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.usuario = await Usuario.findById(decoded.id).select("-password -token -confirmado -createdAt -updatedAt -__v");
            return next();
        } catch (e) {
            return res.status(404).json({msg: "A ocurrido un error, intentelo más tarde"})
        }
    }

    if(!token){
        const error = new Error('Token no valido.');
        return res.status(401).json({msg : error.message})
    }

}

export default checkAuth;