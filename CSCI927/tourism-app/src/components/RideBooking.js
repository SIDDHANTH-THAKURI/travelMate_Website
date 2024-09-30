import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './RideBooking.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane } from '@fortawesome/free-solid-svg-icons';
import './LandingPage.css';

function RideBooking() {
  const navigate = useNavigate();
  const [pickupLocation, setPickupLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [driverInfo, setDriverInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [rideCost, setRideCost] = useState(null);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [showPrices, setShowPrices] = useState(false);

  const handleNext = () => {
      if (!pickupLocation || !destination || !dateTime) {
          alert('Please fill in all fields');
          return;
      }
      setLoading(true);
      setTimeout(() => {
          setLoading(false);
          alert('Driver available');
          setDriverInfo({
              name: 'John Doe',
              number: '123-456-7890',
              vehicleType: 'Sedan'
          });
      }, 5000);
  };

  const handleAccept = () => {
      const baseCost = Math.floor(Math.random() * (50 - 20 + 1) + 20);
      const serviceCharge = 5;
      const tax = baseCost * 0.1;
      const totalCost = baseCost + serviceCharge + tax;
      setRideCost({
          baseCost,
          serviceCharge,
          tax,
          totalCost
      });
      setShowPrices(true);
  };

  const style = {
    page: {
      fontFamily: '"Comic Sans MS", cursive, sans-serif', // Updated to cursive font
      color: '#333',
      backgroundImage: 'url("https://images.unsplash.com/photo-1508615039623-a25605d2b022?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")', // Global background for the page
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh',
      overflow: 'auto'
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
  }

  const handlePayment = async (e) => {
    e.preventDefault();
    const userEmail = localStorage.getItem('userEmail');
    const bookingData = {
        email: userEmail,
        pickup: pickupLocation,
        drop: destination,
        date: dateTime,
        totalCost: rideCost.totalCost
    };
    try {
      const response = await fetch('http://localhost:5000/storeRideDetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData)
      });
      if (response.ok) {
        alert('Payment has been made successfully.');
        setLoading2(true);
        setPaymentComplete(true);
        setTimeout(() => {
            setLoading2(false);
            navigate('/RideBookingConfirmation');
            }, 4000);
      } else {
        setLoading2(true);
        const errorData = await response.json();
        setPaymentComplete(true);
        setTimeout(() => {
            setLoading2(false);
            alert('Payment failed. Please try again. ' + errorData.message);
            }, 4000);
        
      }
    } catch (error) {
        setLoading2(true);
        console.error('Failed to process payment. Please try again.', error);
        setPaymentComplete(true);
        setTimeout(() => {
            setLoading2(false);
        alert('Failed to process payment. Please try again.');
            }, 4000);
      
    }
  };

  return (
    <div style={style.page}>
      <header className="header">
        <a href="/" className="logo-link">
          <div className="logo"><FontAwesomeIcon icon={faPlane} /> TravelMate</div>
        </a>
      </header>
      {loading && (
        <div style={style.loadingOverlay}>
          <h1 className = {styles.loadn}>Finding your Ride...</h1>
          <img src="https://cdn.pixabay.com/animation/2023/10/08/03/19/03-19-26-213_512.gif" alt="Loading..." style={{ width: '100px' }} />
        </div>
      )}
      {loading2 && (
        <div style={style.loadingOverlay}>
          <img src="https://cdn.pixabay.com/animation/2023/10/08/03/19/03-19-26-213_512.gif" alt="Loading..." style={{ width: '100px' }} />
        </div>
      )}
      <br/><br/>
      <div className={styles.container}>
          <h1 className={styles.title}>Book a Ride</h1>
          <div className={styles.form}>
              <p>Where do you want to travel?</p>
              <input
                  type="text"
                  placeholder="Pickup Location"
                  value={pickupLocation}
                  onChange={e => setPickupLocation(e.target.value)}
                  className={styles.input}
              />
              <input
                  type="text"
                  placeholder="Destination"
                  value={destination}
                  onChange={e => setDestination(e.target.value)}
                  className={styles.input}
              />
              <input
                  type="datetime-local"
                  value={dateTime}
                  onChange={e => setDateTime(e.target.value)}
                  className={styles.input}
              />
              <button onClick={handleNext} className={styles.button}>{'Next'}</button>
          </div>
          {driverInfo && !loading && (
              <div className={styles.details}>
                  <h2>Driver Details</h2>
                  <p className={styles.detail}>Name: {driverInfo.name}</p>
                  <p className={styles.detail}>Number: {driverInfo.number}</p>
                  <p className={styles.detail}>Vehicle Type: {driverInfo.vehicleType}</p>
                  <button onClick={handleAccept} className={styles.button}>Accept</button>
                  {showPrices && rideCost && (
                      <div>
                          <p className={styles.detail}>Base Fare: ${rideCost.baseCost.toFixed(2)}</p>
                          <p className={styles.detail}>Service Charge: ${rideCost.serviceCharge.toFixed(2)}</p>
                          <p className={styles.detail}>Tax: ${rideCost.tax.toFixed(2)}</p>
                          <p className={styles.detail}>Total Cost: ${rideCost.totalCost.toFixed(2)}</p>
                          <button onClick={handlePayment} className={styles.button}>Pay ${rideCost.totalCost.toFixed(2)}</button>
                      </div>
                  )}
              </div>
          )}
      </div>
    </div>
);
}

export default RideBooking;
