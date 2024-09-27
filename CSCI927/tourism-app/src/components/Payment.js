import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Payment.css'; // Import the CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane } from '@fortawesome/free-solid-svg-icons';
import './LandingPage.css';

function Payment() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); 
  const [formData, setFormData] = useState({
    name: '',
    email: localStorage.getItem('userEmail') || '',
    contact: '',
    numberOfPeople: 1,
    totalCost: 2500.00,
    startDate: ''
  });

  const [isHovered, setIsHovered] = useState(false); // Adding state to handle hover

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "numberOfPeople") {
      const totalCost = Math.min(value, 10) * 2500;
      setFormData({ ...formData, numberOfPeople: value, totalCost });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  
  const [paymentProcessed, setPaymentProcessed] = useState(false); // Track if payment was processed

  const handlePayment = () => {
    if (!formData.name || !formData.contact || !formData.email || formData.numberOfPeople <= 0|| !formData.startDate) {
      alert('Please fill in all fields to proceed with the payment.');
      return;
    }
    setPaymentProcessed(true);
    alert('Payment processed successfully. Please confirm your booking.');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          packageSelected: localStorage.getItem('selectedPackage'),
          paymentStatus:  paymentProcessed? 'Paid':'Not Paid'
        })
      });
      if (response.ok) {
        setPaymentProcessed(true);
        setTimeout(() => {
            setLoading(false);
            navigate('/TourConfirmation');
            }, 4000);
      } else {
        const errorData = await response.json();
        setPaymentProcessed(true);
        setTimeout(() => {
            setLoading(false);
            alert('Payment failed. Please try again. ' + errorData.message);
            }, 4000);
        
      }
    } catch (error) {
        console.error('Payment submission error:', error);
            setPaymentProcessed(true);
        setTimeout(() => {
            setLoading(false);
        alert('Error processing payment.');
            }, 4000);
      
    }
  };


  const styles = {
    contentAlignment: {
      textAlign: 'center',  
    },
    button: {
        display: 'block',
        width: '56%',
        padding: '15px',
        backgroundColor: 'rgb(53 236 168)',
        backgroundImage: 'linear-gradient(to right, rgb(51 76 255), rgb(255 45 45))',
        color: 'white',
        fontWeight: 'bold',
        textShadow: '1px 1px 2px black',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        fontSize: '1.2rem',
        textAlign: 'center',
        margin: '20px auto',
        boxShadow: '0 3px 6px rgba(0,0,0,0.16)',
        transition: 'all 0.3s ease',
        transform: 'translateY(0px)', // Initialize transform
      },
      loadingOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '24px',
        color: '#000',
        zIndex: 1, // Ensure this is above all when loading
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Slight darkening
      },
      payButton:{
        backgroundColor: '#07e0d7',
        color: 'black'
      }
  };
  const hoverStyle = {
    ...styles.button,
    boxShadow: '0 5px 15px rgba(0,0,0,0.24)',
    backgroundImage: 'linear-gradient(to right, rgb(96 115 255), rgb(255 97 97))',
    transform: 'translateY(-2px)'
  };

  return (
    <div className="app-container">
        <header className="header">
            <a href="/" className="logo-link">
            <div className="logo"><FontAwesomeIcon icon={faPlane} /> TravelMate</div>
            </a>
        </header>
        {loading && (
        <div style={styles.loadingOverlay}>
          <img src="https://cdn.pixabay.com/animation/2023/10/08/03/19/03-19-26-213_512.gif" alt="Loading..." style={{ width: '100px' }} />
        </div>
      )}
        <div className="payment-container">
        <form onSubmit={handleSubmit} className="payment-form">
            <h1 style={styles.contentAlignment}>Payment Details</h1>
            <label>Name: &nbsp; 
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required />
            </label>
            <label>Email: &nbsp;
                <input type="email" name="email" value={formData.email} readOnly />
            </label>
            
            <label>Mobile: &nbsp;
                <input type="text" name="contact" value={formData.contact} onChange={handleChange} placeholder="Your Contact Number" required />
            </label>
            
            <label>Start Date: &nbsp;
                <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />
            </label>
            <label>Number of Guests: &nbsp;
                <select name="numberOfPeople" value={formData.numberOfPeople} onChange={handleChange}>
                {[...Array(10)].map((_, index) => (
                    <option key={index} value={index + 1}>{index + 1}</option>
                ))}
                </select>
            </label>
            <p>Total Cost: ${formData.totalCost.toFixed(2)} <button style={styles.payButton} type="button" onClick={handlePayment} disabled={paymentProcessed}>
            Pay
          </button></p> 
            <button type="submit" style={isHovered ? hoverStyle : styles.button} onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}>Confirm Payment</button>
        </form>
        </div>
    </div>
  );
}

export default Payment;
