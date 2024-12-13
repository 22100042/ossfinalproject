import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DetailPage = () => {
  const { id } = useParams();
  const [hospital, setHospital] = useState(null);

  useEffect(() => {
    // TODO: Replace with API call to fetch hospital details by ID
    setHospital({
      id: 1,
      name: 'Pohang General Hospital',
      address: 'Pohang, South Korea',
      phone: '010-1234-5678',
      department: 'Cardiology',
      rating: 4.5,
      reviews: [
        { content: 'Great service!', rating: 5 },
        { content: 'Clean and friendly.', rating: 4 },
      ],
    });
  }, [id]);

  if (!hospital) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{hospital.name}</h1>
      <p>{hospital.address}</p>
      <p>{hospital.phone}</p>
      <p>Department: {hospital.department}</p>
      <p>Rating: {hospital.rating}</p>
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
