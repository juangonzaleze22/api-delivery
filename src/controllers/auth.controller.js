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
        avenue,
        street,
        numberHouse,
        password,
        rol,
        addressBusiness,
        birthday,
        description,
        status,
        addressCoordinates

    } = req.body

    const addres = {
        avenue,
        street,
        numberHouse
    }

    const pathUrl = photo ? await saveFile(photo) : '';


    const newUser = new User({
        name,
        lastname,
        description,
        phone,
        photo: pathUrl,
        email,
        addres,
        birthday,
        password: await User.encryptPassword(password, email),
        rol,
        addressBusiness,
        status,
        addressCoordinates
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

    if (!userFound) {
        res.json({
            status: 'EmailNotFound',
            message: "Email not found"
        })
    } else {
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

export const createAdmin = async (req, res) => {
    try {
        const adminUser = await User.findOne({ rol: 'ADMIN' });
        if (!adminUser) {
            const newAdminUser = new User({
                name: "admin",
                lastname: "admin",
                phone: "04145757263",
                photo: "",
                email: "admin@gmail.com",
                address: {
                  avenue: "7",
                  street: "2",
                  numberHouse: "257"
                },
                birthday: "1991-09-16",
                password: await User.encryptPassword("aA123123@", 'admin@gmail.com'),
                rol: "ADMIN"
              });
            await newAdminUser.save();
            console.log('Usuario admin creado exitosamente');
        } else {
            console.log('El usuario admin ya existe');
        }
    } catch (error) {
        console.error('Error al verificar el usuario admin:', error);
    }

    res.json({
        text: 'welcome'
    });

}


export const users = async (req, res) => {
    const users = await User.findById();
    res.json(users);
}
