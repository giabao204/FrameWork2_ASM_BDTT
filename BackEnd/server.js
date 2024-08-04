const express = require('express');
const bodyParser = require('body-parser');
const { registerUser, loginUser } = require('./controllers/userController');
const {
    createProduct,
    getAllProducts,
    getProductById,
    updateProductById,
    deleteProductById,
    upload
} = require('./controllers/productController');
const {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategoryById,
    deleteCategoryById
} = require('./controllers/categoryController');

const app = express();
app.use(bodyParser.json()); // Đối với JSON
app.use(bodyParser.urlencoded({ extended: true })); // Đối với form-data
app.use(bodyParser.json({ limit: '50mb' })); // Tăng giới hạn kích thước để xử lý chuỗi Base64 lớn

// User routes
app.post('/api/register', registerUser);
app.post('/api/login', loginUser);

// Product routes
app.post('/api/products', upload.single('image'), createProduct);
app.get('/api/products', getAllProducts);
app.get('/api/products/:id', getProductById);
app.put('/api/products/:id', upload.single('image'), updateProductById);
app.delete('/api/products/:id', deleteProductById);

// Category routes
app.post('/api/categories', createCategory);
app.get('/api/categories', getAllCategories);
app.get('/api/categories/:id', getCategoryById);
app.put('/api/categories/:id', updateCategoryById);
app.delete('/api/categories/:id', deleteCategoryById);

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
