import User from '../models/User';

export const getUserAll = async (req, res) => {
    const user = await User.find();
    res.json(user);
}

export const getUserById = async (req, res) => {
    const user = await User.findById(req.body.userId);
    res.json(user);
}