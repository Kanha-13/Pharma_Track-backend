const optSchema = require('../models/otp');
const User = require('../models/users')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { sendEmail } = require('../utils/sendmail');
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
            else if (!user.otpVerified) {
                res.status(404).json({ Error_message: "User already exist ,but not verified" })
                return 1
            }
            const valid = await bcrypt.compare(req.body.password, user.password);
            if (valid) {
                const token = jwt.sign({
                    email: user.email,
                    userId: user._id.toString(),
                    date: new Date(),
                }, process.env.SECRETE_JWT_KEY, {

                });
                res.cookie(process.env.TOKEN_NAME, token, { httpOnly: true });
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
            if (user.otpVerified)
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
            if (await sendEmail(userEmail, otp)) {
                await optSchema.create({ otp: otp, userId: newUser._id, userEmail: newUser.email })
                setTimeout(async () => {
                    await optSchema.deleteOne({ userEmail: newUser.email })
                }, 600000);
                res.status(201).json({ message: 'Otp Sent to Email and is valid for 10 mins', userEmail: userEmail })
            } else {
                res.status(501).json({ message: "something went wrong!" })
            }
        }
    },
    otpVerification: async (req, res) => {
        const otp = req.body.otp;
        const email = req.body.userEmail
        const otpData = await optSchema.findOne({ userEmail: email })
        if (!otpData) {
            res.status(404).json({ message: "OTP expired" })
        }
        else if (otpData.otp == otp) {
            await User.updateOne({ email: email }, { $set: { otpVerified: true } })
            const token = jwt.sign({
                email: email,
                userId: otpData.userId.toString(),
                date: new Date(),
            }, process.env.SECRETE_JWT_KEY, {
            });
            res.cookie(process.env.TOKEN_NAME, token, { httpOnly: true });
            res.status(201).json({ message: "OTP verified and user has been logged in" })
            return
        }
        else {
            res.status(400).json({ message: "OTP does not match" })
        }
    },
    resendUserOTP: async (req, res) => {
        const user = await User.findOne({ email: req.body.email })
        if (!user) return res.status(404).json({ message: "No user found with this email" })
        if (await optSchema.findOne({ userEmail: user.email })) return res.status(400).json({ message: "Too many many attempts. Wait for 4 mins,than try again" })
        if (user.otpVerified) return res.status(400).json({ message: "User already verified" })
        else {
            //generate otp of 6 digit
            var digits = '0123456789';
            let otp = '';
            for (let i = 0; i < 6; i++) {
                otp += digits[Math.floor(Math.random() * 10)];
            }
            try {
                const callback = async (error, data, response) => {
                    if (error) {
                        res.status(501).json({ message: "something went wrong!" })
                    } else {
                        console.log('Email sent successfully');
                        await optSchema.create({ otp: otp, userId: user._id, userEmail: user.email })
                        setTimeout(async () => {
                            await optSchema.deleteOne({ userEmail: user.email })
                        }, 600000);
                        res.status(201).json({ message: 'Otp Sent to Email and is valid for 10 mins', userEmail: user.email })
                    }
                };

                await sendEmail(user.email, otp, callback).then(async () => {
                })
            } catch (error) {
                console.log(error)
                res.status(501).json({ message: "something went wrong!" })
            }
        }
    },
    forgetPassword: async (req, res) => {
        const email = req.body.email;
        const user = await User.findOne({ email: email })
        if (!user) return res.status(404).json({ message: "User with this email not found" })
        if (!user.otpVerified) return res.status(400).json({ message: "User not verified" })
        if (await optSchema.findOne({ userEmail: user.email })) return res.status(400).json({ message: "Too many many attempts. Wait for 10 mins,than try again" })
        //generate otp of 6 digit
        var digits = '0123456789';
        let otp = '';
        for (let i = 0; i < 6; i++) {
            otp += digits[Math.floor(Math.random() * 10)];
        }
        try {
            const callback = async (error, data, response) => {
                if (error) {
                    res.status(501).json({ message: "something went wrong!" })
                } else {
                    console.log('Email sent successfully');
                    await optSchema.create({ otp: otp, userId: user._id, userEmail: user.email })
                    setTimeout(async () => {
                        await optSchema.deleteOne({ userEmail: user.email })
                    }, 600000);
                    res.status(201).json({ message: 'Reset otp sent to Email and is valid for 10 mins', userEmail: user.email })
                }
            };

            await sendEmail(user.email, otp, callback).then(async () => {
            })
        } catch (error) {
            console.log(error)
            res.status(501).json({ message: "something went wrong!" })
        }
    },
    resetPasswordOTPverification: async (req, res) => {
        const email = req.body.email;
        const otp = req.body.otp;
        const otpData = await optSchema.findOne({ userEmail: email })
        if (!otpData) return res.status(404).json({ message: "Invalid Email" })
        if (!otpData.otp == otp) return res.status(400).json({ message: "OTP dose not match!" })
        else {
            res.status(200).json({ message: "Reset your password", requestId: otpData._id })
        }
    },
    newPasswordReset: async (req, res) => {
        const reqId = req.body.reId
        const otpData = await optSchema.findById({ _id: reqId })
        if (!otpData) return res.status(400).json({ message: "Fake credentials" })
        const hashedPassword = bcrypt.hashSync(req.body.newPassword, 10);
        console.log(await User.updateOne({ email: otpData.userEmail }, { $set: { password: hashedPassword } }))
        res.status(201).json({ message: "Password reset successfully. Login to continue" })
    }
}