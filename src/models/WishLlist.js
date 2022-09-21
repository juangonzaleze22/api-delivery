import { Schema, model } from 'mongoose';

const wishListSchema = new Schema({
    list: {
        type: Array,
    },
   
}, {
    timestamps: true,
    versionKey: false
});

export default model('WishList', wishListSchema);

