import fs from 'fs';
import path from 'path';
import Delivery from '../models/Delivery';
import User from '../models/User';
import { saveFile, deleteFile } from '../utils';


const STATUS_ORDER = {
    PENDING: 'PENDING',
    IN_PROCESS: 'IN_PROCESS',
    COMPLETE: 'COMPLETE',
    CANCEL: 'CANCEL'
}


export const getAllDeliveries = async (req, res) => {

    const delivery = await Delivery.find()

    res.status(200).json({
        status: 'success',
        data: delivery
    });

}


export const createDelivery = async (req, res) => {

    const { title, description, coordinates, distance, idUser } = req.body;

    const randomUser = await User.aggregate([
        { $match: { rol: 'PILOT', status: 'ACTIVE' } },
        { $sample: { size: 1 } }
    ]);

    let pilot = null;

    if (randomUser && randomUser.length > 0) {
        pilot = randomUser[0];
        delete pilot.password
        delete pilot.rol
        delete pilot.status
        await User.findByIdAndUpdate(pilot._id, { status: 'BUSY' });
    }

    const userFound = await User.findById(idUser);
    userFound.password = '';
    const status = pilot ? STATUS_ORDER.IN_PROCESS : STATUS_ORDER.PENDING;

    const newDelivery = new Delivery({
        title,
        description,
        coordinates,
        user: userFound,
        status,
        idPilot: pilot?._id,
        pilot,
        distance
    })

    const delvierySaved = await newDelivery.save();

    res.status(200).json({
        status: 'success',
        data: delvierySaved
    });
}

export const confirmDelivery = async (req, res) => {
    const { idPilot, idDelivery } = req.body;


    const delivery = await Delivery.findById(idDelivery);
    const pilot = await User.findById(idPilot);

    if (!delivery) {
        res.status(200).json({
            status: 'deliveryNotFound'
        });
    }

    if (!pilot) {
        res.status(200).json({
            status: 'pilotNotFound'
        });
    }

    delivery.status = STATUS_ORDER.COMPLETE;
    pilot.status = 'ACTIVE'

    await delivery.save();
    await pilot.save();

    res.status(200).json({
        status: 'success'
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

    const deliveries = await Delivery.find();
    const filterDeliveries = deliveries.filter(deliveries => deliveries.user._id == id);

    res.status(201).json({
        status: 'success',
        data: filterDeliveries
    });
}

export const getDeliveryByPilot = async (req, res) => {
    const { id } = req.params;
    const delivery = await Delivery.find({
        idPilot: id,
        status: { $ne: 'COMPLETE' }
    });

    console.log(delivery);

    res.status(201).json({
        status: 'success',
        data: delivery
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

    const deliveryDeleted = await Delivery.findByIdAndDelete(id);

    if (deliveryDeleted) {
        deleteFile(deliveryDeleted.pathUrl)
        res.status(201).json({
            status: 'success',
            data: deliveryDeleted
        });
    }

}
