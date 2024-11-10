const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const joi = require('joi');
const jwt = require('jsonwebtoken');
const swaggerJsdoc = require('swagger-jsdoc');
const cors = require('cors'); 
const swaggerUi = require('swagger-ui-express');

const app = express();
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true
}));

dotenv.config();
app.use(express.json());


// Swagger configuration
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'XM Bakeries API Documentation',
            version: '1.0.0',
            description: 'API documentation for XM Bakeries management system',
            contact: {
                name: 'API Support',
                email: 'support@xmbakeries.com'
            }
        },
        servers: [
            {
                url: 'http://localhost:3001',
                description: 'Development server'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            },
            schemas: {
                User: {
                    type: 'object',
                    required: ['username', 'password', 'role'],
                    properties: {
                        username: {
                            type: 'string',
                            description: 'User username'
                        },
                        password: {
                            type: 'string',
                            description: 'User password'
                        },
                        role: {
                            type: 'string',
                            enum: ['admin', 'staff', 'customer'],
                            description: 'User role'
                        }
                    }
                },
                Product: {
                    type: 'object',
                    required: ['name', 'price', 'category', 'quantity'],
                    properties: {
                        name: {
                            type: 'string',
                            description: 'Product name'
                        },
                        price: {
                            type: 'number',
                            description: 'Product price'
                        },
                        category: {
                            type: 'string',
                            description: 'Product category'
                        },
                        quantity: {
                            type: 'integer',
                            description: 'Product quantity'
                        },
                        description: {
                            type: 'string',
                            description: 'Product description'
                        }
                    }
                }
            }
        }
    },
    apis: ['./src/index.js']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Database connection
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

connection.connect((err) => {
    if (err) throw err;
    console.log('database connected successfully');
});

// Validation schemas
const schemas = {
    user: joi.object({
        username: joi.string().min(3).required(),
        password: joi.string().min(6).required(),
        role: joi.string().valid('admin', 'staff', 'customer').required()
    }),
    product: joi.object({
        name: joi.string().required(),
        price: joi.number().required(),
        category: joi.string().required(),
        quantity: joi.number().required(),
        description: joi.string().optional()
    })
};

// Middleware functions
const validateRequest = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        next();
    };
};

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    } catch (error) {
        res.status(403).json({ message: 'Access denied. Invalid token.' });
    }
};

// API Documentation Homepage
app.get('/', (req, res) => {
    res.send();
});
// app.get('/', (req, res) => {
//     res.send('./home.html')}); 

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Register a new user
 *     description: Create a new user account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input
 */
