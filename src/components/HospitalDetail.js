import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function HospitalDetail() {
  const { id } = useParams();
  const [hospital, setHospital] = useState(null);

  const detailStyle = {
    padding: '1rem',
  };

  const reviewsStyle = {
    marginTop: '2rem',
  };

  const reviewStyle = {
    borderTop: '1px solid #ccc',
    paddingTop: '1rem',
    marginTop: '1rem',
  };

  useEffect(() => {
    // API 호출로 병원 데이터 가져오기
    fetch(`/api/hospitals/${id}`)
      .then((response) => response.json())
      .then((data) => setHospital(data));
  }, [id]);

  if (!hospital) {
    return <p>Loading...</p>;
  }

  return (
    <div style={detailStyle}>
      <h2>{hospital.name}</h2>
      <p>{hospital.address}</p>
      <p>{hospital.phone}</p>
      <p>Department: {hospital.department}</p>
      <p>Rating: {hospital.rating}</p>
      <div style={reviewsStyle}>
        <h3>Reviews</h3>
        {hospital.reviews.map((review, index) => (
          <div key={index} style={reviewStyle}>
            <p>{review.content}</p>
            <p>Rating: {review.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HospitalDetail;
