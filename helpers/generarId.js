const generarId = ()=> {
    //Genera una serie de caracteres aleatorios
    const random = Math.random().toString(32).substring(2);
    // Genera una fecha de forma aleatoria
    const fecha = Date.now().toString(32);
    //De esta forma género un, id complejo a través de las 2 variables anteriores.
    return random + fecha;
};

export default generarId;