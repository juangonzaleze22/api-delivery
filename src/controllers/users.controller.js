import User from '../models/User';
import { Country, State, City } from 'country-state-city';

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
    const users = await User.find({ rol: 'BUSINESS' });

    res.json({
        status: 'success',
        data: users
    });
}


export const getPilots = async (req, res) => {

    const pilots = await User.find({ rol: 'PILOT' });

    res.json({
        status: 'success',
        data: pilots
    });
}


export const getBusinesById = async (req, res) => {

    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
        res.json({
            status: 'error'
        });
    }

    res.json({
        status: 'success',
        data: user
    });
}


export const updateUser = async (req, res) => {
    const { addressBusiness, description, email, name, phone, photo, rol } = req.body;
    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if email already exists
        const emailExists = await User.findOne({ email: email });
        if (emailExists && emailExists._id.toString() !== user._id.toString()) {
            return res.status(409).json({ message: "Email already exists" });
        }

        if (email) {
            console.log("here ww", photo && !photo.startsWith("/uploads"))

            // Update the user information
            user.addressBusiness = addressBusiness || user.addressBusiness;
            user.description = description || user.description;
            user.name = name || user.name;
            user.phone = phone || user.phone;
            user.rol = rol || user.rol;

            if (photo) {
                if (photo.startsWith("/uploads")) {
                    user.photo = photo
                } else {
                    user.photo = await saveFile(photo);
                }
            } else {
                user.photo = '';
            }
        }
        // Save the updated user information

        await user.save();
        return res.status(200).json(
            {
                status: 'success',
                message: "User updated successfully",
                user
            }
        );
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", error });
    }
};
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

    if (emailFound.length > 0) {
        res.json({
            status: 'EmailExist'
        });
    } else {
        res.json({
            status: 'success'
        });
    }

}

export const deleteUser = async (req, res) => {

    const { id } = req.params;


    const UserDelete = await User.findByIdAndDelete(id)

    if (UserDelete) {
        res.status(201).json({
            status: 'success',
            data: UserDelete
        });
    }

}

export const changeStatusPilot = async (req, res) => {

    const { id, status } = req.body;

    const user = await User.findById(id);

    user.status = status == 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    await user.save();

    if (user) {
        res.status(201).json({
            status: 'success',
            data: user
        });
    }

}
