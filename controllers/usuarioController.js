const Usuario = require("../models/Usuario");
const fs = require('fs');

exports.crearUsuario = async (req, res) => {
    try {
        let usuario;

        usuario = new Usuario({
            nombres: req.body.nombres,
            apellido_paterno: req.body.apellido_paterno,
            apellido_materno: req.body.apellido_materno,
            nacimiento: req.body.nacimiento,
            correo: req.body.correo,
            contrasena: req.body.contrasena
        });

        console.log(usuario);

        await usuario.save();
        res.send(usuario);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error de insercion');
    }
}