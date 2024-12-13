import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function ReviewPage() {
  const navigate = useNavigate();

  const reviews = [
    { id: 1, author: "John Doe", content: "Great service and friendly staff!", date: "2024-12-01" },
    { id: 2, author: "Jane Smith", content: "Clean facilities and efficient processes.", date: "2024-11-28" },
    { id: 3, author: "Alex Johnson", content: "Highly recommend this hospital!", date: "2024-11-20" },
  ];

  const handleWriteReview = () => {
    navigate('/write-review');
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Hospital Reviews</h1>

      <div className="list-group">
        {reviews.map((review) => (
          <div key={review.id} className="list-group-item">
            <h5 className="mb-1">{review.author}</h5>
            <p className="mb-1">{review.content}</p>
            <small>{review.date}</small>
          </div>
        ))}
      </div>

      <div className="text-center mt-4">
        <button className="btn btn-primary btn-lg" onClick={handleWriteReview}>
          Write a Review
        </button>
      </div>
    </div>
  );
}

export default ReviewPage;
