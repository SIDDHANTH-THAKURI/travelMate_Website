import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { useNavigate } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import './RoomBooking.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane } from '@fortawesome/free-solid-svg-icons';
import './LandingPage.css';

function RoomBooking() {
    const navigate = useNavigate();
    const places = [
        { id: 1, name: "Beach Resort", rooms: ["Single", "Double", "Suite"] },
        { id: 2, name: "Mountain Lodge", rooms: ["Cabin", "Double", "Suite"] },
        { id: 3, name: "City Hotel", rooms: ["Single", "Double", "Penthouse"] }
    ];
    const Actualplace = [
        { id: 2, name: "Mountain Lodge", rooms: ["Cabin", "Double", "Suite"] }
    ];

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedPlace, setSelectedPlace] = useState('');
    const [availableRooms, setAvailableRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState('');
    const [bookingAvailable, setBookingAvailable] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isHovered2, setIsHovered2] = useState(false);
    const [isHovered3, setIsHovered3] = useState(false);

    const checkAvailability = () => {
        if (selectedPlace === "") {
            alert('Please select a place!');
        } else {
            const place = Actualplace.find(p => p.name === selectedPlace);
            if (place) {
                setAvailableRooms(place.rooms);
                setBookingAvailable(false); // Reset booking availability upon new search
            } else {
                alert("Sorry, Place Unavailable!");
            }
        }
    };

    const requestBooking = () => {
        if (selectedRoom === "") {
            alert("Please select a Room!");
        } else if (selectedRoom === 'Suite') {
            setBookingAvailable(true); 
        } else {
            alert("Selected room unavailable!");
        }
    };

    function formatDate(date) {
        const d = new Date(date);
        const day = d.getDate().toString().padStart(2, '0');  // Ensures the day is two digits
        const monthNames = ["January", "February", "March", "April", "May", "June",
                            "July", "August", "September", "October", "November", "December"];
        const month = monthNames[d.getMonth()];  // Gets the month name
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;  // Formats the date in DD/month/YYYY
    }

    const goToCheckout = () => {
        localStorage.setItem('bookingDate', formatDate(selectedDate));
        navigate('/PricingAndInvoice')
    };

    const styles = {
        page: {
            fontFamily: '"Comic Sans MS", cursive, sans-serif',
            color: '#333',
            backgroundImage: 'url("https://images.unsplash.com/photo-1444201983204-c43cbd584d93?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")', // Global background for the page
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100vh',
            overflow: 'auto'
        },
        checkoutbutton: {
            fontFamily: '"Comic Sans MS", cursive, sans-serif',
            display: 'block',
            width: '46%',
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
            transform: 'translateY(0px)', 
          },
        bookingbutton:{
            fontFamily: '"Comic Sans MS", cursive, sans-serif',
            display: 'block',
            width: '36%',
            padding: '15px',
            backgroundColor: 'rgb(53 236 168)',
            backgroundImage: 'linear-gradient(to right, rgb(133 237 142), rgb(5 31 255))',
            color: 'white',
            fontWeight: 'bold',
            textShadow: '1px 1px 2px black',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            fontSize: '1rem',
            textAlign: 'center',
            margin: '20px auto',
            boxShadow: '0 3px 6px rgba(0,0,0,0.16)',
            transition: 'all 0.3s ease',
            transform: 'translateY(1px)', 
        },
        availabilitybutton:{
            fontFamily: '"Comic Sans MS", cursive, sans-serif',
            display: 'block',
            width: '66%',
            padding: '15px',
            backgroundColor: 'rgb(53 236 168)',
            backgroundImage: 'linear-gradient(to right, rgb(250 104 104), rgb(136 255 5))',
            color: 'white',
            fontWeight: 'bold',
            textShadow: '1px 1px 2px black',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            fontSize: '1rem',
            textAlign: 'center',
            margin: '20px auto',
            boxShadow: '0 3px 6px rgba(0,0,0,0.16)',
            transition: 'all 0.3s ease',
            transform: 'translateY(1px)', 
        }
      };
      const hoverStyleCheckout = {
        ...styles.checkoutbutton,
        boxShadow: '0 5px 15px rgba(0,0,0,0.24)',
        backgroundImage: 'linear-gradient(to right, rgb(96 115 255), rgb(255 97 97))',
        transform: 'translateY(-2px)'
      };
      const hoverStylebooking = {
        ...styles.bookingbutton,
        boxShadow: '0 5px 15px rgba(0,0,0,0.24)',
        backgroundImage: 'linear-gradient(to right, rgb(133 237 192), rgb(5 71 255))',
        transform: 'translateY(-2px)'
      };
      const hoverStyleavailability = {
        ...styles.availabilitybutton,
        boxShadow: '0 5px 15px rgba(0,0,0,0.24)',
        backgroundImage: 'linear-gradient(to right, rgb(220 104 104), rgb(106 255 5))',
        transform: 'translateY(-2px)'
      };

    return (
        <div style={styles.page}>
            <header className="header">
                <a href="/" className="logo-link">
                <div className="logo"><FontAwesomeIcon icon={faPlane} /> TravelMate</div>
                </a>
            </header><br/><br/>
            <div className="room-booking-container">
            <h1 style={{
                fontSize: '2.5rem',                 
                textAlign: 'center',                
                color: 'rgb(255 255 0)',                   
                textShadow: '1px 1px 2px #00000088', 
                marginBottom: '20px',               
                fontFamily: '"Comic Sans MS", cursive, sans-serif',    
                fontWeight: 'bold'                  
            }}>Room Booking</h1>
                <div className="form-section">
                    <label>Choose a place:
                        <select value={selectedPlace} onChange={e => setSelectedPlace(e.target.value)}>
                            <option value="">Select a Place</option>
                            {places.map(place => (
                                <option key={place.id} value={place.name}>{place.name}</option>
                            ))}
                        </select>
                    </label>
                    <label>Date:
                        <DatePicker selected={selectedDate} onChange={date => setSelectedDate(date)} />
                    </label>
                    <button style={isHovered3 ? hoverStyleavailability : styles.availabilitybutton} onClick={checkAvailability} onMouseOver={() => setIsHovered3(true)}
            onMouseOut={() => setIsHovered3(false)}>Check Availability</button>
                </div>
                {availableRooms.length > 0 && (
                    <div className="available-rooms">
                        <h2>Available Rooms</h2>
                        <select value={selectedRoom} onChange={e => setSelectedRoom(e.target.value)}>
                            <option value="">Select a Room</option>
                            {availableRooms.map((room, index) => (
                                <option key={index} value={room}>{room}</option>
                            ))}
                        </select>
                        <button style={isHovered ? hoverStylebooking : styles.bookingbutton} onClick={requestBooking} onMouseOver={() => setIsHovered(true)}
            onMouseOut={() => setIsHovered(false)}>Request Booking</button>
                    </div>
                )}
                {bookingAvailable && (
                    <div className="booking-available">
                        <h3>Booking Available! You can now proceed to checkout.</h3>
                        <button style={isHovered2 ? hoverStyleCheckout : styles.checkoutbutton} onClick={goToCheckout} onMouseOver={() => setIsHovered2(true)}
            onMouseOut={() => setIsHovered2(false)}>Go to Checkout</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default RoomBooking;
