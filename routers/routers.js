const express = require('express');
const users = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../Middlewars')

const router = express.Router();
require('dotenv').config();


const SECRET_KEY = process.env.VISUAL_CROSSING_KEY
//endpoint to register the user
router.post('/SingUPUser',async(req,res)=>{
try {
    const { email, password } = req.body;
    const DBUsers = await users.find({email:email})
    
    if (DBUsers.length === 0 ) {
        // Hash password 
        const hashpass = await bcrypt.hash(password,10)
        const user = new users({email: email , password:hashpass});
        await user.save()
        res.status(200).send("creat successfuly ")
    }else{
        res.status(400).send('This account is alredy excite')
    }
} catch (err) {
    res.status(500).json({error : err.message})
}
})

// endpoint to Login the user with JWT auth
router.post('/Login', async (req, res) => {
    try {
        const { email, password } = req.body;
        //const DBUsers = await users.find({email : email})
        const DBUser = await users.findOne({email : email});
        if (!DBUser) { res.status(400).send('Wrong email or password!')}
        const isMatch = await bcrypt.compare(password, DBUser.password);
        if (!isMatch) {res.status(401).json({message: 'Wrong email or password!'})}


        const token = jwt.sign({ email: email }, SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json(token);
        
    } catch (err) {
        res.status(500).json({error : err.message})
    }
} )

module.exports= router;