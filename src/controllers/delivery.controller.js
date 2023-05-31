import fs from 'fs';
import path from 'path';
import Delivery from '../models/Delivery';
import { saveFile, deleteFile } from '../utils';




export const getAllDeliveries = async (req, res) => {

    const delivery = await Delivery.find()

    res.status(200).json({
        status: 'success',
        data: delivery
    });

}


export const createDelivery = async (req, res) => {

    const { title, description, lat, lon, address, price, idUser } = req.body;

    const status = 0

    const newDelivery = new Delivery({
        title,
        description,
        lat,
        lon,
        address,
        price,
        idUser,
        status: status
    })

    const delvierySaved = await newDelivery.save();

    res.status(200).json({
        status: 'success',
        data: delvierySaved
    });
}

/* export const getCategoryByUser = async (req, res) => {

    const { userId, page = 1, limit = 10 } = req.body;

    const count = await Categories.find({ userId: userId }).countDocuments();
    const category = await Categories.find({ userId: userId }).sort({ createdAt: -1 }).limit(limit * 1).skip((page - 1) * limit);

    res.status(201).json({
        status: 'success',
        data: category,
        total: count,
        limit
    });
}
 */
export const getAllDeliveryByUser = async (req, res) => {
    const { id } = req.params;

    console.log("asdas", id)

    const deliveries = await Delivery.find({ idUser: id });

    res.status(201).json({
        status: 'success',
        data: deliveries
    });
}

/* export const updateCategory = async (req, res) => {

    const { idCategory, image } = req.body;

    const pathUrl = typeof image === 'string' ? image : saveFile(image);


    const updateCategory = await Categories.findByIdAndUpdate(idCategory, {
        ...req.body,
        pathUrl
    }, {
        new: true
    });
    res.status(201).json({
        status: "success",
        data: updateCategory
    });
} */

export const deleteDelivery = async (req, res) => {

    const { id } = req.params;

    console.log(req.params)

    const deliveryDeleted = await Delivery.findByIdAndDelete(id);

    if (deliveryDeleted) {
        deleteFile(deliveryDeleted.pathUrl)
        res.status(201).json({
            status: 'success',
            data: deliveryDeleted
        });
    }

}
