//Rutas para producto
const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');
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

// api/productos
router.post('/', upload.single('imagen'), productoController.crearProducto);
router.get('/', productoController.obtenerProductos);
router.put('/:id', upload.single('imagen'), productoController.actualizarProducto);
router.get('/:id', productoController.obtenerProducto);
router.delete('/:id', productoController.eliminarProducto);

module.exports = router;