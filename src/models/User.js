import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new Schema({
    nombre: {
        type: String,
        required: false
    },
    apellido: {
        type: String,
        required: false
    },
    nombre_empresa: {
        type: String,
        required: false
    },
    foto_empresa: {
        type: String
    },
    telefono: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    direccion: {
        type: String
    },
    ciudad: {
        type: String
    },
    estado: {
        type: String
    },
    pais: {
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

