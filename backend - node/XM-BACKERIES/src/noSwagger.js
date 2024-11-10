const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const joi = require('joi');
const jwt = require('jsonwebtoken');


const app = express();
dotenv.config(); 
app.use(express.json()); 

// databases connection
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME, 
    port: process.env.DB_PORT
});
connection.connect((err)=>{
    if(err) throw err;
    console.log('database connected succefuly'); 
    
})
// validation  schemas
const schemas = {
    user: joi.object({
        username: joi.string().min(3).required(),
        password: joi.string().min(6).required(),
        role: joi.string().valid('admin','staff','customer').required()
    }),
    product: joi.object({
        name: joi.string().required(),
        price: joi.number().required(),
        category: joi.string().required(),
        quantity: joi.number().required(),
        description: joi.string().optional()
    }),
    order: joi.object({
        products: joi.array().items(
            joi.object({
                productId: joi.number().required(),
                quantity: joi.number().required()
            })
        ).required(),
        deliveryAddress: joi.string().required()
    }),
    customer: joi.object({
        name: joi.string().required(),
        email: joi.string().email().required(),
        phone: joi.string().required(),
        address: joi.string().required()
    })
};

// mmiddleware function
const validateRequest = (schema)=>{
return (req, res, next)=>{
    const {error} = schema.validate(req.body);
    if(error){
        return res.status(400).json({message: error.details[0].message})
    }
    next();
}
}
// authicate
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];  // Use lowercase 'authorization' for consistency
    const token = authHeader && authHeader.split(' ')[1];  // Corrected to get the actual token part

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


