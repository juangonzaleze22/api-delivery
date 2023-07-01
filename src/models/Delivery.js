import { Schema, model } from 'mongoose';
import config from '../config'

const DeliverySchema = new Schema({
    title: String,
    description: String,
    coordinates: Array,
    price: String,
    user: Object,
    status: String,
    pilot: Object,
    idPilot: String,
    distance: Number || String,
},
    {
        timestamps: true,
        versionKey: false
    });


export default model('deliveries', DeliverySchema);