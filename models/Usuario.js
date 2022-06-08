const mongoose = require('mongoose');

const usuarioSchema = mongoose.Schema({
   nombres: {
       type: String,
       required: true
   },
   apellido_paterno: {
    type: String,
    required: true
   },
   apellido_materno: {
    type: String,
    required: true
   },
   nacimiento: {
    type: String,
    required: true
   },
   correo: {
    type: String,
    required: true
   },
   contrasena: {
    type: String,
    required: true
   }
});

module.exports = mongoose.model('usuario', usuarioSchema);