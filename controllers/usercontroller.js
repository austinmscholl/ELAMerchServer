const express = require('express');
var router = express.Router();
var sequelize = require('../db');
var User = sequelize.import('../models/user');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

// User.sync({force: true})

const validateSession = require('../middleware/validate-session');


router.post('/signup', function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var role = 'user';

    User.create({
        email: email,
        passwordhash: bcrypt.hashSync(password, 10),
        firstname: firstname,
        lastname: lastname,
        role: role
    }).then(
        function createSuccess(user) {
            var token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn:
            60*60*24});
            res.json({
                user: user,
                message: 'created',
                sessionToken: token
            });
        },
        function createError(err) {
            res.send(500, err.message);
        }
    );
});

router.post('/login', function(req, res) {
    User.findOne( { where: { email: req.body.email } } ).then(
        function(user) {
            if( user) {
                bcrypt.compare(req.body.password, user.passwordhash, function
                (err, matches) {
                    if (matches) {
                        var token = jwt.sign({id: user.id}, process.env.JWT_SECRET,
                          {expiresIn: 60*60*24 });
                        res.json({
                            user: user,
                            message: "successfully authenticated",
                            sessionToken: token
                        });
                    } else {
                        res.status(502).send({ error: "you failed, yo" });
                    }
                });
            } else {
                res.status(500).send({ error: "failed to authenticate" });
            }
        },
        function(err) {
            res.status(501).send({ error: "you failed, yo" });
        }
    );
});


module.exports = router;