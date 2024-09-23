import React from 'react';
import './LandingPage.css'; // Import the CSS

function LandingPage() {
  return (
    <div className="landing-page">
      <header className="header">
        <div className="logo">TravelMate</div>
        <nav>
          <ul className="nav-links">
            <li><a href="/">Home</a></li>
            <li><a href="/tour-booking">Tours</a></li>
            <li><a href="/ticket-reservation">Tickets</a></li>
            <li><a href="/ride-booking">Rides</a></li>
          </ul>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-content">
          <h1>Explore the World with Us</h1>
          <p>Your adventure starts here. Book tours, reserve tickets, and explore local attractions.</p>
          <div className="cta-buttons">
            <a href="/tour-booking" className="btn-primary">Book a Tour</a>
            <a href="/ticket-reservation" className="btn-secondary">Reserve Tickets</a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
