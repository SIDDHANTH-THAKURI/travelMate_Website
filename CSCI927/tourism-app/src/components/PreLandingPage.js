import React from 'react';
import { Link } from 'react-router-dom';

function PreLandingPage() {
  const style = {
    container: {
      fontFamily: '"Comic Sans MS", cursive, sans-serif',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundImage: 'url(https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      textAlign: 'center',
      color: 'white'
    },
    header: {
      marginBottom: '20px',
      fontSize: '2.5rem'
    },
    paragraph: {
      marginBottom: '30px',
      fontSize: '1.2rem'
    },
    buttonsContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: '20px'  // adds space between buttons
    },
    link: {
      padding: '10px 20px',
      backgroundColor: '#007BFF',
      color: 'white',
      textDecoration: 'none',
      borderRadius: '5px',
      fontWeight: 'bold'
    },
    secondLink: {
      padding: '10px 20px',
      backgroundColor: '#28A745',
      color: 'white',
      textDecoration: 'none',
      borderRadius: '5px',
      fontWeight: 'bold'
    }
  };

  return (
    <div style={style.container}>
      <h1 style={style.header}>Welcome to Our Travel Service</h1>
      <p style={style.paragraph}>Please log in or sign up to continue exploring the world with us.</p>
      <div style={style.buttonsContainer}>
        <Link to="/login" style={style.link}>Login</Link>
        <Link to="/signup" style={style.secondLink}>Sign Up</Link>
      </div>
    </div>
  );
}

export default PreLandingPage;
