const Admin = require('../models/Admin');

const checkAdminExistence = (req, res, next) => {
    const { email } = req.body;
    Admin.findOne( { email })
    .then(result  => {
        // console.log(result)
        req.adminExists = (result) ? true : false;
        req.adminThatExists = result;
        next();
    })
    .catch(err => {
        res.json({
            success: false,
            message: "Failure in verifying admin existence.",
            data: err
        })
    })
}

module.exports = checkAdminExistence;