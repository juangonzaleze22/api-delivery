
import {Schema, model} from 'mongoose';


const productSchema = new Schema({
    idUser: String,
    imagenes: Array,
    titulo: String,
    sku: String,
    categoria: String,
    resumen: String,
    status: String,
    precio: Number,
    descuento: Number,
    sizes: Array,
    metas: Array,
    descripcion: String,
    precioDescuento: Number,
    video: Object,
    urlVideo: String
},
{
    timestamps: true,
    versionKey: false
});


export default model('Products', productSchema);