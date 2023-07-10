import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new Schema({
    name: {
        type: String,
    },
    lastname: {
        type: String,
    },
    description: {
        type: String,
    },
    birthday: {
        type: String,
    },
    photo: {
    },
    phone: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    addres: { 
        type: Object,
    },
    addressBusiness: { 
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        required: true
    },
    status: {
        type: String
    },
    addressCoordinates: {
        type: Array
    },
}, {
    timestamps: true,
    versionKey: false
});


userSchema.statics.encryptPassword = async (password, email) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password + 'ñ' + email, salt);
}

userSchema.statics.comparePassword = async (password, email, receivePassword) => {
    const encriptedEmailAndPassword = password + 'ñ' + email;
    return await bcrypt.compare(encriptedEmailAndPassword, receivePassword);
}



export default model('User', userSchema);

