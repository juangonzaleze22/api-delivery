import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new Schema({
    nombre: {
        type: String,
    },
    apellido: {
        type: String,
    },
    nombre_empresa: {
        type: String,
    },
    foto: {
        type: String
    },
    telefono: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    locacion: { 
        type: Object, 
    },
    sexo: { 
        type: String,
    },
    fecha_nacimiento: { 
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
    wishlist: {
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

