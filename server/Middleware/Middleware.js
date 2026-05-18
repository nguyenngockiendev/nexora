const jwt = require('jsonwebtoken');
require("dotenv").config();

const authMiddleware = (req,res,next) =>{
    const auth = req.headers.authorization;

    if(!auth || !auth.startsWith('Bearer ')){
        return res.status(401).json({message:'NOT AUTHORIZED'})
    }
    const token = auth.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({message:'NOT AUTHORIZED'})
    }
}
module.exports = {authMiddleware}