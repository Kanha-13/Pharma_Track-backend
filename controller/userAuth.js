const optSchema = require('../models/otp');
const sgMail = require('@sendgrid/mail')
const User = require('../models/users')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const cookie = require('cookie-parser');
module.exports = {
    login: async (req, res) => {

        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(String(req.body.email).toLowerCase())) {
            const email = req.body.email.toLowerCase();
            const User = await User.findOne({
                email: email.toLowerCase()
            })
            if (!User) {
                res.status(404).json({ Error_message: "User with this email not found" })
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
                res.cookie('***REMOVED***', token, { httpOnly: true });
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
        const userName = req.body.userName;
        const userEmail = req.body.userEmail;
        const password = req.body.password;
        const user = await User.findOne({ email: userEmail })
        if (user != null) {
            res.status(400).json("User Alerady exist")
        }
        else {
            //to hash a password
            const hashedPassword = bcrypt.hashSync(password, 10);
            const data = { userName: userName, otpVerified: false, email: userEmail, password: hashedPassword }
            const newUser = await User.create(data);
            console.log(newUser)
            //generate otp of 6 digit
            var digits = '0123456789';
            let otp = '';
            for (let i = 0; i < 6; i++) {
                otp += digits[Math.floor(Math.random() * 10)];
            }
            sgMail.setApiKey('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')
            const msg = {
                to: userEmail, // Change to your recipient
                from: 'kanha.agr13@gmail.com', // Change to your verified sender
                subject: 'Your OTP for Pharmacy ERP solution',
                text: otp,
            }
            sgMail
                .send(msg)
                .then(async() => {
                    await optSchema.create({ otp: otp, userId: newUser._id ,userEmail:newUser.email})
                    res.status(201).json({ message: 'Otp Sent to Email',userEmail:userEmail})
                })
                .catch((error) => {
                    console.error(error)
                    res.status(501).json(error)
                })
        }
    },
    otpVerification:async(req,res)=>{
        const otp=req.body.otp;
        const email=req.body.userEmail
        const userData= await optSchema.findOne({userEmail:email})
        console.log(userData)
        if(userData.otp==otp){
            await User.updateOne({email:email},{$set:{otpVerified:true}})
            const token = jwt.sign({
                email: userData.email,
                userId: userData._id.toString(),
                date: new Date(),
            }, '***REMOVED***', {

            });
            res.cookie('***REMOVED***', token, { httpOnly: true });
            res.status(201).json({message:"OTP verified and user has been logged in"})
        }
        else{
            res.status(400).json({message:"OTP does not match. Try again"})
        }
    }
}