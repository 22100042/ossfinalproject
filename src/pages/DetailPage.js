import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, ListGroup } from 'react-bootstrap';

const DetailPage = () => {
  const { id } = useParams();
  const [hospital, setHospital] = useState(null);
  const [loading, setLoading] = useState(true);

  const mockApiUrl = `https://675bf7eb9ce247eb19380b43.mockapi.io/Hospital/${id}`;

  useEffect(() => {
<<<<<<< HEAD
    const fetchHospitalDetails = async () => {
      try {
        const response = await fetch(mockApiUrl);
        if (!response.ok) {
          throw new Error('Failed to fetch hospital details.');
        }

        const data = await response.json();

        // Ensure rating is a number and provide a default if undefined
        setHospital({
          ...data,
          rating: Number(data.rating) || 0, // Convert rating to a number or default to 0
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchHospitalDetails();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }
=======
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
>>>>>>> 7fbc123330835419ebdfc79a7ec07258c0af619f

  if (!hospital) {
    return <p>Hospital not found.</p>;
  }

  return (
<<<<<<< HEAD
    <div>
      <h1>{hospital.name}</h1>
      <p>Address: {hospital.address}</p>
      <p>Phone: {hospital.phone}</p>
      <p>Department: {hospital.department}</p>
      <p>Rating: {hospital.rating.toFixed(1)}</p> {/* Safely use toFixed */}
      <div>
        <h2>Reviews</h2>
=======
    <Container>
      <h1 className="my-4">{hospital.name}</h1>
      <p>{hospital.address}</p>
      <p>Department: {hospital.department}</p>
      <p>Rating: {hospital.rating}</p>

      <h2>Reviews</h2>
      <ListGroup>
>>>>>>> 7fbc123330835419ebdfc79a7ec07258c0af619f
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