app.post('/api/auth/register', validateRequest(schemas.user), async (req, res) => {
    const { username, password, role } = req.body;
    try {
        let hashedPassword = await bcrypt.hash(password, 10);

        const sql = `INSERT INTO users(username, password, role)
     VALUES(?,?,?)`;
        connection.query(sql, [username, hashedPassword, role], (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Error registering user' });
            }
            res.status(201).json({ message: 'User registered successfully' });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Login user
 *     description: Login with username and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 */
app.post('/api/auth/login', async (req, res) => {
    const { username, password } = req.body;
    let sql = `SELECT * FROM users WHERE username = ?`;

    try {
        const [results] = await connection.promise().query(sql, [username]);

        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const user = results[0];
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.json({ token: token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

/**
 * @swagger
 * /api/products:
 *   post:
 *     tags:
 *       - Products
 *     summary: Create a new product
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Product created successfully
 *       401:
 *         description: Unauthorized
 *   get:
 *     tags:
 *       - Products
 *     summary: Get all products
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
app.post('/api/products', authenticateToken, validateRequest(schemas.product), async (req, res) => {
    const { name, price, category, quantity, description } = req.body;
    const sql = `INSERT INTO products (name, price, category, quantity, description) VALUES (?, ?, ?, ?, ?)`;

    connection.query(sql, [name, price, category, quantity, description], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error creating product' });
        }
        res.status(201).json({ message: 'Product created successfully' });
    });
});

// Get all products with filtering
app.get('/api/products', authenticateToken, (req, res) => {
    const { minPrice, maxPrice, category } = req.query;
    let sql = 'SELECT * FROM products WHERE 1=1';
    const params = [];

    if (minPrice) {
        sql += ' AND price >= ?';
        params.push(minPrice);
    }
    if (maxPrice) {
        sql += ' AND price <= ?';
        params.push(maxPrice);
    }
    if (category) {
        sql += ' AND category = ?';
        params.push(category);
    }

    connection.query(sql, params, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error fetching products' });
        }
        res.json(results);
    });
});

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     tags:
 *       - Products
 *     summary: Get a product by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */
app.get('/api/products/:id', authenticateToken, (req, res) => {
    const sql = 'SELECT * FROM products WHERE id = ?';
    connection.query(sql, [req.params.id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error fetching product' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(results[0]);
    });
});

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     tags:
 *       - Products
 *     summary: Update a product
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product updated successfully
 */
app.put('/api/products/:id', authenticateToken, validateRequest(schemas.product), (req, res) => {
    const { name, price, category, quantity, description } = req.body;
    const sql = `
        UPDATE products 
        SET name = ?, price = ?, category = ?, quantity = ?, description = ?
        WHERE id = ?
    `;
    
    connection.query(sql, [name, price, category, quantity, description, req.params.id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error updating product' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product updated successfully' });
    });
});

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     tags:
 *       - Products
 *     summary: Delete a product
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product deleted successfully
 */
app.delete('/api/products/:id', authenticateToken, (req, res) => {
    const sql = 'DELETE FROM products WHERE id = ?';
    connection.query(sql, [req.params.id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error deleting product' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    });
});

// Start server

// Update product
app.put('/api/products/:id', authenticateToken, validateRequest(schemas.product), (req, res) => {
    const { name, price, category, quantity, description } = req.body;
    const sql = `
        UPDATE products 
        SET name = ?, price = ?, category = ?, quantity = ?, description = ? 
        WHERE id = ?
    `;
    
    connection.query(sql, [name, price, category, quantity, description, req.params.id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error updating product' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product updated successfully' });
    });
});

// Delete product
app.delete('/api/products/:id', authenticateToken, (req, res) => {
    const sql = 'DELETE FROM products WHERE id = ?';
    connection.query(sql, [req.params.id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error deleting product' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    });
});

// Order Routes
// Place new order
/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Place a new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       201:
 *         description: Order placed successfully
 *   get:
 *     summary: Get user's order history
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of orders
 */

app.post('/api/orders', authenticateToken, validateRequest(schemas.order), async (req, res) => {
    const { products, deliveryAddress } = req.body;
    const customerId = req.user.userId;

    connection.beginTransaction(async (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error creating order' });
        }

        try {
            // Create order
            const [orderResult] = await connection.promise().query(
                'INSERT INTO orders (customer_id, delivery_address, status) VALUES (?, ?, ?)',
                [customerId, deliveryAddress, 'pending']
            );

            // Add order items and update inventory
            for (const item of products) {
                await connection.promise().query(
                    'INSERT INTO order_items (order_id, product_id, quantity) VALUES (?, ?, ?)',
                    [orderResult.insertId, item.productId, item.quantity]
                );

                await connection.promise().query(
                    'UPDATE products SET quantity = quantity - ? WHERE id = ?',
                    [item.quantity, item.productId]
                );
            }

            await connection.promise().commit();
            res.status(201).json({
                message: 'Order placed successfully',
                orderId: orderResult.insertId
            });
        } catch (error) {
            await connection.promise().rollback();
            console.error(error);
            res.status(500).json({ message: 'Error processing order' });
        }
    });
});

// Track order
/**
 * @swagger
 * /api/orders/{orderId}:
 *   get:
 *     summary: Get order details
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Order details
 *       404:
 *         description: Order not found
 */
app.get('/api/orders/:orderId', authenticateToken, (req, res) => {
    const sql = `
        SELECT o.*, oi.*, p.name as product_name 
        FROM orders o 
        JOIN order_items oi ON o.id = oi.order_id 
        JOIN products p ON oi.product_id = p.id 
        WHERE o.id = ? AND o.customer_id = ?
    `;
    
    connection.query(sql, [req.params.orderId, req.user.userId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error fetching order' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(results);
    });
});

// Get user's order history
app.get('/api/orders', authenticateToken, (req, res) => {
    const sql = `
        SELECT o.*, GROUP_CONCAT(p.name) as products
        FROM orders o
        JOIN order_items oi ON o.id = oi.order_id
        JOIN products p ON oi.product_id = p.id
        WHERE o.customer_id = ?
        GROUP BY o.id
        ORDER BY o.created_at DESC
    `;
    
    connection.query(sql, [req.user.userId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error fetching orders' });
        }
        res.json(results);
    });
});

// Inventory Routes
// Track low inventory
/**
 * @swagger
 * /api/inventory/track:
 *   get:
 *     summary: Track low inventory items
 *     tags: [Inventory]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of low inventory items
 */
app.get('/api/inventory/track', authenticateToken, (req, res) => {
    const sql = 'SELECT * FROM products WHERE quantity <= reorder_level';
    connection.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error tracking inventory' });
        }
        res.json(results);
    });
});

// Generate inventory report
/**
 * @swagger
 * /api/inventory/reports:
 *   get:
 *     summary: Generate inventory report
 *     tags: [Inventory]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Inventory report
 */

app.get('/api/inventory/reports', authenticateToken, (req, res) => {
    const { startDate, endDate } = req.query;
    const sql = `
        SELECT 
            p.name,
            p.category,
            SUM(oi.quantity) as total_quantity_sold,
            SUM(oi.quantity * p.price) as total_revenue,
            p.quantity as current_stock
        FROM products p
        LEFT JOIN order_items oi ON p.id = oi.product_id
        LEFT JOIN orders o ON oi.order_id = o.id
        WHERE (o.created_at BETWEEN ? AND ?) OR o.created_at IS NULL
        GROUP BY p.id
    `;

    connection.query(sql, [startDate || '1970-01-01', endDate || new Date()], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error generating report' });
        }
        res.json(results);
    });
});

// Customer Routes
// Get all customers (admin only)
/**
 * @swagger
 * /api/customers:
 *   get:
 *     summary: Get all customers (admin only)
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of customers
 *       403:
 *         description: Access denied
 *   post:
 *     summary: Add new customer
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       201:
 *         description: Customer created successfully
 */

app.get('/api/customers', authenticateToken, (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied' });
    }

    const sql = 'SELECT * FROM customers';
    connection.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error fetching customers' });
        }
        res.json(results);
    });
});

