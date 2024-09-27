import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/signup', {
        username,
        email,
        password
      });
      localStorage.setItem('userEmail', email);
      setTimeout(() => {
        setLoading(false); // Stop loading
        navigate('/landing'); // Redirect if login is successful
      }, 2000); // 2-second delay
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setTimeout(() => {
          setLoading(false); // Stop loading
          alert('Email already exists. Please login.');
        }, 2000);
      } else {
        setTimeout(() => {
          setLoading(false); // Stop loading
          alert('An error occurred. Please try again later.');
        }, 2000);
      }
    }
  };

  const style = {
    container: {
      fontFamily: '"Comic Sans MS", cursive, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundImage: 'url(https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      textAlign: 'center',
      color: 'black'
    },
    form: {
      background: 'rgba(255, 255, 255, 0.9)',
      padding: '40px',
      borderRadius: '15px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      width: '90%',
      maxWidth: '400px',
      zIndex: loading ? -1 : 2, // Change zIndex based on loading state
      opacity: loading ? 0.5 : 1, // Reduce opacity when loading
    },
    input: {
      padding: '12px 20px',
      margin: '8px 0',
      width: '100%',
      borderRadius: '5px',
      border: '1px solid #ccc'
    },
    button: {
      backgroundColor: '#007BFF',
      color: 'white',
      padding: '12px 20px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      width: '100%',
      fontSize: '16px',
      marginTop: '20px'
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

  return (
    <div style={style.container}>
      {loading && (
        <div style={style.loadingOverlay}>
          <img src="https://cdn.pixabay.com/animation/2023/10/08/03/19/03-19-26-213_512.gif" alt="Loading..." style={{ width: '100px' }} />
        </div>
      )}
      <div style={style.form}>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input style={style.input} type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username" required />
          <input style={style.input} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />
          <input style={style.input} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required />
          <button style={style.button} type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
