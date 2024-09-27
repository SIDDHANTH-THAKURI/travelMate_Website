import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane, faBed, faCar } from '@fortawesome/free-solid-svg-icons';

function LandingPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(path);
    }, 2000); // Simulate loading for 2 seconds
  };

  return (
    <div className="landing-page">
      <header className="header">
        <a href="/" className="logo-link">
          <div className="logo"><FontAwesomeIcon icon={faPlane} /> TravelMate</div>
        </a>
      </header>

      <section className="hero">
        <div className="hero-content">
          <h1>Explore the World with Us</h1>
          <p>Your adventure starts here. Book tours, secure accommodations, and explore local attractions.</p>
          <div className="cta-buttons">
            <button onClick={() => handleNavigation('/TourSelection')} className="btn btn-tour"><FontAwesomeIcon icon={faPlane} /> Book a Tour</button>
            <button onClick={() => handleNavigation('/RoomBooking')} className="btn btn-room"><FontAwesomeIcon icon={faBed} /> Book a Room</button>
            <button onClick={() => handleNavigation('/RideBooking')} className="btn btn-ride"><FontAwesomeIcon icon={faCar} /> Book a Ride</button>
          </div>
        </div>
      </section>
{/*       
      {loading && <div className="loading-overlay">Loading...</div>} */}
      {loading && (
        <div class="loading-overlay">
          <img src="https://cdn.pixabay.com/animation/2023/10/08/03/19/03-19-26-213_512.gif" alt="Loading..." style={{ width: '100px' }} />
        </div>
      )}
    </div>
  );
}

export default LandingPage;
