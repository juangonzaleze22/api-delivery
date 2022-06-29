import config  from '../config';
import jwt  from 'jsonwebtoken'
import User from '../models/User';

export const verifyToken = async (req, res, next) => {
  
    try {
        const token = req.headers.authorization;

        if (!token) return res.status(404).json({message: "no tokens providers"});

        const decode = jwt.verify(token, config.SECRECT);
        req.userId = decode.id;
        
        const userToken = await User.findById(req.userId);

        if (!userToken) return res.status(403).json({message: "No user found"})

        next();
    } catch (error) {
        res.status(401).json({message: "Unauthorized"})
    }
}
