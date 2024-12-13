import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function MakeReservationPage() {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [doctor, setDoctor] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, date, time, doctor }); // Here you would send this data to the server.
    alert('Reservation submitted successfully!');
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Make a Reservation</h1>

      <form onSubmit={handleSubmit} className="needs-validation" noValidate>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Your Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="date" className="form-label">Reservation Date</label>
          <input
            type="date"
            className="form-control"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="time" className="form-label">Reservation Time</label>
          <input
            type="time"
            className="form-control"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="doctor" className="form-label">Doctor</label>
          <select
            className="form-select"
            id="doctor"
            value={doctor}
            onChange={(e) => setDoctor(e.target.value)}
            required
          >
            <option value="">Choose...</option>
            <option value="Dr. Smith">Dr. Smith</option>
            <option value="Dr. Johnson">Dr. Johnson</option>
            <option value="Dr. Lee">Dr. Lee</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">Submit Reservation</button>
      </form>
    </div>
  );
}

export default MakeReservationPage;
