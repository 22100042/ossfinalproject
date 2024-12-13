import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, ListGroup, Card, Button, Form, Alert, Modal } from 'react-bootstrap';

const DetailPage = () => {
  const { id } = useParams();
  const [hospital, setHospital] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reservationData, setReservationData] = useState({ name: '', date: '', time: '' });
  const [reviewData, setReviewData] = useState({ rating: '', content: '' });
  const [status, setStatus] = useState('');
  const [modalType, setModalType] = useState('');
  const [editingItem, setEditingItem] = useState(null);

  const mockApiUrl = `https://675bf7eb9ce247eb19380b43.mockapi.io/Hospital/${id}`;

  // Fetch hospital details
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

  // Common function to update hospital data
  const updateHospitalData = async (updatedData) => {
    try {
      const response = await fetch(mockApiUrl, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error('Failed to update data.');
      }

      const data = await response.json();
      setHospital(data);
      setStatus('Operation completed successfully!');
    } catch (error) {
      console.error(error);
      setStatus('Error occurred while updating data.');
    }
  };

  // Add, edit, or delete items
  const handleAddOrEdit = async (type) => {
    const updatedHospital = { ...hospital };
    if (modalType === 'reservation') {
      if (editingItem) {
        // Edit reservation
        updatedHospital.reservation = hospital.reservation.map((res, index) =>
          index === editingItem ? reservationData : res
        );
      } else {
        // Add reservation
        updatedHospital.reservation = [...hospital.reservation, reservationData];
      }
    } else if (modalType === 'review') {
      if (editingItem) {
        // Edit review
        updatedHospital.reviews = hospital.reviews.map((rev, index) =>
          index === editingItem ? reviewData : rev
        );
      } else {
        // Add review
        updatedHospital.reviews = [...hospital.reviews, reviewData];
      }
    }

    await updateHospitalData(updatedHospital);
    resetForm();
  };

  const handleDelete = async (type, index) => {
    const updatedHospital = { ...hospital };
    if (type === 'reservation') {
      updatedHospital.reservation = hospital.reservation.filter((_, i) => i !== index);
    } else if (type === 'review') {
      updatedHospital.reviews = hospital.reviews.filter((_, i) => i !== index);
    }

    await updateHospitalData(updatedHospital);
  };

  const resetForm = () => {
    setReservationData({ name: '', date: '', time: '' });
    setReviewData({ rating: '', content: '' });
    setModalType('');
    setEditingItem(null);
  };

  if (loading) return <p>Loading...</p>;
  if (!hospital) return <p>Hospital not found.</p>;

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow-sm mb-4">
        <h1 className="text-primary">{hospital.name}</h1>
        <p><strong>Address:</strong> {hospital.address}</p>
        <p><strong>Phone:</strong> {hospital.phone}</p>
        <p><strong>Department:</strong> {hospital.department}</p>
        <p><strong>Rating:</strong> {hospital.rating?.toFixed(1)}</p>
      </Card>

      <h2 className="mb-4">Reviews</h2>
      <ListGroup className="mb-4">
        {hospital.reviews && hospital.reviews.length > 0 ? (
          hospital.reviews.map((review, index) => (
            <ListGroup.Item key={index} className="shadow-sm mb-2 d-flex justify-content-between align-items-center">
              <div>
                <p><strong>Rating:</strong> {review.rating}</p>
                <p>{review.content}</p>
              </div>
              <div>
                <Button size="sm" onClick={() => { setEditingItem(index); setModalType('review'); setReviewData(review); }}>Edit</Button>
                <Button size="sm" variant="danger" className="ms-2" onClick={() => handleDelete('review', index)}>Delete</Button>
              </div>
            </ListGroup.Item>
          ))
        ) : (
          <p>No reviews available.</p>
        )}
      </ListGroup>

      <h2 className="mb-4">Reservations</h2>
      <ListGroup className="mb-4">
        {hospital.reservation && hospital.reservation.length > 0 ? (
          hospital.reservation.map((res, index) => (
            <ListGroup.Item key={index} className="shadow-sm mb-2 d-flex justify-content-between align-items-center">
              <div>
                <p><strong>Name:</strong> {res.name}</p>
                <p><strong>Date:</strong> {res.date}</p>
                <p><strong>Time:</strong> {res.time}</p>
              </div>
              <div>
                <Button size="sm" onClick={() => { setEditingItem(index); setModalType('reservation'); setReservationData(res); }}>Edit</Button>
                <Button size="sm" variant="danger" className="ms-2" onClick={() => handleDelete('reservation', index)}>Delete</Button>
              </div>
            </ListGroup.Item>
          ))
        ) : (
          <p>No reservations yet.</p>
        )}
      </ListGroup>

      <Button variant="primary" onClick={() => setModalType('reservation')}>Add Reservation</Button>
      <Button variant="success" className="ms-2" onClick={() => setModalType('review')}>Add Review</Button>

      {/* Modal for adding/editing */}
      <Modal show={modalType} onHide={resetForm}>
        <Modal.Header closeButton>
          <Modal.Title>{editingItem !== null ? 'Edit' : 'Add'} {modalType === 'reservation' ? 'Reservation' : 'Review'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalType === 'reservation' ? (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  value={reservationData.name}
                  onChange={(e) => setReservationData({ ...reservationData, name: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  value={reservationData.date}
                  onChange={(e) => setReservationData({ ...reservationData, date: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Time</Form.Label>
                <Form.Control
                  type="time"
                  value={reservationData.time}
                  onChange={(e) => setReservationData({ ...reservationData, time: e.target.value })}
                />
              </Form.Group>
            </Form>
          ) : (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Rating</Form.Label>
                <Form.Control
                  type="number"
                  min="1"
                  max="5"
                  placeholder="Rating (1-5)"
                  value={reviewData.rating}
                  onChange={(e) => setReviewData({ ...reviewData, rating: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Content</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter your review"
                  value={reviewData.content}
                  onChange={(e) => setReviewData({ ...reviewData, content: e.target.value })}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={resetForm}>Cancel</Button>
          <Button variant="primary" onClick={handleAddOrEdit}>{editingItem !== null ? 'Update' : 'Add'}</Button>
        </Modal.Footer>
      </Modal>

      {status && (
        <Alert className="mt-4" variant={status.includes('Error') ? 'danger' : 'success'}>
          {status}
        </Alert>
      )}
    </Container>
  );
};

export default DetailPage;
