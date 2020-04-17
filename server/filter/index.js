const { validationResult } = require('express-validator/check')

const filterRequest = () => {
    return function(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        } else
            next();
    };
};

module.exports = filterRequest