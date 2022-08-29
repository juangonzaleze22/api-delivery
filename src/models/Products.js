
import {Schema, model} from 'mongoose';


const productSchema = new Schema({
    idUser: String,
    imagenes: Array,
    titulo: String,
    sku: String,
    categoria: String,
    subcategoria: String,
    resumen: String,
    status: String,
    sizes: Array,
    metas: Array,
    descripcion: String,
    precioDescuento: Number,
    video: Object,
    urlVideo: String,
    envio: Boolean,
    textEnvio: String,
    social: Object,
    customSize: Boolean,
    nombreCategoria: String
},
{
    timestamps: true,
    versionKey: false
});


export default model('Products', productSchema);