import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function ReservationPage() {
  const navigate = useNavigate();

  const reservations = [
    { id: 1, name: "John Doe", date: "2024-12-10", time: "10:00 AM", doctor: "Dr. Smith" },
    { id: 2, name: "Jane Smith", date: "2024-12-12", time: "2:00 PM", doctor: "Dr. Johnson" },
    { id: 3, name: "Alex Johnson", date: "2024-12-15", time: "11:00 AM", doctor: "Dr. Lee" },
  ];

  const handleMakeReservation = () => {
    navigate('/make-reservation');
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Your Reservations</h1>

      <div className="list-group">
        {reservations.map((reservation) => (
          <div key={reservation.id} className="list-group-item">
            <h5 className="mb-1">{reservation.name}</h5>
            <p className="mb-1">
              Date: {reservation.date} | Time: {reservation.time}
            </p>
            <small>Doctor: {reservation.doctor}</small>
          </div>
        ))}
      </div>

      <div className="text-center mt-4">
        <button className="btn btn-primary btn-lg" onClick={handleMakeReservation}>
          Make a Reservation
        </button>
      </div>
    </div>
  );
}

export default ReservationPage;
