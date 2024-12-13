import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DetailPage = () => {
  const { id } = useParams();
  const [hospital, setHospital] = useState(null);
  const [loading, setLoading] = useState(true);

  const mockApiUrl = `https://675bf7eb9ce247eb19380b43.mockapi.io/Hospital/${id}`;

  useEffect(() => {
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

  if (!hospital) {
    return <p>Hospital not found.</p>;
  }

  return (
    <div>
      <h1>{hospital.name}</h1>
      <p>Address: {hospital.address}</p>
      <p>Phone: {hospital.phone}</p>
      <p>Department: {hospital.department}</p>
      <p>Rating: {hospital.rating.toFixed(1)}</p> {/* Safely use toFixed */}
      <div>
        <h2>Reviews</h2>
        {hospital.reviews.map((review, index) => (
          <div key={index}>
            <p>{review.content}</p>
            <p>Rating: {review.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailPage;
