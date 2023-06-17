import User from '../models/User';
import { Country, State, City }  from 'country-state-city';

import { saveFile } from '../utils'

export const getUserAll = async (req, res) => {
    const user = await User.find();
    res.json(user);
}

export const getUserById = async (req, res) => {
    const user = await User.findById(req.body.userId);
    res.json(user);
}

export const getBusiness = async (req, res) => {
    const users = await User.find({rol: 'BUSINESS'});

    console.log(users)

    res.json({
        status: 'success',
        data: users
    });
}

export const getBusinesById = async (req, res) => {

    const { id } = req.params;

    const user = await User.findById(id);

    console.log(user)

    res.json({
        status: 'success',
        data: user
    });
}


export const updateUser = async (req, res) => {

    const { idUser, pais, estado, ciudad } = req.body;

    let locacion = {
        ciudad: ciudad
    }

    if (pais){
        const {isoCode: isoCodePais, name: nameCountry, phonecode, currency } = Country.getCountryByCode(pais);
        const {isoCode: isoCodeState, name: nameState } = State.getStateByCodeAndCountry(estado, pais);

        locacion = { 
            ...locacion,
            isoCodePais: isoCodePais,
            nombrePais: nameCountry,
            codigoTelefono: phonecode,
            divisa: currency,
            isoCodeEstado: isoCodeState,
            nombreEstado: nameState
        }
    }

    const updateUser = await User.findByIdAndUpdate(idUser, {
        ...req.body,
        locacion
    }, {
         new: true
     });

    res.json({
        status: 'success',
        data: updateUser
    });
}

export const updateProfileImage = async (req, res) => {
    
    const { idUser, image } = req.body
    const pathUrl = typeof image === 'string' ? image : saveFile(image);

    await User.findByIdAndUpdate(idUser, {
        foto: pathUrl
    })

    const dataUpdated = await User.findById(idUser);

    res.json({
        status: 'success',
        data: dataUpdated
    });

}

export const validateEmail = async (req, res) => {

    const email = req.body.email
    const emailFound = await User.find({ email });

    if (emailFound.length > 0){ 
        res.json({
            status: 'EmailExist'
        });
    }else {
        res.json({
            status: 'success'
        });
    }

}

export const deleteUser = async (req, res) => {

    const { idUser } = req.body;

    const UserDelete = await User.findByIdAndDelete(idUser)

    if(UserDelete) { 
        res.status(201).json({
            status: 'success',
            data: UserDelete
        });
    }

}
