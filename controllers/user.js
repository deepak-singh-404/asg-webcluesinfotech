const bcrypt = require('bcryptjs')
const User = require('../model/user')
const cloudinary = require('../utils/cloudinary')
const bufferConversion = require('../utils/bufferConversion')

const addUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const user = await User.findOne({ email })
        if (user) {
            return res.status(200).json({ success: false, message: "User already exist with given email" })
        }
        let profileImage = ""
        if (req.file) {
            let icon = bufferConversion(req.file.originalname, req.file.buffer);
            let imgResponse = await cloudinary.uploader.upload(icon);
            profileImage = imgResponse.secure_url;
        }
        const hashedPassword = await bcrypt.hash(password, 5)
        const newUser = await new User({
            name,
            email,
            password: hashedPassword,
            profileImage
        })
        await newUser.save()
        return res.status(200).json({ success: true, message: "User added successfully", response: newUser })
    }
    catch (err) {
        return res.status(500).json({ success: false, message: "Internal Server Error", response: err.message })
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({})
        return res.status(200).json({ success: true, count: users.length, message: "User fetched successfully", response: users })
    }
    catch (err) {
        return res.status(500).json({ success: false, message: "Internal Server Error", response: err.message })
    }
}

module.exports = { addUser, getAllUsers }