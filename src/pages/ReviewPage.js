import React, { useEffect, useState } from 'react';
import { Container, ListGroup, Alert } from 'react-bootstrap';

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');

  const mockApiUrl = 'https://675bf7eb9ce247eb19380b43.mockapi.io/Hospital';

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setStatus('Fetching reviews...');
        const response = await fetch(mockApiUrl);
        if (!response.ok) throw new Error('Failed to fetch reviews.');
        const data = await response.json();
        const allReviews = data
          .flatMap(hospital => hospital.reviews.map(review => ({ ...review, hospitalName: hospital.name })));
        setReviews(allReviews);
        setStatus('');
      } catch (error) {
        console.error(error);
        setStatus('Error fetching reviews.');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <Container>
      <h1 className="mb-4">All Reviews</h1>
      {status && <Alert variant={status.includes('Error') ? 'danger' : 'info'}>{status}</Alert>}
      <ListGroup>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <ListGroup.Item key={index}>
              <h5>{review.hospitalName}</h5>
              <p><strong>Rating:</strong> {review.rating}</p>
              <p>{review.content}</p>
            </ListGroup.Item>
          ))
        ) : (
          <p>No reviews available.</p>
        )}
      </ListGroup>
    </Container>
  );
};

export default ReviewPage;
