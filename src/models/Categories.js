import {Schema, model} from 'mongoose';
import config  from '../config'

const CategorySchema = new Schema({
    categoria: String,
    userId: String,
    pathUrl: String
},
{
    timestamps: true,
    versionKey: false
});

export default model('categories', CategorySchema);