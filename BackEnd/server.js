const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors
const { registerUser, loginUser, getUser, updateUser, deleteUser, getAllUsers,createUser } = require('./controllers/userController');
const {
    createProduct,
    getAllProducts,
    getProductById,
    updateProductById,
    deleteProductById,
    getProductsByCategory,
    upload
} = require('./controllers/productController');
const {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategoryById,
    deleteCategoryById
} = require('./controllers/categoryController');
const {
    createOrder,
    getAllOrders,
    getOrder,
    updateOrder,
    deleteOrder
} = require('./controllers/orderController');
const {authenticate} = require('./controllers//auth');

const app = express();

// Sử dụng middleware cors
app.use(cors({
    origin: 'http://localhost:3000', // Chỉ cho phép từ nguồn gốc này
}));

app.use(bodyParser.json()); // Đối với JSON
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

// User routes
app.post('/api/register', registerUser);
app.post('/api/login', loginUser);

app.post('/api/users',authenticate, createUser);
app.get('/api/users', authenticate, getAllUsers);
app.get('/api/users/:id', authenticate, getUser);
app.put('/api/users/:id', authenticate, updateUser);
app.delete('/api/users/:id', authenticate, deleteUser);

// Product routes

app.post('/api/products', upload.single('file'), createProduct);
app.get('/api/products', getAllProducts);
app.get('/api/products/:id', getProductById);
app.put('/api/products/:id', upload.single('file'), updateProductById);
app.delete('/api/products/:id', deleteProductById);
// Product routes
app.get('/api/products/category/:categoryId', getProductsByCategory);


// Category routes
app.post('/api/categories', createCategory);
app.get('/api/categories', getAllCategories);
app.get('/api/categories/:id', getCategoryById);
app.put('/api/categories/:id', updateCategoryById);
app.delete('/api/categories/:id', deleteCategoryById);


// Order routes
app.post('/api/orders', createOrder);
app.get('/api/orders', getAllOrders);
app.get('/api/orders/:id', getOrder);
app.put('/api/orders/:id', updateOrder);
app.delete('/api/orders/:id', deleteOrder);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
