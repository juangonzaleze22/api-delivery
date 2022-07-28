import Subcategory from '../models/Subcategory';
import { deleteFile, saveFile } from '../utils'


export const createSubCategory = async (req, res) => {

    const { userId, subCategoria, imagen, categoryId } = req.body

    let urlPath = '';

    if (imagen != "") {
        urlPath = saveFile(imagen)
    }

    const newSubCategory = new Subcategory({
        userId,
        subCategoria,
        imagen,
        categoryId,
        pathUrl: urlPath
    })

    const subCategorySaved = await newSubCategory.save();

    res.status(200).json({
        status: 'success',
        data: subCategorySaved
    });
}

export const getSubCategoryByUser = async (req, res) => {

    const { userId, page = 1, limit = 10 } = req.body;

    const count = await Subcategory.find({ userId: userId }).countDocuments();
    const subcategory = await Subcategory.find({ userId: userId }).sort({ createdAt: -1 }).limit(limit * 1).skip((page - 1) * limit);
    /* const category = await Categories.find({userId: userId}) */

    res.status(201).json({
        status: 'success',
        data: subcategory,
        total: count,
        limit
    });
}

export const getAllSubCategoryByUser = async (req, res) => {
    const { userId } = req.body;

    console.log("userId is", userId);
    const categories = await Subcategory.find({ userId: userId });

    res.status(201).json({
        status: 'success',
        data: categories
    });
}

export const getAllSubCategoryByCategory = async (req, res) => {
    const { userId, idCategory } = req.body;

    const subcategories = await Subcategory.find({ userId: userId });
    const resultData = subcategories.filter( sub => sub.categoryId == idCategory )

    if (resultData.length > 0) {
        res.status(201).json({
            status: 'success',
            data: resultData
        });
    }else{ 
        res.status(201).json({
            status: 'noData',
            data: resultData
        });
    }
   
}

export const updateSubCategory = async (req, res) => {

    const { subCategoryId, image } = req.body;

    const pathUrl = typeof image === 'string' ? image : saveFile(image);

    const updatSubeCategory = await Subcategory.findByIdAndUpdate(subCategoryId, {
        ...req.body,
        pathUrl
    }, {
        new: true
    });


    res.status(201).json({
        status: "success",
        data: updatSubeCategory
    });
}
export const deleteSubCategory = async (req, res) => {

    const { idSubCategory } = req.body;
    const categorySubDelete = await Subcategory.findByIdAndDelete(idSubCategory);

    if (categorySubDelete) {
        deleteFile(categorySubDelete.pathUrl)
        res.status(201).json({
            status: 'success',
            data: categorySubDelete
        });
    } else {
        console.log("error deleting", categorySubDelete);
    }

}


