import fs from 'fs';
import path from 'path';
import Categories from '../models/Categories';


/* export const getCategories = async (req, res) => {
    const category = await Categories.find();
    res.json(category);
} */
export const createCategory = async (req, res) => {

    const { userId, categoria, imagen } = req.body

    const noSpaceName = imagen.name.split(" ").join("");
    
    const filePath = `../public/uploads/${Date.now()}-${noSpaceName}`;
    const urlPath = `/uploads/${Date.now()}-${noSpaceName}`;
    let buffer = Buffer.from(imagen.base64.split(',')[1], 'base64');


    const newCategory = new Categories({
        userId,
        categoria,
        imagen,
        pathUrl: urlPath
    })

    const categorySaved = await newCategory.save();

    fs.writeFileSync(path.join(__dirname, filePath), buffer);

    res.status(200).json({
        status: 'success',
        data: categorySaved
    });
}

export const getCategoryByUser = async (req, res) => {

    const { userId, page = 1, limit = 10} = req.body;
    
    const count = await Categories.find({userId: userId}).countDocuments();
    const category = await Categories.find({userId: userId}).sort({createdAt: -1}).limit(limit * 1).skip((page - 1) * limit);
    /* const category = await Categories.find({userId: userId}) */

    res.status(201).json({
        status: 'success',
        data: category,
        total: count,
        limit
    });
}

export const getAllCategoryByUser = async (req, res) => {
    const { userId } =  req.body;

    console.log("userId is", userId);
    const categories = await Categories.find({userId: userId});

    res.status(201).json({
            status: 'success',
            data: categories
        });
}

export const updateCategory = async (req, res) => {
    
    const { idCategory } = req.body;

    console.log("token in header", req.headers);

    const updateCategory = await Categories.findByIdAndUpdate(idCategory, req.body, {
        new: true
    });
    res.status(201).json({
        status: "success",
        data: updateCategory
    });
}
export const deleteCategory = async (req, res) => {

    const { idCategory } = req.body;
    const categoryDelete = await Categories.findByIdAndDelete(idCategory);
    res.status(201).json({
        status: 'success',
        data: categoryDelete
    });
}