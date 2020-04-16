
exports.findApplicationByName = function() {
    return (req, res, next) => {
        if (!req.body.name) {
            return res.ko('Must send a name');
        }
        // else if (!req.body.app_id) {
        //     return res.ko('Must send an id');
        // }
        else {
            // Application.findOne({ name : req.body.name }, (err, application) => {
            //     if (err)
            //         return res.status(400).send('request failed');
            //     req.session = {
            //         application: application
            //     };
            //     next();
            // })
        }
    }
};

exports.findApplicationById = function() {
    return (req, res, next) => {
        if (!req.params.id) {
            return res.ko('Must send an Id');
        } else {
            console.log("OK ok");
            // Application.findById( req.params.id , (err, application) => {
            //     if (err)
            //         return res.internalError('findApplicationById problem request');
            //     req.session = {
            //         application: application
            //     };
            //     next();
            // })
        }
    }
};
