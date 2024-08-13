const Order = require('../models/order');

// Thêm đơn hàng
async function createOrder(req, res) {
    try {
        const { name, email, phone, address, image, quantity, total, status } = req.body;

        let base64Image = null;

        if (image) {
            base64Image = image;
        }

        // Check for missing fields
        if (!name || !email || !phone || !address || !image || !quantity || !total) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        

        // Set default value for status if not provided
        const orderStatus =  1;

        console.log('Order Data:', req.body); // Log the request body

        const order = await Order.create({
            name,
            email,
            phone,
            address,
            image: base64Image,
            quantity,
            total,
            status: orderStatus
        });

        res.status(201).json(order);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Error creating order', error: error.message });
    }
}


// Lấy tất cả đơn hàng
async function getAllOrders(req, res) {
    try {
        const orders = await Order.findAll();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving orders', error });
    }
}

// Lấy đơn hàng theo ID
async function getOrder(req, res) {
    try {
        const { id } = req.params;
        const order = await Order.findByPk(id);
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving order', error });
    }
}

// Cập nhật đơn hàng
async function updateOrder(req, res) {
    try {
        const { id } = req.params;
        const { name, email, phone, address, image, quantity, total, status } = req.body;

        console.log(`Updating order with ID: ${id}`);
        console.log('Received data:', { name, email, phone, address, image, quantity, total, status });

        // Check if the order exists
        const order = await Order.findByPk(id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Ensure status is a valid value
        if (status !== '1' && status !== '2') {
            return res.status(400).json({ message: 'Invalid status value' });
        }

        // Update the order
        await Order.update(
            { name, email, phone, address, image, quantity, total, status },
            { where: { id } }
        );

        res.status(200).json({ message: 'Order updated successfully' });
    } catch (error) {
        console.error('Error updating order:', error); // Log the error for debugging
        res.status(500).json({ message: 'Error updating order', error });
    }
}



// Xóa đơn hàng
async function deleteOrder(req, res) {
    try {
        const { id } = req.params;
        await Order.destroy({ where: { id } });
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting order', error });
    }
}

module.exports = {
    createOrder,
    getAllOrders,
    getOrder,
    updateOrder,
    deleteOrder
};
