const Producto = require("../models/Producto");
const fs = require('fs');

exports.crearProducto = async (req, res) => {
    try {
        let producto;

        // creamos nuestro producto
        producto = new Producto({
            nombre: req.body.nombre,
            categoria: req.body.categoria,
            ubicacion: req.body.ubicacion,
            precio: req.body.precio,
            imagen: req.file.filename
        });

        console.log(producto);

        await producto.save();
        res.send(producto);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error de insercion');
    }
}

exports.obtenerProductos = async (req, res) => {
    try {
        const productos = await Producto.find();
        res.json(productos);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error de consulta');
    }
}

exports.actualizarProducto = async (req, res) => {
    try {
        const { nombre, categoria, ubicacion, precio } = req.body;

        let producto = await Producto.findById(req.params.id);

        if(!producto){
            res.status(404).json({ msg: 'No existe el producto' });
        } else {
            let nueva_imagen;
            //producto.imagen !== req.file.filename
            if (req.file) {
                try {
                    nueva_imagen = req.file.filename;
                    fs.unlinkSync('./imagenes/' + producto.imagen);
                } catch (err) {
                    console.log(err);
                }
            } else {
                nueva_imagen = producto.imagen;
            }
            producto.nombre = nombre;
            producto.categoria = categoria;
            producto.ubicacion = ubicacion;
            producto.precio = precio;
            producto.imagen = nueva_imagen;

            producto = await Producto.findOneAndUpdate({ _id: req.params.id }, producto, { new: true });
            res.json(producto);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error de actualizacion');
    }
}

exports.obtenerProducto = async (req, res) => {
    try {
        const { nombre, categoria, ubicacion, precio } = req.body;
        let producto = await Producto.findById(req.params.id);

        if(!producto){
            res.status(404).json({ msg: 'No existe el producto' });
        }

        res.json(producto);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error de actualizacion');
    }
}

exports.eliminarProducto = async (req, res) => {
    try {
        let producto = await Producto.findById(req.params.id);

        if(!producto){
            res.status(404).json({ msg: 'No existe el producto' });
        }

        Producto.findOneAndRemove({ _id: req.params.id }, (err, result) => {
            if (result.imagen != '') {
                try {
                    fs.unlinkSync('./imagenes/' + result.imagen);
                } catch(err) {
                    console.log(err)
                }
            }
        });

        res.json({ msg: 'Producto eliminado con exito' });
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error de actualizacion');
    }
}