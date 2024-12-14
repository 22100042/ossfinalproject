import React, { useEffect, useState } from 'react';
import { Container, ListGroup, Alert } from 'react-bootstrap';

const ReservationPage = () => {
  const [reservations, setReservations] = useState([]);
  const [status, setStatus] = useState('');
  const mockApiUrl = 'https://675bf7eb9ce247eb19380b43.mockapi.io/Hospital';

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        setStatus('Fetching reservations...');
        const response = await fetch(mockApiUrl);
        if (!response.ok) {
          console.error('HTTP error:', response.status, response.statusText);
          throw new Error('Failed to fetch reservations.');
        }
        const data = await response.json();

     
        const allReservations = data.flatMap(hospital =>
          hospital.reservation && hospital.reservation.length > 0
            ? hospital.reservation.map(res => ({
                ...res,
                hospitalName: hospital.name,
              }))
            : []
        );

        setReservations(allReservations);
        setStatus('');
      } catch (error) {
        console.error('Error fetching reservations:', error);
        setStatus('Error fetching reservations.');
      }
    };

    fetchReservations();
  }, []);

  return (
    <Container className="mt-5">
      <h1 className="mb-4 text-center">Reservations</h1>
      {status && <Alert variant="info">{status}</Alert>}
      {reservations.length > 0 ? (
        <ListGroup>
          {reservations.map((reservation, index) => (
            <ListGroup.Item key={index}>
              <p>
                <strong>Name:</strong> {reservation.name}
              </p>
              <p>
                <strong>Date:</strong> {reservation.date}
              </p>
              <p>
                <strong>Time:</strong> {reservation.time}
              </p>
              <p>
                <strong>Hospital:</strong> {reservation.hospitalName}
              </p>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <Alert variant="warning">No reservations available.</Alert>
      )}
    </Container>
  );
};

export default ReservationPage;
