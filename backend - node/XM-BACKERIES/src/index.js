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
const schemas ={
user: joi.object({
    username: joi.string().min(3).required(),
    password: joi.string().min(6).required(),
    role: joi.string().valid('admin','staff','customer').required()
})
}
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





const port = process.env.PORT || 3001; 
app.listen(port, ()=>{
    console.log(`server listening on port ${port}`);
    
}); 
