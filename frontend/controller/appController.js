'use strict';

var mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt'),
    nodemailer = require('nodemailer'),
    User = mongoose.model('User');

function dispatch_emails(admin_email, user_email, fullname, company_name) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: '587',
        auth: {
            user: 'cloudtechnology8@gmail.com',
            pass: '**************'
        },
        secureConnection: 'false',
        tls: {
            ciphers: 'SSLv3',
            rejectUnauthorized: false
        }
    });

    const mailOptions = {
        from: 'cloudtechnology8@gmail.com',
        to: user_email,
        subject: 'Account Registration Successful!',
        html: '<h3>Attention,' + fullname + ' , </h3><p><h3>Your Account has been successfully setup.</h3></p><p> Please allow a maximum of 24 - 48 Hours for Review and succesful setup and approval of your online account.</p></br>Regards,</br> Online Services.'
    };

    const AdminNotifyEmail = {
        from: 'cloudtechnology8@gmail.com',
        to: admin_email,
        subject: 'Account Registration for ' + user_email + ', with Fullname : ' + fullname + ' (' + company_name + ')',
        html: '<h3>Attention Admin , </h3><p>A new User has registered his Access with the following Information: </br> <strong>Username : ' + user_email + '</strong></br><strong>Company Name : ' + company_name + '</strong></br><strong>Date of Registration : ' + Date.Now + '</strong></p>'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) throw error;
        return res.send({ error: false, data: info, message: 'OK' });
    })

    transporter.sendMail(AdminNotifyEmail, function (error, info) {
        if (error) throw error;
        return res.send({ error: false, data: info, message: 'OK' });
    })

}

exports.register = function (req, res) {
    var admin_email = req.body.admin_email;
    var newUser = new User();
    newUser.company_name = req.body.company_name;
    newUser.fullname = req.body.fullname;
    newUser.user_email = req.body.user_email;
    newUser.phone_number = req.body.phone_number;
    newUser.timezone = req.body.timezone;
    newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
    newUser.save(function (err, user) {
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            dispatch_emails(admin_email, newUser.user_email, newUser.fullname, newUser.company_name);
            user.hash_password = undefined;
            return res.json(user);
        }
    })
};

exports.sign_in = function (req, res) {
    User.findOne({
        email: req.body.email
    }, function (err, user) {
        if (err) throw err;
        if (!user || !user.comparePassword(req.body.password)) {
            return res.status(401).json({ message: 'Cannot Login, Authentication Failed' })
        }
        return res.json({ token: jwt.sign({ email: user.email, fullname: user.fullname, _id: user._id }, 'RESTFULAPI') })
    })
};

exports.loginRequired = function (req, res, next) {
    if (req.user) {
        next();
    } else {
        return res.status(401).json({ message: 'unauthorized User' });
    }
};

exports.profile = function (req, res, next) {
    if (req.user) {
        req.send(req.user);
        next();
    } else {
        return res.status(401).json({ message: 'Invalid Token' });
    }
}