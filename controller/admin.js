const admin = require('../models/admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const cookie = require('cookie-parser')
module.exports = {
    login: async (req, res) => {

        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(String(req.body.email).toLowerCase())) {
            const email = req.body.email.toLowerCase();
            const User = await admin.findOne({
                email: email.toLowerCase()
            })
            if (!User) {
                res.status(404).json({Error_message:"User with this email not found"})
                return 1
            }
            const valid = await bcrypt.compare(req.body.password, User.password);
            if (valid) {
                const token = jwt.sign({
                    email: User.email,
                    userId: User._id.toString(),
                    date: new Date(),
                }, '***REMOVED***', {
                    
                });
                res.cookie('***REMOVED***',token,{httpOnly:true});
                res.send("Ho gaya").status(200)
               
            }
            else {
                res.status(400).json({Error_message:"Wrong Password"})
            }

        }
        else {
            res.status(400).json({Error_message:"Enter a valid email addresss"})
        }

    }
    
}