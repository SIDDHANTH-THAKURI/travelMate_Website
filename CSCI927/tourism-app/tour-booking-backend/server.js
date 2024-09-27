require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
const port = process.env.PORT || 5000;

// Database connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});
db.connect(err => {
    if (err) throw err;
    console.log('Connected to database');
});

app.use(cors());
app.use(bodyParser.json());


// Signup endpoint
app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const [result] = await db.promise().query('SELECT email FROM users WHERE email = ?', [email]);
        if (result.length > 0) {
            res.status(409).send('Email already exists');
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            await db.promise().query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword]);
            res.status(201).send('User registered successfully');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Ensure this matches what you have in your server setup
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const [results] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);
        if (results.length > 0) {
            const user = results[0];
            const passwordMatch = await bcrypt.compare(password, user.password); // Ensure this is used
            if (passwordMatch) {
                res.json({ message: "Login successful", userId: user.id });
            } else {
                res.status(401).json({ message: "Invalid credentials" });
            }
        } else {
            res.status(404).json({ message: "User not found, Please Sign In" });
        }
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ message: "Server error" });
    }
});

const crypto = require('crypto'); // Node.js crypto module for generating random bytes

app.post('/payment', async (req, res) => {
    const { name, email, contact, startDate, packageSelected, paymentStatus, numberOfPeople, totalCost } = req.body;

    // Generate a unique reference number
    const referenceNumber = `REF-${new Date().getTime()}-${crypto.randomBytes(4).toString('hex')}`;

    try {
        const [user] = await db.promise().query('SELECT id FROM users WHERE email = ?', [email]);
        if (user.length > 0) {
            const userId = user[0].id;
            await db.promise().query(
                'INSERT INTO payments (user_id, email, name, contact, start_date, package_selected, number_of_people, total_cost, payment_status, reference_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [userId, email, name, contact, startDate, packageSelected, numberOfPeople, totalCost, paymentStatus, referenceNumber]
            );

            res.status(200).send('Booking confirmed successfully');
        } else {
            res.status(404).send('User not found');
        }
    } catch (err) {
        console.error('Error during payment processing:', err);
        res.status(500).send('Server error');
    }
});



app.get('/TourConfirmation/:email', async (req, res) => {
    const { email } = req.params;
    try {
        const query = `
            SELECT email, name, contact, package_selected, number_of_people, total_cost, payment_status, start_date, reference_number
            FROM payments
            WHERE email = ?
        `;
        const [results] = await db.promise().query(query, [email]);
        if (results.length > 0) {
            res.json(results[0]); 
        } else {
            res.status(404).send('Payment details not found');
        }
    } catch (err) {
        console.error('Error fetching payment details:', err);
        res.status(500).send('Server error');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
