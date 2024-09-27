import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane } from '@fortawesome/free-solid-svg-icons';
import './LandingPage.css';

function TourDetails() {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false); // Adding state to handle hover
  const [loading, setLoading] = useState(false); 

  const handleBooking = () => {
    setLoading(true); // Start loading

    setTimeout(() => {
        setLoading(false); // Stop loading
        navigate('/Payment'); // Redirect if login is successful
      }, 2000); // 2-second delay
    
  };

  const styles = {
    page: {
      fontFamily: '"Comic Sans MS", cursive, sans-serif',
      color: '#333',
      backgroundImage: 'url("https://images.unsplash.com/photo-1504218727796-db522606b16f?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh',
      overflow: 'auto',
      textAlign: 'center',
    },
    hero: {
      height: '50vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      color: '#fff',
      borderRadius: '10px',
      textShadow: '1px 1px 8px rgba(0, 0, 0, 0.7)',
    },
    title: {
      fontSize: '2.5rem',
      margin: '0.5rem',
    },
    content: {
      backgroundColor: 'rgba(255, 255, 255, 0.85)',
      padding: '20px',
      borderRadius: '15px',
      margin: '20px auto',
      textAlign: 'left',
      maxWidth: '800px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.15)', // Subtle shadow for depth
    },
    itineraryItem: {
      background: '#f8f9fa',
      padding: '15px',
      margin: '10px 0',
      borderRadius: '10px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    },
    button: {
        display: 'block',
        width: '54%',
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
    gallery: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '10px',
      marginTop: '20px'
    },
    image: {
      width: '100%',
      height: '200px',
      objectFit: 'cover'
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
    }
  };

  const hoverStyle = {
    ...styles.button,
    boxShadow: '0 5px 15px rgba(0,0,0,0.24)',
    backgroundImage: 'linear-gradient(to right, rgb(96 115 255), rgb(255 97 97))',
    transform: 'translateY(-2px)'
  };

  return (
    <div style={styles.page}>
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
      <div style={styles.hero}>
        <h1 style={styles.title}>Discover Switzerland</h1>
        <p>Experience the majesty of the Swiss Alps and vibrant city life.</p>
      </div>
      <div style={styles.content}>
        <h2>Itinerary</h2>
        {['Arrival in Zurich, visit to the old town', 'Day trip to Lucerne, cruise on Lake Lucerne', 'Explore Interlaken and the Jungfrau region', 'Departure'].map((item, index) => (
          <div style={styles.itineraryItem} key={index}>
            <p>Day {index + 1}: {item}</p>
          </div>
        ))}
      </div>
      <div style={styles.content}>
        <h2>What's Included</h2>
        {['All accommodation in 4-star hotels.', 'Guided tours of each city.', 'All transport between destinations.', 'Daily breakfast.'].map((item, index) => (
          <div style={styles.itineraryItem} key={index}>
            <p>{item}</p>
          </div>
        ))}
      </div>
      <div style={styles.content}>
        <h2>Package Price</h2>
        <p>
            The total price for this exclusive tour package is <strong>$2,500</strong> per person.
        </p>
        <p>This price includes all accommodations, guided tours, transport, and meals as described in the itinerary and included features.</p>
      </div>

      <div style={styles.content}>
        <h2>Gallery</h2>
        <div style={styles.gallery}>
          <img style={styles.image} src="https://images.unsplash.com/photo-1527668752968-14dc70a27c95?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90oy1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Swiss Alps" />
          <img style={styles.image} src="https://images.unsplash.com/photo-1635855296516-837d8b00cae7?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90oy1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Lucerne" />
          <img style={styles.image} src="https://plus.unsplash.com/premium_photo-1674680852778-c59c7fd89985?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90oy1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Zurich" />
        </div>
      </div>
      <button style={isHovered ? hoverStyle : styles.button} onClick={handleBooking} onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}>Book This Tour</button>
    </div>
  );
}

export default TourDetails;
