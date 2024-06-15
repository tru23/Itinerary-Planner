import React, { useState } from 'react';

const TravelInfoInput = ({ setTravelInfo }) => {
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSetTravelInfo = () => {
    // Get today's date
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset hours, minutes, seconds, and milliseconds for accurate comparison

    // Convert entered dates to Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Check if start date is before or equal to end date
    if (start <= end) {
      // Check if start date is after or equal to today's date
      if (start >= today) {
        setTravelInfo({
          destination,
          startDate,
          endDate
        });
      } else {
        alert('Start date must be after or equal to today\'s date.');
      }
    } else {
      alert('End date must be after or equal to start date.');
    }
  };

  return (
    <div className="transparent-box">
      <h2>Enter Your Travel Information</h2>
      <form>
        <label>Destination:</label>
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Enter destination"
          required
        />
        <label>Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
        <label>End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
        <button type="button" onClick={handleSetTravelInfo}>Submit</button>
      </form>
    </div>
  );
};

export default TravelInfoInput;
