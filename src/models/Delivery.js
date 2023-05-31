import {Schema, model} from 'mongoose';
import config  from '../config'

const DeliverySchema = new Schema({
    title: String,
    description: String,
    lat: Number,
    lon: Number,
    address: String,
    price: String,
    idUser: String,
    status: Number
},
{
    timestamps: true,
    versionKey: false
});

export default model('deliveries', DeliverySchema);