// Add new customer
/**
 * @swagger
 * /api/customers/{id}:
 *   put:
 *     summary: Update customer
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       200:
 *         description: Customer updated successfully
 *       404:
 *         description: Customer not found
 */
app.post('/api/customers', authenticateToken, validateRequest(schemas.customer), (req, res) => {
    const { name, email, phone, address } = req.body;
    const sql = 'INSERT INTO customers (name, email, phone, address) VALUES (?, ?, ?, ?)';
    
    connection.query(sql, [name, email, phone, address], (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ message: 'Email already exists' });
            }
            console.error(err);
            return res.status(500).json({ message: 'Error creating customer' });
        }
        res.status(201).json({
            message: 'Customer created successfully',
            customerId: result.insertId
        });
    });
});

// Update customer
app.put('/api/customers/:id', authenticateToken, validateRequest(schemas.customer), (req, res) => {
    const { name, email, phone, address } = req.body;
    const sql = 'UPDATE customers SET name = ?, email = ?, phone = ?, address = ? WHERE id = ?';
    
    connection.query(sql, [name, email, phone, address, req.params.id], (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ message: 'Email already exists' });
            }
            console.error(err);
            return res.status(500).json({ message: 'Error updating customer' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.json({ message: 'Customer updated successfully' });
    });
});
/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get a single product by ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *   put:
 *     summary: Update a product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Product ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product not found
 *       403:
 *         description: Not authorized
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Product ID to delete
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 *       403:
 *         description: Not authorized
 */

