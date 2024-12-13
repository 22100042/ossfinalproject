import React, { useState } from 'react';

const ReservationPage = () => {
  const [reservations, setReservations] = useState([
    { id: 1, hospitalName: 'Pohang General Hospital', date: '2024-12-15' },
  ]);

  const handleCancel = (id) => {
    setReservations(reservations.filter((reservation) => reservation.id !== id));
  };

  return (
    <div>
      <h1>Your Reservations</h1>
      {reservations.length === 0 ? (
        <p>No reservations found.</p>
      ) : (
        <ul>
          {reservations.map((reservation) => (
            <li key={reservation.id}>
              {reservation.hospitalName} - {reservation.date}
              <button onClick={() => handleCancel(reservation.id)}>Cancel</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReservationPage;
