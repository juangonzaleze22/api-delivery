import config  from '../config';
import jwt  from 'jsonwebtoken'
import User from '../models/User';

export const verifyToken = async (req, res, next) => {
  
    try {
        const token = req.headers.authorization;
        next();
    } catch (error) {
        res.status(401).json({message: "Unauthorized"})
    }
}
