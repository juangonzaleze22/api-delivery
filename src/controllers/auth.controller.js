import User from '../models/User';
import jwt from 'jsonwebtoken';
import config from '../config';
import { saveFile } from '../utils'

export const register = async (req, res) => {
    const {
        name,
        lastname,
        phone,
        photo,
        email,
        addres,
        password,
        rol,
    } = req.body

    const pathUrl = photo? await saveFile(photo) : '';

    console.log(pathUrl)

    const newUser = new User({
        name,
        lastname,
        phone,
        photo: pathUrl,
        email,
        addres,
        password: await User.encryptPassword(password, email),
        rol,
    });

    const emailDB = await User.findOne({ email: email })

    if (emailDB) {
        res.json(
            {
                status: 'EmailExist',
                message: 'Email already exist'
            }
        );
    } else {
        const saveUser = await newUser.save();
        const token = jwt.sign(
            {
                id: saveUser._id
            },
            config.SECRECT,
            {
                expiresIn: 86400
            }
        )
        res.json({
            status: 'success',
            token,
            message: 'Users created successfully'
        });
    }
}

export const login = async (req, res) => {

    const userFound = await User.findOne({ email: req.body.email })

    if (!userFound){
        res.json({
            status: 'EmailNotFound',
            message: "Email not found"
        })
    } else{
        const matchPassword = await User.comparePassword(req.body.password, req.body.email, userFound.password);
    
        if (!matchPassword) {
            return res.json({
                status: 'PasswordNotMatch',
                token: null,
                message: "Password not match"
            });
        }
    
        const token = jwt.sign({ id: userFound._id }, config.SECRECT, {
            expiresIn: 86400
        });
        res.json({
            status: 'success',
            token: token, 
            data: userFound,
        });
    }

    
}


export const users = async (req, res) => {
    const users = await User.findById();
    res.json(users);
}
