import {Schema, model} from 'mongoose';
import fs from 'fs';
import path from 'path';

const SubCategorySchema = new Schema({
    subCategoria: String,
    categoryId: String,
    userId: String,
    pathUrl: String
},
{
    timestamps: true,
    versionKey: false
});


export default model('Subcategories', SubCategorySchema);