/**
 * @swagger
 * /api/products/search:
 *   get:
 *     summary: Search products with advanced filters
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Product name search term
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Minimum price
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: Maximum price
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Product category
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [price_asc, price_desc, name_asc, name_desc]
 *         description: Sort order
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items to return
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *     responses:
 *       200:
 *         description: List of products matching criteria
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                     page:
 *                       type: integer
 *                     pages:
 *                       type: integer
 */

/**
 * @swagger
 * /api/orders/status/{orderId}:
 *   put:
 *     summary: Update order status
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, processing, delivered, cancelled]
 *     responses:
 *       200:
 *         description: Order status updated successfully
 *       404:
 *         description: Order not found
 */

/**
 * @swagger
 * /api/inventory/adjust:
 *   post:
 *     summary: Adjust inventory levels
 *     tags: [Inventory]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - adjustment
 *               - reason
 *             properties:
 *               productId:
 *                 type: integer
 *               adjustment:
 *                 type: integer
 *                 description: Positive for addition, negative for subtraction
 *               reason:
 *                 type: string
 *     responses:
 *       200:
 *         description: Inventory adjusted successfully
 *       404:
 *         description: Product not found
 */

/**
 * @swagger
 * /api/inventory/low-stock:
 *   get:
 *     summary: Get products with low stock
 *     tags: [Inventory]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: threshold
 *         schema:
 *           type: integer
 *         description: Low stock threshold (optional)
 *     responses:
 *       200:
 *         description: List of products with low stock
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */

/**
 * @swagger
 * /api/inventory/reorder-alerts:
 *   get:
 *     summary: Get reorder alerts
 *     tags: [Inventory]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of products needing reorder
 */

/**
 * @swagger
 * /api/customers/search:
 *   get:
 *     summary: Search customers
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Customer name search term
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: Customer email
 *       - in: query
 *         name: phone
 *         schema:
 *           type: string
 *         description: Customer phone
 *     responses:
 *       200:
 *         description: List of matching customers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Customer'
 */

/**
 * @swagger
 * /api/customers/{id}/orders:
 *   get:
 *     summary: Get customer's order history
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Customer ID
 *     responses:
 *       200:
 *         description: Customer's order history
 *       404:
 *         description: Customer not found
 */

/**
 * @swagger
 * /api/reports/sales:
 *   get:
 *     summary: Generate sales report
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date for report
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: End date for report
 *       - in: query
 *         name: groupBy
 *         schema:
 *           type: string
 *           enum: [day, week, month]
 *         description: Group results by time period
 *     responses:
 *       200:
 *         description: Sales report
 */

/**
 * @swagger
 * /api/reports/revenue:
 *   get:
 *     summary: Generate revenue report
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Revenue report
 */

/**
 * @swagger
 * /api/reports/customers:
 *   get:
 *     summary: Generate customer activity report
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Customer activity report
 */

// Additional schema components
/**
 * @swagger
 * components:
 *   schemas:
 *     InventoryAdjustment:
 *       type: object
 *       required:
 *         - productId
 *         - adjustment
 *         - reason
 *       properties:
 *         productId:
 *           type: integer
 *         adjustment:
 *           type: integer
 *         reason:
 *           type: string
 *     SalesReport:
 *       type: object
 *       properties:
 *         period:
 *           type: string
 *         totalSales:
 *           type: number
 *         totalOrders:
 *           type: integer
 *         averageOrderValue:
 *           type: number
 *     RevenueReport:
 *       type: object
 *       properties:
 *         period:
 *           type: string
 *         revenue:
 *           type: number
 *         costs:
 *           type: number
 *         profit:
 *           type: number
 *         margin:
 *           type: number
 *     CustomerReport:
 *       type: object
 *       properties:
 *         totalCustomers:
 *           type: integer
 *         newCustomers:
 *           type: integer
 *         activeCustomers:
 *           type: integer
 *         averageOrdersPerCustomer:
 *           type: number
 */





const port = process.env.PORT || 3001; 
app.listen(port, ()=>{
    console.log(`server listening on port ${port}`);
    
}); 
