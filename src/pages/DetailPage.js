import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, ListGroup } from 'react-bootstrap';

const DetailPage = () => {
  const { id } = useParams();
  const [hospital, setHospital] = useState(null);

  useEffect(() => {
    setHospital({
      id,
      name: 'Pohang General Hospital',
      address: 'Pohang, South Korea',
      department: 'Cardiology',
      rating: 4.5,
      reviews: [
        { content: 'Great service!', rating: 5 },
        { content: 'Very clean and efficient.', rating: 4 },
      ],
    });
  }, [id]);

  if (!hospital) return <p>Loading...</p>;

  return (
    <Container>
      <h1 className="my-4">{hospital.name}</h1>
      <p>{hospital.address}</p>
      <p>Department: {hospital.department}</p>
      <p>Rating: {hospital.rating}</p>

      <h2>Reviews</h2>
      <ListGroup>
        {hospital.reviews.map((review, index) => (
          <ListGroup.Item key={index}>
            <strong>Rating: {review.rating}</strong>
            <p>{review.content}</p>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default DetailPage;
