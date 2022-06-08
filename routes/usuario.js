//Rutas para producto
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
//cambios
const multer = require('multer');

const storageImages = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './imagenes')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname)
    }
});

const upload = multer({
    storage: storageImages
});

// api/usuarios
router.post('/', usuarioController.crearUsuario);

module.exports = router;