import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane } from '@fortawesome/free-solid-svg-icons';
import './LandingPage.css';

function TourSelection() {
  const navigate = useNavigate();
  const [hoverIndex, setHoverIndex] = React.useState(null); // State to track hover
  const [loading, setLoading] = useState(false); 

  const destinations = [
    { name: "Indonesia", image: "https://plus.unsplash.com/premium_photo-1677829177642-30def98b0963?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aW5kb25lc2lhfGVufDB8fDB8fHww", path: "/TourDetails" },
    { name: "Switzerland", image: "https://www.planetware.com/photos-large/CH/switzerland-matterhorn.jpg", path: "/TourDetails" },
    { name: "Iceland", image: "https://plus.unsplash.com/premium_photo-1674086970773-726e445f5802?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aWNlbGFuZHxlbnwwfHwwfHx8MA%3D%3D", path: "/TourDetails" },
    { name: "New Zealand", image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80", path: "/TourDetails" },
    { name: "Norway", image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80", path: "/TourDetails" },
    { name: "Italy", image: "https://images.unsplash.com/photo-1529260830199-42c24126f198?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80", path: "/TourDetails" },
    { name: "Japan", image: "https://plus.unsplash.com/premium_photo-1661878091370-4ccb8763756a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bW91bnQlMjBmdWppfGVufDB8fDB8fHww", path: "/TourDetails" },
    { name: "Vietnam", image: "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", path: "/TourDetails" },
    { name: "Thailand", image: "https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80", path: "/TourDetails" },
    { name: "Dubai", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80", path: "/TourDetails" }
  ];

  const styles = {
    page: {
      fontFamily: '"Comic Sans MS", cursive, sans-serif', // Updated to cursive font
      color: '#333',
      backgroundImage: 'url("https://images.unsplash.com/photo-1508615039623-a25605d2b022?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")', // Global background for the page
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh',
      overflow: 'auto'
    },
    header: {
      background: 'linear-gradient(135deg, rgba(195, 74, 74, 0.701), rgba(52, 147, 166, 0.652))',
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'fixed',
      width: '100%',
      top: 0,
      zIndex: 1000,
    },
    logo: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#fff',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1rem',
      padding: '2rem',
      marginTop: '60px',
    },
    card: {
      background: '#fff',
      border: '1px solid #ddd',
      borderRadius: '8px',
      overflow: 'hidden',
      cursor: 'pointer',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      transform: 'scale(1)', // Normal scale
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' // Normal shadow
    },
    cardHover: {
      transform: 'scale(1.05)', // Scale up on hover
      boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)' // Enhanced shadow on hover
    },
    image: {
      height: '200px',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    button: {
      background: '#4CAF50',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      width: '100%',
      display: 'block',
      textAlign: 'center',
      fontSize: '1rem',
      fontFamily: '"Comic Sans MS", cursive, sans-serif',
    },
    text: {
      padding: '10px',
      textAlign: 'center', // Centers text in the card
      fontSize: '1.2rem',
    },
    title: {
      textAlign: 'center',
      color: '#fff',
      padding: '20px',
      fontSize: '2.3rem',
      fontWeight: 'bold',
      marginTop: '80px',
      marginBottom: '-80px',
      //color: '#fff', // White color for better visibility on blurred background
      textShadow: '0px 0px 8px rgba(0, 0, 0, 0.85)' // Text shadow for better legibility
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
  };

  const handleNavigate = (destination) => {
    setLoading(true); // Start loading
    if (destination.name === "Switzerland") {
      localStorage.setItem('selectedPackage', 'Switzerland');
      setTimeout(() => {
        setLoading(false); // Stop loading
        navigate(destination.path); 
      }, 2000); // 2-second delay
      
    } else {
      setTimeout(() => {
        setLoading(false); // Stop loading
        alert("Tour currently unavailable for " + destination.name);
      }, 2000); // 2-second delay
    }
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
      <div style={styles.title}>Choose Your Destination</div>
      <div style={styles.grid}>
        {destinations.map((dest, index) => (
           <div
           key={index}
           style={{
             ...styles.card,
             ...(index === hoverIndex ? styles.cardHover : null) // Apply hover styles conditionally
           }}
           onMouseEnter={() => setHoverIndex(index)}
           onMouseLeave={() => setHoverIndex(null)}
           onClick={() => handleNavigate(dest)}
         >
           <div style={{ ...styles.image, backgroundImage: `url(${dest.image})` }}></div>
           <h3 style={styles.text}>{dest.name}</h3>
         </div>
        ))}
      </div>
      
    </div>
  );
}

export default TourSelection;
