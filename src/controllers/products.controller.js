import fs from 'fs';
import path from 'path';
import Products from '../models/Products';
import { calcDiscountPrice, saveFile, deleteFile } from '../utils'

export const getAllProducts = async (req, res) => {
    const products = await Products.find();
    res.json(products);
}

export const getAllProductsByUser = async (req, res) => {

    const { idUser, page = 1, limit = 10 } = req.body;

    const count = await Products.find({ idUser }).countDocuments();
    const products = await Products.find({ idUser }).sort({ createdAt: -1 }).limit(limit * 1).skip((page - 1) * limit);

    res.json({
        status: 'success',
        data: products,
        total: count,
        limit
    });
}
export const createProduct = async (req, res) => {

    const {
        idUser,
        imagenes,
        titulo,
        sku,
        categoria,
        resumen,
        precio,
        status,
        descripcion,
        sizes,
        metas,
        descuento,
        video,
        urlVideo
    } = req.body

    const precioDescuento = descuento ? calcDiscountPrice(precio, descuento) : null

    const pathImages = imagenes.map(img => {
        return saveFile(img)
    })

    let pathUrlVideo = {};

    if (Object.entries(video).length != 0) {
        pathUrlVideo = saveFile(video)
    }

    const newProducts = new Products({
        idUser,
        imagenes: await pathImages,
        video: pathUrlVideo,
        titulo,
        sku,
        categoria,
        resumen,
        precio,
        status,
        descripcion,
        sizes,
        metas,
        descuento,
        precioDescuento: precioDescuento,
        urlVideo
    })

    const productSaved = await newProducts.save();

    res.status(201).json({
        status: 'success',
        data: productSaved
    });

}

export const getProductsById = async (req, res) => {

    const { idProduct } = req.body;
    const products = await Products.findById(idProduct);

    if (products) {
        res.status(201).json({
            status: 'success',
            data: products
        });
    } else {
        res.status(401).json({
            status: 'errorProductNotFound'
        });
    }


}
export const updateProduct = async (req, res) => {

    const { idProduct, precio, descuento } = req.body;

    const valuateIamages = req.body.imagenes;

    const imagesValues =  valuateIamages.map( img => {
        const type = typeof img;
        if (type != 'string') {
           img = saveFile(img)
        }
        return img
    })

    const precioDescuento = descuento ? calcDiscountPrice(precio, descuento) : null

     const updateProducts = await Products.findByIdAndUpdate(idProduct, { 
        ...req.body,
         precioDescuento: precioDescuento,  
         imagenes: imagesValues
        }, {
         new: true
     });

    res.status(201).json({
        status: 'success',
        data: updateProducts,
    });
}
export const deleteProduct = async (req, res) => {

    const { idProduct } = req.body

    const productsDelete = await Products.findByIdAndDelete(idProduct);

    if (productsDelete) { 
        productsDelete.imagenes.map(img => { 
            deleteFile(img)
        })
    }

    res.status(201).json({
        status: 'success',
        data: productsDelete
    });
}


