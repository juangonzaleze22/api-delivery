import fs from 'fs';
import path from 'path';
import Products from '../models/Products';

export const getAllProducts = async (req, res) => {
    const products = await Products.find();
    res.json(products);
}

export const getAllProductsByUser = async (req, res) => {

    const { userId, page = 1, limit = 10} = req.body;

    const count = await Products.find({userId: userId}).count();
    const products = await Products.find({userId: userId}).sort({createdAt: -1}).limit(limit * 1).skip((page - 1) * limit);

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
        video
    } = req.body

    const precioDescuento = descuento ? calcDiscountPrice(precio, descuento) : null

    const pathImages = imagenes.map( img => {
        return saveFile(img)
    })

    const pathUrlVideo = saveFile(video) 

    const newProducts = new Products({
        idUser,
        imagenes: pathImages,
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
        precioDescuento: precioDescuento
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

    if (products){
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

    const {idProduct, precio, descuento} = req.body;

    const precioDescuento = descuento ? calcDiscountPrice(precio, descuento) : null

    const updateProducts = await Products.findByIdAndUpdate(idProduct, {...req.body, precioDescuento: precioDescuento}, {
        new: true
    });

    res.status(201).json({
        status: 'success',
        data: updateProducts,
    });
}
export const deleteProduct = async (req, res) => {

    const {idProduct} = req.body

    const productsDelete = await Products.findByIdAndDelete(idProduct);

    res.status(201).json({
        status: 'success',
        data: productsDelete
    });
}

/* utils functions */

const saveFile = (file) => {
    const noSpaceName = file.name.split(" ").join("");
    const urlPath = `uploads/${Date.now()}-${noSpaceName}`;
    const filePath = `../public/uploads/${Date.now()}-${noSpaceName}`;
    let buffer = Buffer.from(file.base64.split(',')[1], 'base64');
    fs.writeFileSync(path.join(__dirname, filePath), buffer);
    return urlPath
} 

const calcDiscountPrice =  (precio, descuento) =>  { 
    const precioNumber = parseInt(precio)
    const precioDescuento = parseInt(descuento)
    const result = (1 - precioDescuento/100) * precioNumber;

    return result
}