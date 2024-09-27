import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Start loading
    try {
      const bookingData = { email, password };
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });
      const data = await response.json(); // Parsing the JSON response
      if (response.ok) {
        localStorage.setItem('userEmail', email);
        setTimeout(() => {
          setLoading(false); // Stop loading
          navigate('/landing'); // Redirect if login is successful
        }, 2000); // 2-second delay
      } else {
        setTimeout(() => {
          setLoading(false); // Stop loading
          alert(data.message); // Display specific error message after 2 seconds
        }, 2000);
      }
    } catch (error) {
      setTimeout(() => {
        setLoading(false); // Stop loading
        console.error('Error:', error);
        alert('Login failed. Please try again later.'); // Fallback error message
      }, 2000);
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
      color: 'black',
      position: 'relative',
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
      backgroundColor: '#28A745',
      color: 'white',
      padding: '12px 20px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      width: '100%',
      fontSize: '16px',
      marginTop: '20px',
      fontFamily: '"Comic Sans MS", cursive, sans-serif',
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
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            style={style.input}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
          <input
            style={style.input}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
          <button style={style.button} type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
