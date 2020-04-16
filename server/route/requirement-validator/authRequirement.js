const { check } = require('express-validator/check')


module.exports.authValidation = [
    check('email')
        .isEmail(),
    check('password')
        .isLength({ min:8 }).withMessage('Password must be at least 8 characters in length.')
        .matches('\[0-9\]').withMessage('Password must contain at least 1 number.')
        .matches('\[a-z\]').withMessage('Password must contain at least 1 lowercase letter.')
        .matches('\[A-Z\]').withMessage('Password must contain at least 1 uppercase letter.')
        .custom((value, {req, loc, path}) => {
            if (value !== req.body.password_confirmation) {
                return false;
            } else {
                return value;
            }
        }).withMessage("Passwords don't match."),
]

module.exports.loginValidation = [
    check('email')
        .isEmail(),
    check('password')
        .isLength({ min:8 }).withMessage('Password must be at least 8 characters in length.')
        .matches('\[0-9\]').withMessage('Password must contain at least 1 number.')
        .matches('\[a-z\]').withMessage('Password must contain at least 1 lowercase letter.')
        .matches('\[A-Z\]').withMessage('Password must contain at least 1 uppercase letter.')
]
