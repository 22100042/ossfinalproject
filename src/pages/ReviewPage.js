import React, { useState } from 'react';

const ReviewPage = () => {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Review submitted:', { review, rating });
    // TODO: Send review data to API
    setReview('');
    setRating(5);
  };

  return (
    <div>
      <h1>Submit a Review</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Write your review here..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
          required
        />
        <select value={rating} onChange={(e) => setRating(e.target.value)}>
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num} Star{num > 1 && 's'}
            </option>
          ))}
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ReviewPage;
