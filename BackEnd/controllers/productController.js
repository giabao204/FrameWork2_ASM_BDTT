const Product = require('../models/product');
const Category = require('../models/category');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Tạo sản phẩm mới
const createProduct = async (req, res) => {
    try {
        const { name, price, content, cate_id, image } = req.body;
        let base64Image = null;

        if (image) {
            base64Image = image;
        }

        const product = await Product.create({ name, image: base64Image, price, content, cate_id });
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Lấy danh sách sản phẩm
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll({
            include: Category // Bao gồm thông tin danh mục
        });
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Lấy thông tin sản phẩm theo ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id, {
            include: Category // Bao gồm thông tin danh mục
        });
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Cập nhật sản phẩm theo ID
const updateProductById = async (req, res) => {
    try {
        const { name, price, content, cate_id } = req.body;
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        let image = product.image;

        if (req.file) {
            image = req.file.buffer.toString('base64');
        }

        product.name = name || product.name;
        product.image = image;
        product.price = price || product.price;
        product.content = content || product.content;
        product.cate_id = cate_id || product.cate_id;
        await product.save();
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Xóa sản phẩm theo ID
const deleteProductById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        await product.destroy();
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getProductsByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const products = await Product.findAll({
            where: { cate_id: categoryId },
            include: Category
        });
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProductById,
    deleteProductById,
    getProductsByCategory,
    upload
};
