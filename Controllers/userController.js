
const userModel = require('../Models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


async function login(req, res) {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

async function createUser(req, res) {
    console.log(res.accessToken)
    console.log(req.body)
    try {
        console.log(res);
        const { name, email, password } = req.body;

        // בדיקת האם המשתמש קיים כבר לפי אימייל
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // הצפנת הסיסמא
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await userModel.create({ name, email, password: hashedPassword });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).send(error.message);
    }
}
module.exports = { login, createUser }