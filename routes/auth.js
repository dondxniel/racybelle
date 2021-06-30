const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const checkAdminExistence = require('../middleware/checkAdminExistence');

router.post('/login', checkAdminExistence, (req, res) => {
    const { email, password } = req.body;

    if(req.adminExists){
        const admin = req.adminThatExists;
        if(password === admin.password){
            try{
                const token = jwt.sign({email, password}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: 86400}/*Expires in one day */);
                res.json({
                    success: true,
                    data: {token, admin}
                })
            }catch(err){
                res.json({
                    success: false,
                    message: "Unable to create token.",
                    data: err
                })
            }
        }
    }else{
        res.json({
            success: false,
            message: 'Sorry, the admin you\'re trying to log in does not exist'
        })
    }
    
})

module.exports = router;
