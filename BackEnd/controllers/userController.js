const bcrypt = require('bcrypt');
const User = require('../models/user');
const { generateToken } = require('./auth');

// Đăng ký người dùng mới
const registerUser = async (req, res) => {
    try {
        const { username, password, email, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, password: hashedPassword, email, role });
        const token = generateToken(user);
        res.status(201).json({ user, token });
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            const messages = error.errors.map(e => e.message);
            res.status(400).json({ error: 'Validation error', messages });
        } else {
            res.status(400).json({ error: error.message });
        }
    }
};

// Đăng nhập người dùng
const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }
        const token = generateToken(user);
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Lấy thông tin người dùng từ token
const getUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.userId); // Assuming userId is stored in the JWT
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Cập nhật thông tin người dùng
const updateUser = async (req, res) => {
    try {
        const { username, password, email, role } = req.body;
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Mã hóa mật khẩu nếu mật khẩu mới được cung cấp
        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }

        user.username = username || user.username;
        user.email = email || user.email;
        user.role = role || user.role;
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Xóa người dùng
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        await user.destroy();
        res.status(200).json({ message: 'User deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { registerUser, loginUser, getUser, updateUser, deleteUser, getAllUsers };
