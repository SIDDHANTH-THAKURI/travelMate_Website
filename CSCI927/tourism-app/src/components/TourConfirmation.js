import React, { useState, useEffect } from 'react';
import './TourConfirmation.css'; // Make sure to import the CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane } from '@fortawesome/free-solid-svg-icons';
import './LandingPage.css';

function TourConfirmation() {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  function DateFormater(date){
    const startDate = new Date(date);
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];
    const trimmedDate = `${startDate.getDate()}  ${monthNames[startDate.getMonth()]}  ${startDate.getFullYear()}`;
    return trimmedDate;
    }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const email = localStorage.getItem('userEmail'); 
        const response = await fetch(`http://localhost:5000/TourConfirmation/${email}`);
        if (!response.ok) {
          throw new Error('Failed to fetch details');
        }
        const data = await response.json();
        setDetails(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="app-container">
      <header className="header">
        <a href="/" className="logo-link">
          <div className="logo"><FontAwesomeIcon icon={faPlane} /> TravelMate</div>
        </a>
      </header>
      <br/>
      <div className="confirmation-section">
        <h1>Thank You for Your Booking!</h1>
        {details && (
          <div>
            <p className="detail-item"><strong>Email:</strong> {details.email}</p>
            <p className="detail-item"><strong>Name:</strong> {details.name}</p>
            <p className="detail-item"><strong>Contact:</strong> {details.contact}</p>
            <p className="detail-item"><strong>Package Selected:</strong> {details.package_selected}</p>
            <p className="detail-item"><strong>Number of People:</strong> {details.number_of_people}</p>
            <p className="detail-item"><strong>Journey Start Date:</strong> {DateFormater(details.start_date)}</p>
            <p className="detail-item"><strong>Total Cost:</strong> ${details.total_cost}</p>
            <p className="detail-item"><strong>Payment Status:</strong> {details.payment_status}</p>
            <p className="detail-item"><strong>Reference Number:</strong> {details.reference_number}</p>
          </div>
        )}
        <p>Prepare for an adventure! We'll reach out to you shortly with details about your trip.</p>
        <div><br/><br/><a href="#" className="print-button" disabled={!details} onClick={handlePrint}>Print</a></div>
      </div><br/>
      
      <footer className="footer">
      <div><a href="/" className="return-button">Return to Home</a></div>
        <div className="contact-info">
          <p>If you have any questions, please contact us:</p>
          <p>📞 XXXXXXXXXX</p>
          <p>📧 XYZ@travelmate.com</p>
        </div>
      </footer>
    </div>
  );
}

export default TourConfirmation;
