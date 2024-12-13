import React from 'react';
import { Link } from 'react-router-dom';

function HospitalList({ hospitals }) {
  const hospitalListStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '1rem',
  };

  const hospitalItemStyle = {
    border: '1px solid #ccc',
    padding: '1rem',
    borderRadius: '4px',
  };

  const titleStyle = {
    margin: '0',
    fontSize: '1.25rem',
  };

  const textStyle = {
    margin: '0.5rem 0',
  };

  return (
    <div style={hospitalListStyle}>
      {hospitals.map((hospital) => (
        <div key={hospital.id} style={hospitalItemStyle}>
          <h3 style={titleStyle}>
            <Link to={`/detail/${hospital.id}`}>{hospital.name}</Link>
          </h3>
          <p style={textStyle}>{hospital.address}</p>
          <p style={textStyle}>{hospital.phone}</p>
          <p style={textStyle}>Department: {hospital.department}</p>
          <p style={textStyle}>Rating: {hospital.rating}</p>
        </div>
      ))}
    </div>
  );
}

export default HospitalList;
