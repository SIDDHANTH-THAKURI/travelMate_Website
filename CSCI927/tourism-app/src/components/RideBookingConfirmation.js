import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './RideBookingConfirmation.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane } from '@fortawesome/free-solid-svg-icons';
import './LandingPage.css';

function RideBookingConfirmation() {
    const navigate = useNavigate();
    const [bookingDetails, setBookingDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const userEmail = localStorage.getItem('userEmail'); // Retrieve email from local storage

    useEffect(() => {
        async function fetchBookingDetails() {
            try {
                const response = await fetch(`http://localhost:5000/rideDetailsByEmail/${userEmail}`);
                if (!response.ok) throw new Error('Failed to fetch');
                const data = await response.json();
                setBookingDetails(data);
                setLoading(false);
            } catch (error) {
                console.error('Fetch error:', error);
                setLoading(false);
            }
        }
        fetchBookingDetails();
    }, [userEmail]); // Dependency on userEmail

    if (loading) return <p>Loading...</p>;

    const handleDownloadInvoice = () => {
        const invoiceData = `Ride Invoice\n\nPassenger Email: ${userEmail}\nPickup Location: ${bookingDetails.pickup_location}\nDestination: ${bookingDetails.drop_location}\nDate and Time: ${bookingDetails.datetime}\nDriver Name: John Doe\nDriver Mobile No.: 123-456-7890\nDriver Vehicle Type: Sedan\nAmount Paid: $${bookingDetails.total_cost}\n\nThank you for using our service. Have a safe journey!`;
        const blob = new Blob([invoiceData], { type: 'text/plain' });
        const href = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = href;
        link.download = "RideInvoice.txt";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleReturnHome = () => {
        navigate('/'); // Navigate to the home route
    };

    const style={
        page: {
            fontFamily: '"Comic Sans MS", cursive, sans-serif', // Updated to cursive font
            color: '#333',
            backgroundImage: 'url("https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1769&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")', // Global background for the page
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100vh',
            overflow: 'auto'
        },
    }
    return (
        <div className={styles.bgi}>
            <div className = {style.page}>
                <header className="header">
                    <a href="/" className="logo-link">
                    <div className="logo"><FontAwesomeIcon icon={faPlane} /> TravelMate</div>
                    </a>
                </header><br/><br/><br/><br/>
                <div className={styles.container}>
                    <h1 className={styles.title}><b>Ride Booking Confirmation</b></h1>
                    <p className={styles.detail}><b>Passenger Email:</b> {userEmail}</p>
                    <p className={styles.detail}><b>Pickup Location:</b> {bookingDetails.pickup_location}</p>
                    <p className={styles.detail}><b>Destination:</b> {bookingDetails.drop_location}</p>
                    <p className={styles.detail}><b>Date and Time:</b> {bookingDetails.datetime}</p>
                    <p className={styles.detail}><b>Driver Name:</b> John Doe</p>
                    <p className={styles.detail}><b>Driver Mobile No.:</b> 123-456-7890</p>
                    <p className={styles.detail}><b>Driver Vehicle Type:</b> Sedan</p>
                    <p className={styles.detail}><b>Amount Paid:</b> ${bookingDetails.total_cost}</p>
                    <p className={styles.detail}>Your receipt will be sent to your email after the completion of the ride. Have a safe journey!</p>
                    <button className={styles.button} onClick={handleDownloadInvoice}>Download Invoice</button>
                    <button className={styles.button} onClick={handleReturnHome}>Return to Home</button>
                </div>
            </div>
        </div>
    );
}

export default RideBookingConfirmation;
