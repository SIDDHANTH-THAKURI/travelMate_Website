const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'siddhanth9999',
    database: 'tour_bookings'
});
console.log(db);
db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('MySQL connected');
});

// API Endpoints
app.get('/', (req, res) => {
    res.send('Welcome to the Tourism API!');
});


// Book a tour
// Promisify db.query to use async/await
const util = require('util');
const query = util.promisify(db.query).bind(db);

// Book a tour using async/await
app.post('/api/bookTour', async (req, res) => {
    try {
        console.log("Received request to book a tour:", req.body);
        const { name, email, participants, selectedDestination, selectedDate } = req.body;

        // Ensure all required fields are provided
        if (!name || !email || !participants || !selectedDestination || !selectedDate) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const bookingQuery = 'INSERT INTO bookings (name, email, participants, destination, date) VALUES (?, ?, ?, ?, ?)';

        // Use the promisified query to insert data into the bookings table
        await query(bookingQuery, [name, email, participants, selectedDestination, selectedDate]);

        // If successful, send a success message
        res.json({ message: `Tour booked successfully for ${name}` });
    } catch (err) {
        // Catch any errors and return a 500 status with the error message
        console.error('Error booking tour:', err);
        res.status(500).json({ error: err.message });
    }
});

// Reservation endpoint
app.post('/api/reserveTicket', async (req, res) => {
    try {
        console.log("Received request to reserve ticket:", req.body);
        const { name, email, event, number_of_tickets, seat_type, reservation_date } = req.body;

        // Ensure all required fields are provided
        if (!name || !email || !event || !number_of_tickets || !seat_type || !reservation_date) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const reservationQuery = `
            INSERT INTO reservations (name, email, event, number_of_tickets, seat_type, reservation_date) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        // Use the promisified query to insert data into the reservations table
        await query(reservationQuery, [name, email, event, number_of_tickets, seat_type, reservation_date]);

        // If successful, send a success message
        res.json({ message: `Reservation made successfully for ${name}` });
    } catch (err) {
        // Catch any errors and return a 500 status with the error message
        console.error('Error reserving ticket:', err);
        res.status(500).json({ error: err.message });
    }
});

// Get all reservations
app.get('/api/getReservations', async (req, res) => {
    try {
        const getReservationsQuery = 'SELECT * FROM reservations';
        const reservations = await query(getReservationsQuery);
        res.json(reservations);
    } catch (err) {
        console.error('Error fetching reservations:', err);
        res.status(500).json({ error: err.message });
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
