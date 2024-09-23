import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import TourBooking from './components/TourBooking'; // Create these components later
import TicketReservation from './components/TicketReservation';
import RideBooking from './components/RideBooking';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/tour-booking" element={<TourBooking />} />
        <Route path="/ticket-reservation" element={<TicketReservation />} />
        <Route path="/ride-booking" element={<RideBooking />} />
      </Routes>
    </Router>
  );
}

export default App;
