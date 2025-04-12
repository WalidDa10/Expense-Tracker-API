const jwt = require('jsonwebtoken');
const { model } = require('mongoose');
require('dotenv').config();

const SECRET_KEY = process.env.VISUAL_CROSSING_KEY

function authMiddleware(req, res, next){
    const authHeader = req.headers.authorization;
    if (!authHeader) { res.status(401).json({ message: 'No token provided' });}
    
    const token = authHeader.split(' ')[1];
    jwt.verify(token,SECRET_KEY,(err, decode)=>{
        if (err) return res.status(403).json({ message: 'Invalid token' });
        next();
    })

}

module.exports= authMiddleware;