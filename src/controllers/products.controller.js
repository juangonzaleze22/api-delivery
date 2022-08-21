import fs from 'fs';
import path from 'path';
import Products from '../models/Products';
import Categories from '../models/Category';
import SubCategories from '../models/Subcategory';


import { calcDiscountPrice, saveFile, deleteFile } from '../utils'

export const getAllProducts = async (req, res) => {
    const { page = 1, limit = 10, category } = req.body;

    const categories = await Products.find({ categoria: category });

    const isCategory =  categories.length > 0? true : false

    const count = await Products.find().countDocuments();
    const products = await Products.find(isCategory ? { categoria: category } : { subcategoria: category })
        .sort({ createdAt: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit);

    if (products) {
        res.json({
            status: 'success',
            data: products,
            total: count,
            limit
        });
    }

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
        titulo,
        sku,
        categoria,
        subcategoria,
        resumen,
        descripcion,
        status,
        sizes,
        metas,
        video,
        urlVideo,
        envio,
        textEnvio,
        social,
        customSize

    } = JSON.parse(req.body.product)

    const images = req.files

    console.log("DATAAA", JSON.parse(req.body.product))
    console.log(images)


    const pathImages = images.map(img => {
        const urlPath = `uploads/${img.filename}`;
        return urlPath
    })



    let pathUrlVideo = {};

    if (Object.entries(video).length != 0) {
        pathUrlVideo = saveFile(video)
    }

    const newProducts = new Products({
        idUser,
        imagenes: pathImages,
        video: pathUrlVideo,
        titulo,
        sku,
        categoria,
        subcategoria,
        resumen,
        status,
        descripcion,
        sizes,
        metas,
        urlVideo,
        envio,
        textEnvio,
        social,
        customSize
    })

    console.log("Images", newProducts)


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

    const product = JSON.parse(req.body.product)
    const { idProduct } = product;

    console.log(product);

    const valuateIamages = req.body.imagenes;
    let resultImages = []

    if (typeof valuateIamages === 'string') {
        resultImages.push(valuateIamages)
    } else {
        valuateIamages ? resultImages = valuateIamages : []
        const images = req.files;

        images?.map(img => {
            const urlPath = `uploads/${img.filename}`;
            resultImages.push(urlPath);
        })

    }

    const updateProducts = await Products.findByIdAndUpdate(idProduct, {
        ...product,
        imagenes: resultImages
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

export const getProductDiscount = async (req, res) => {
    
    const { limit = 8 } = req.body

    const products = await Products.find();

    const dataReturn = products.filter((product, index) => {
       return product.sizes.some(size => {
            if (size.discount){
                return product  
            }
        });

    });

    if (products) {
        res.status(200).json({
            status: 'success',
            data: dataReturn.slice(0, 8)
        });
    }

}

export const getAllProductsNews = async (req, res) => {
    const { limit = 8 } = req.body

    const products = await Products.find()
    .limit(limit * 1)
    .sort({ createdAt: -1 });

    if (products) {
        res.status(200).json({
            status: 'success',
            data: products
        });
    }

}

