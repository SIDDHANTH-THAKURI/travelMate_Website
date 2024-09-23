import React, { useState } from 'react';
import './TourBooking.css';

const TourBooking = () => {
    const [destinations] = useState([
        'Sydney', 'Melbourne', 'Thailand', 'Japan', 
        'Switzerland', 'Maldives', 'Iceland', 
        'Germany', 'Spain', 'New Zealand'
    ]);
    const [selectedDestination, setSelectedDestination] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [participants, setParticipants] = useState(1);
    const [message, setMessage] = useState('');
    const [responseStatus, setResponseStatus] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const bookingData = { name, email, participants, selectedDestination, selectedDate };
        
        const response = await fetch('http://localhost:5000/api/bookTour', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookingData),
        });

        if (response.ok) {
            setMessage('Booking successful!');
            setResponseStatus('success');
            setName('');
            setEmail('');
            setParticipants(1);
            setSelectedDestination('');
            setSelectedDate('');
        } else {
            setMessage('Booking failed. Please try again.');
            setResponseStatus('error');
        }
    };

    return (
        <div className="tour-booking">
            <h2>Book a Tour</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Select Destination:
                    <select value={selectedDestination} onChange={(e) => setSelectedDestination(e.target.value)} required>
                        <option value="">Select a destination</option>
                        {destinations.map(destination => (
                            <option key={destination} value={destination}>{destination}</option>
                        ))}
                    </select>
                </label>

                <label>
                    Select Date:
                    <input 
                        type="date" 
                        value={selectedDate} 
                        onChange={(e) => setSelectedDate(e.target.value)} 
                        required 
                    />
                </label>

                <label>
                    Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </label>

                <label>
                    Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </label>

                <label>
                    Number of Participants:
                    <input type="number" value={participants} onChange={(e) => setParticipants(e.target.value)} min="1" required />
                </label>

                <button type="submit">Book Now</button>
            </form>

            {message && (
                <p className={responseStatus === 'success' ? "message success" : "message error"}>
                    {message}
                </p>
            )}
        </div>
    );
};

export default TourBooking;
