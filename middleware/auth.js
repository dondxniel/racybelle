const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {

    if(req.header("Authorization")){
        let token = req.header("Authorization");
        token = token.split(' ')[1];
        
        if(!token){
            res.json({
                success: false,
                message: "Authorization Denied, no token."
            })
        }else{
            try{
                const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
                req.user = decoded;
                next();
            }catch(err){
                res.json({
                    success: false,
                    message: "Invalid token.",
                    data : err
                })
            }
        }
    }else{
        res.json({
            success: false,
            message: "Token not supplied."
        })
    }
    
}

module.exports = auth;