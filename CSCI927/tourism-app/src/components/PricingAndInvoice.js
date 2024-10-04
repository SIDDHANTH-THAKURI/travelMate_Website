import React, { useState } from 'react';
import './RoomBooking.css';  // Reusing the existing styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane } from '@fortawesome/free-solid-svg-icons';
import './LandingPage.css';

function PricingAndInvoice() {
    const [invoiceGenerated, setInvoiceGenerated] = useState(false);
    const userEmailId = localStorage.getItem('userEmail') || '';
    const bookingDetails = {
        email: userEmailId,
        place: "Mountain Lodge",
        roomType: "Suite",
        date: localStorage.getItem('bookingDate') || 'No date selected',
        price: 250, 
        taxRate: 0.12,  // 12% tax
        serviceCharge: 15  // $15 service charge per night
    };

    const totalCost = bookingDetails.price + (bookingDetails.price * bookingDetails.taxRate) + bookingDetails.serviceCharge;

    const handleGenerateInvoice = () => {
        setInvoiceGenerated(true);
    };

    const handleDownloadInvoice = () => {
        const invoiceContent = `
        Invoice
        Place: ${bookingDetails.place}
        Room Type: ${bookingDetails.roomType}
        Date: ${bookingDetails.date}
        Base Price per Night: $${bookingDetails.price}
        Tax (12%): $${(bookingDetails.price * bookingDetails.taxRate).toFixed(2)}
        Service Charge: $${bookingDetails.serviceCharge}
        Total Cost: $${totalCost.toFixed(2)}
        `;

        const blob = new Blob([invoiceContent], { type: 'text/plain' });
        const href = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = href;
        link.download = "Invoice.txt";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleRequestBooking = () => {
        const Date = bookingDetails.date;
        const bookingData = {
            email: bookingDetails.email,
            place: bookingDetails.place,
            roomType: bookingDetails.roomType,
            date: Date,
            totalCost: totalCost
        };

        fetch('http://localhost:5000/api/bookings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookingData)
        })
        .then(response => response.json())
        .then(data => {
            alert("Thank you for booking. We will get in touch with you soon!");
            window.location.href = '/landing'; 
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Failed to book. Please try again.");
        });
    };

    const buttonStyle = {
        fontFamily: '"Comic Sans MS", cursive, sans-serif',
        backgroundColor: '#007bff',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        margin: '5px', // Adding margin for spacing between buttons
        fontWeight: 'bold',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
    };

    const styles = {
        page: {
            fontFamily: '"Comic Sans MS", cursive, sans-serif',
            color: '#333',
            backgroundImage: 'url("https://images.unsplash.com/photo-1444201983204-c43cbd584d93?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")', // Global background for the page
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100vh',
            overflow: 'auto'
        }
    }

    return (
        <div style={styles.page}>
            <header className="header">
                <a href="/" className="logo-link">
                <div className="logo"><FontAwesomeIcon icon={faPlane} /> TravelMate</div>
                </a>
            </header><br/><br/>
            <div className="room-booking-container">
                <h1>Pricing and Invoice</h1>
                <div className="form-section">
                    <p><strong>Place:</strong> {bookingDetails.place}</p>
                    <p><strong>Room Type:</strong> {bookingDetails.roomType}</p>
                    <p><strong>Date:</strong> {bookingDetails.date}</p>
                    <p><strong>Price per night:</strong> ${bookingDetails.price}</p>
                    <p><strong>Tax (12%):</strong> ${ (bookingDetails.price * bookingDetails.taxRate).toFixed(2) }</p>
                    <p><strong>Service Charge:</strong> ${bookingDetails.serviceCharge}</p>
                    {!invoiceGenerated ? (
                        <button style={buttonStyle} onClick={handleGenerateInvoice}>Generate Invoice</button>
                    ) : (
                        <div className="invoice">
                            <h2>Invoice Details</h2>
                            <p>Total Cost: ${totalCost.toFixed(2)}</p>
                            <button style={buttonStyle} onClick={handleDownloadInvoice}>Download Invoice</button>
                            <button style={buttonStyle} onClick={handleRequestBooking}>Request for Booking</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PricingAndInvoice;
