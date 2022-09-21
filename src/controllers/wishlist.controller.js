import User from '../models/User';



export const getAll = async (req, res) => {

    const wishList = await User.find();

    res.json({
        status: 'success',
        data: wishList
    });
}


export const addProduct = async (req, res) => {

    const { idProduct, idUSer } = req.body;

    const userFound = await User.findById(idUSer);

    console.log("user found", userFound)





}