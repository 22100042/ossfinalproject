import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, ListGroup, Button, Form, Alert } from 'react-bootstrap';

const DetailPage = () => {
  const { id } = useParams();
  const [hospital, setHospital] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reservationData, setReservationData] = useState({ name: '', date: '', time: '' });
  const [status, setStatus] = useState('');

  const mockApiUrl = `https://675bf7eb9ce247eb19380b43.mockapi.io/Hospital/${id}`;

  useEffect(() => {
    const fetchHospitalDetails = async () => {
      try {
        const response = await fetch(mockApiUrl);
        if (!response.ok) {
          throw new Error('Failed to fetch hospital details.');
        }
        const data = await response.json();
        setHospital(data);
      } catch (error) {
        console.error(error);
        setStatus('Error fetching hospital details.');
      } finally {
        setLoading(false);
      }
    };

    fetchHospitalDetails();
  }, [id]);

  const handleReservationSubmit = async () => {
    if (!reservationData.name || !reservationData.date || !reservationData.time) {
      setStatus('All fields are required.');
      return;
    }

    try {
      setStatus('Processing reservation...');
      const updatedHospital = {
        ...hospital,
        reservation: [...hospital.reservation, reservationData],
      };

      const response = await fetch(mockApiUrl, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedHospital),
      });

      if (!response.ok) {
        throw new Error('Failed to update reservation.');
      }

      const data = await response.json();
      setHospital(data);
      setReservationData({ name: '', date: '', time: '' }); // Reset form
      setStatus('Reservation successfully added!');
    } catch (error) {
      console.error(error);
      setStatus('Error updating reservation.');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!hospital) {
    return <p>Hospital not found.</p>;
  }

  return (
    <Container>
      <h1>{hospital.name}</h1>
      <p><strong>Address:</strong> {hospital.address}</p>
      <p><strong>Phone:</strong> {hospital.phone}</p>
      <p><strong>Department:</strong> {hospital.department}</p>
      <p><strong>Rating:</strong> {hospital.rating?.toFixed(1)}</p>

      <h2>Reviews</h2>
      <ListGroup>
        {hospital.reviews && hospital.reviews.length > 0 ? (
          hospital.reviews.map((review, index) => (
            <ListGroup.Item key={index}>
              <p><strong>Rating:</strong> {review.rating?.toFixed(1)}</p>
              <p>{review.content}</p>
            </ListGroup.Item>
          ))
        ) : (
          <p>No reviews available.</p>
        )}
      </ListGroup>

      <h2 className="mt-4">Reservations</h2>
      <ListGroup>
        {hospital.reservation && hospital.reservation.length > 0 ? (
          hospital.reservation.map((res, index) => (
            <ListGroup.Item key={index}>
              <p><strong>Name:</strong> {res.name}</p>
              <p><strong>Date:</strong> {res.date}</p>
              <p><strong>Time:</strong> {res.time}</p>
            </ListGroup.Item>
          ))
        ) : (
          <p>No reservations yet.</p>
        )}
      </ListGroup>

      <h2 className="mt-4">Make a Reservation</h2>
      <Form>
        <Form.Group>
          <Form.Label>Your Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            value={reservationData.name}
            onChange={(e) => setReservationData({ ...reservationData, name: e.target.value })}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Reservation Date</Form.Label>
          <Form.Control
            type="date"
            value={reservationData.date}
            onChange={(e) => setReservationData({ ...reservationData, date: e.target.value })}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Reservation Time</Form.Label>
          <Form.Control
            type="time"
            value={reservationData.time}
            onChange={(e) => setReservationData({ ...reservationData, time: e.target.value })}
          />
        </Form.Group>
        <Button className="mt-3" onClick={handleReservationSubmit}>
          Submit Reservation
        </Button>
      </Form>

      {status && <Alert className="mt-4" variant={status.includes('Error') ? 'danger' : 'success'}>{status}</Alert>}
    </Container>
  );
};

export default DetailPage;
