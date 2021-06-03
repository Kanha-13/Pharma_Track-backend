const optSchema = require('../models/otp');
const sgMail = require('@sendgrid/mail')
const User = require('../models/users')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const cookie = require('cookie-parser');
const { getMaxListeners } = require('../models/otp');
module.exports = {
    login: async (req, res) => {

        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(String(req.body.email).toLowerCase())) {
            const email = req.body.email.toLowerCase();
            const user = await User.findOne({
                email: email.toLowerCase()
            })
            if (!user) {
                res.status(404).json({ Error_message: "User with this email not found" })
                return 1
            }
            else if(!user.otpVerified) {
                res.status(404).json({ Error_message: "User already exist ,but not verified" })
                return 1
            }
            const valid = await bcrypt.compare(req.body.password, user.password);
            if (valid) {
                const token = jwt.sign({
                    email: user.email,
                    userId: user._id.toString(),
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
            if(user.otpVerified)
                res.status(400).json("User Alerady exist")
            else res.status(400).json("User already exist ,but not verified")
        }
        else {
            //to hash a password
            const hashedPassword = bcrypt.hashSync(password, 10);
            const data = { userName: userName, otpVerified: false, email: userEmail, password: hashedPassword }
            const newUser = await User.create(data);
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
                    setTimeout(async()=>{
                        await optSchema.deleteOne({userEmail:newUser.email})
                    }, 60000);
                    res.status(201).json({ message: 'Otp Sent to Email and is valid for 5 mins',userEmail:userEmail})
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
        const otpData= await optSchema.findOne({userEmail:email})
        if(otpData.otp==otp){
            const userData=  await User.updateOne({email:email},{$set:{otpVerified:true}})
            console.log(userData)
            const token = jwt.sign({
                email: email,
                userId: otpData.userId.toString(),
                date: new Date(),
            }, '***REMOVED***', {
            });
            res.cookie('***REMOVED***', token, { httpOnly: true });
            res.status(201).json({message:"OTP verified and user has been logged in"})
            return
        }
        else{
            res.status(400).json({message:"OTP does not match"})
        }
        if(!otpData){
            res.status(404).json({message:"OTP expired"})
        }
    },
    // resend:async
}