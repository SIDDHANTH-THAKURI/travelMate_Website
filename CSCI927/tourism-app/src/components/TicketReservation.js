import React, { useState } from 'react';
import './TicketReservation.css'; // Optional: For styling if you want

const TicketReservation = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [event, setEvent] = useState('');
    const [ticketCount, setTicketCount] = useState(1);
    const [reservationDate, setReservationDate] = useState('');
    const [message, setMessage] = useState('');
    const [responseStatus, setResponseStatus] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const reservationData = { name, email, event, ticketCount, reservationDate };

        const response = await fetch('http://localhost:5000/api/reserveTicket', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reservationData),
        });

        if (response.ok) {
            setMessage('Reservation successful!');
            setResponseStatus('success');
            setName('');
            setEmail('');
            setEvent('');
            setTicketCount(1);
            setReservationDate('');
        } else {
            setMessage('Reservation failed. Please try again.');
            setResponseStatus('error');
        }
    };

    return (
        <div className="ticket-reservation">
            <h2>Reserve Tickets</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </label>

                <label>
                    Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </label>

                <label>
                    Event:
                    <input type="text" value={event} onChange={(e) => setEvent(e.target.value)} required />
                </label>

                <label>
                    Number of Tickets:
                    <input type="number" value={ticketCount} onChange={(e) => setTicketCount(e.target.value)} min="1" required />
                </label>

                <label>
                    Reservation Date:
                    <input 
                        type="date" 
                        value={reservationDate} 
                        onChange={(e) => setReservationDate(e.target.value)} 
                        required 
                    />
                </label>

                <button type="submit">Reserve Now</button>
            </form>

            {message && (
                <p className={responseStatus === 'success' ? "message success" : "message error"}>
                    {message}
                </p>
            )}
        </div>
    );
};

export default TicketReservation;
