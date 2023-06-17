
import {Schema, model} from 'mongoose';


const productSchema = new Schema({
    name: String,
    description: String,
    category: String,
    photo: String,
    price: String,
    idBusiness: String
},
{
    timestamps: true,
    versionKey: false
});


export default model('Products', productSchema);