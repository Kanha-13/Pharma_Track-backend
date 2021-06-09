const admin = require('../models/admin');
const optSchema = require('../models/otp');
const sgMail = require('@sendgrid/mail')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const cookie = require('cookie-parser');
module.exports = {
    login: async (req, res) => {

        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(String(req.body.email).toLowerCase())) {
            const email = req.body.email.toLowerCase();
            const Admin = await admin.findOne({
                email: email.toLowerCase()
            })
            if (!Admin) {
                res.status(404).json({ Error_message: "User with this email not found" })
                return 1
            }
            const valid = await bcrypt.compare(req.body.password, Admin.password);
            if (valid) {
                const token = jwt.sign({
                    email: Admin.email,
                    userId: Admin._id.toString(),
                    date: new Date(),
                }, '', {

                });
                res.cookie('', token, { httpOnly: true });
                res.send("Ho gaya").status(200)

            }
            else {
                res.status(400).json({ Error_message: "Wrong Password" })
            }

        }
        else {
            res.status(400).json({ Error_message: "Enter a valid email addresss" })
        }

    },
    //admin has the signup req power so I you want to update something you can do that here
    signUp: async (req, res) => {
        const adminName = req.body.userName;
        const adminEmail = req.body.userEmail;
        const password = req.body.password;
        const isAdminExist = await admin.findOne({ email: userEmail })
        if (isAdminExist != null) {
            res.status(400).json("User Alerady exist")
        }
        else {
            //to hash a password
            const hashedPassword = bcrypt.hashSync(password, 10);
            const data = { adminName: adminName, otpVerified: false, email: adminEmail, password: hashedPassword }
            const newAdmin = await admin.create(data);
            //generate otp of 6 digit
            var digits = '0123456789';
            let otp = '';
            for (let i = 0; i < 6; i++) {
                otp += digits[Math.floor(Math.random() * 10)];
            }
            //rmv
            sgMail.setApiKey(process.env.SENDGRID_KA_API)
            const msg = {
                to: userEmail, // Change to your recipient
                from: 'kanha.agr13@gmail.com', // Change to your verified sender
                subject: 'Your OTP for Pharmacy ERP solution',
                text: otp,
            }
            sgMail
                .send(msg)
                .then(async () => {
                    await optSchema.create({ otp: otp, userId: newAdmin._id, userEmail: newAdmin.email })
                    res.status(201).json({ message: 'Otp Sent to Email' })
                })
                .catch((error) => {
                    console.error(error)
                    res.status(501).json(error)
                })
        }
    }
}