app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>XM Bakeries API Documentation</title>
            <style>
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    line-height: 1.6;
                    margin: 0;
                    padding: 20px;
                    background: #f5f5f5;
                    color: #333;
                }
                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    background: white;
                    padding: 30px;
                    border-radius: 10px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                }
                h1 {
                    color: #2c3e50;
                    text-align: center;
                    padding-bottom: 20px;
                    border-bottom: 2px solid #eee;
                }
                .section {
                    margin: 30px 0;
                    padding: 20px;
                    background: #f8f9fa;
                    border-radius: 8px;
                }
                .endpoint {
                    background: #fff;
                    padding: 15px;
                    margin: 10px 0;
                    border-left: 4px solid #3498db;
                    border-radius: 4px;
                }
                .method {
                    display: inline-block;
                    padding: 5px 10px;
                    border-radius: 4px;
                    font-weight: bold;
                    margin-right: 10px;
                }
                .get { background: #61affe; color: white; }
                .post { background: #49cc90; color: white; }
                code {
                    background: #272822;
                    color: #f8f8f2;
                    padding: 2px 5px;
                    border-radius: 3px;
                    font-family: monospace;
                }
                .quick-start {
                    background: #e8f5e9;
                    padding: 20px;
                    border-radius: 8px;
                    margin-bottom: 30px;
                }
                .auth-note {
                    background: #fff3e0;
                    padding: 15px;
                    border-radius: 8px;
                    margin: 20px 0;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>🥨 Welcome to XM Bakeries API</h1>
                
                <div class="quick-start">
                    <h2>🚀 Quick Start</h2>
                    <p>Base URL: <code>https://api.xmbakeries.com/api</code></p>
                    <p>All API requests must include the following headers:</p>
                    <code>
                        Authorization: Bearer YOUR_API_TOKEN<br>
                        Content-Type: application/json
                    </code>
                </div>

                <div class="auth-note">
                    <h3>🔐 Authentication</h3>
                    <p>Most endpoints require authentication using a JWT token. Obtain your token through the login endpoint.</p>
                </div>

                <div class="section">
                    <h2>👤 Authentication Endpoints</h2>
                    <div class="endpoint">
                        <span class="method post">POST</span>
                        <code>/auth/register</code>
                        <p>Register a new user account</p>
                    </div>
                    <div class="endpoint">
                        <span class="method post">POST</span>
                        <code>/auth/login</code>
                        <p>Login and receive authentication token</p>
                    </div>
                </div>

                <div class="section">
                    <h2>🥖 Products</h2>
                    <div class="endpoint">
                        <span class="method get">GET</span>
                        <code>/products</code>
                        <p>Get all products with optional filtering</p>
                    </div>
                    <div class="endpoint">
                        <span class="method post">POST</span>
                        <code>/products</code>
                        <p>Add a new product (Admin only)</p>
                    </div>
                </div>

                <div class="section">
                    <h2>📦 Orders</h2>
                    <div class="endpoint">
                        <span class="method post">POST</span>
                        <code>/orders</code>
                        <p>Place a new order</p>
                    </div>
                    <div class="endpoint">
                        <span class="method get">GET</span>
                        <code>/orders/:orderId</code>
                        <p>Track specific order status</p>
                    </div>
                </div>

                <div class="section">
                    <h2>📊 Inventory</h2>
                    <div class="endpoint">
                        <span class="method get">GET</span>
                        <code>/inventory/track</code>
                        <p>Track low inventory items</p>
                    </div>
                    <div class="endpoint">
                        <span class="method get">GET</span>
                        <code>/inventory/reports</code>
                        <p>Generate inventory reports</p>
                    </div>
                </div>

                <div class="section">
                    <h2>👥 Customers</h2>
                    <div class="endpoint">
                        <span class="method get">GET</span>
                        <code>/customers</code>
                        <p>Get all customers (Admin only)</p>
                    </div>
                    <div class="endpoint">
                        <span class="method post">POST</span>
                        <code>/customers</code>
                        <p>Add a new customer</p>
                    </div>
                </div>

                <div class="section">
                    <h2>📝 Rate Limits</h2>
                    <p>API calls are limited to:</p>
                    <ul>
                        <li>1000 requests per hour for authenticated users</li>
                        <li>100 requests per hour for unauthenticated users</li>
                    </ul>
                </div>

                <div class="section">
                    <h2>📚 Need Help?</h2>
                    <p>For detailed documentation and support:</p>
                    <ul>
                        <li>Email: api-support@xmbakeries.com</li>
                        <li>Documentation: <a href="https://docs.xmbakeries.com">https://docs.xmbakeries.com</a></li>
                        <li>Status Page: <a href="https://status.xmbakeries.com">https://status.xmbakeries.com</a></li>
                    </ul>
                </div>
            </div>
        </body>
        </html>
    `);
});  

// register user  
app.post('/api/auth/register', validateRequest(schemas.user),  async (req, res)=>{
    const {username, password, role} = req.body;
    try {
    let hashedPassword = await bcrypt.hash(password,10); 

    const sql = `INSERT INTO users(username, password, role)
     VALUES(?,?,?)`;
     connection.query(sql,[username, hashedPassword,role],(err)=>{
      
        res.status(201).json({message: 'User registered successfully'});
     })
    }catch(err){
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
    }


}); 

// login
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
  
      const token = jwt.sign({ userId: user.id },  process.env.JWT_SECRET, { expiresIn: '24h' });
      res.json({ token: token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  }); 

  //  create product
  app.post('/api/products', authenticateToken,  async (req, res)=>{
      const { name, price, category, quantity, description } = req.body; 
     const sql = `INSERT INTO products (name, price, category, quantity, description) VALUES (?, ?, ?, ?, ?)`;
 
     connection.query(sql,[name, price, category, quantity, description], (err)=>{
      
        if(err) throw err;
        res.status(201).json({message: 'Product created successfully'});
     })
  }); 

  // Get all products with filtering
app.get('/api/products', authenticateToken, (req, res) => {
    const { minPrice, maxPrice, category, minQuantity } = req.query;
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
    if (minQuantity) {
        sql += ' AND quantity >= ?';
        params.push(minQuantity);
    }

    connection.query(sql, params, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error fetching products' });
        }
        res.json(results);
    });
});

// Get single product
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





const port = process.env.PORT || 3001; 
app.listen(port, ()=>{
    console.log(`server listening on port ${port}`);
    
}); 
