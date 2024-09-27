import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import all necessary components
import PreLandingPage from './components/PreLandingPage';
import LandingPage from './components/LandingPage';
import TourSelection from './components/TourSelection'; 
import RideBooking from './components/RideBooking';
import RoomBooking from './components/RoomBooking';
import Signup from './components/Signup'; 
import Login from './components/Login'; 
import TourDetails from './components/TourDetails';
import Payment from './components/Payment';
import TourConfirmation from './components/TourConfirmation';

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes for Signup and Login */}
        <Route path="/" element={<PreLandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/TourSelection" element={<TourSelection />} />
        <Route path="/RoomBooking" element={<RoomBooking/>} />
        <Route path="/RideBooking" element={<RideBooking/>} />
        
        <Route path="/TourDetails" element={<TourDetails />} />
        <Route path="/Payment" element={<Payment/>} />
        <Route path="/TourConfirmation" element={<TourConfirmation/>} />
      </Routes>
    </Router>
  );
}

export default App;
