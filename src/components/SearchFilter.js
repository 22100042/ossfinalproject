import React, { useState } from 'react';

function SearchFilter({ onSearch }) {
  const [query, setQuery] = useState('');
  const [department, setDepartment] = useState('');

  const searchFilterStyle = {
    display: 'flex',
    gap: '0.5rem',
    marginBottom: '1rem',
  };

  const inputStyle = {
    padding: '0.5rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
  };

  const buttonStyle = {
    padding: '0.5rem 1rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  const handleSearch = () => {
    onSearch({ query, department });
  };

  return (
    <div style={searchFilterStyle}>
      <input
        type="text"
        placeholder="Enter hospital name or location"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={inputStyle}
      />
      <select
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
        style={inputStyle}
      >
        <option value="">All Departments</option>
        <option value="Cardiology">Cardiology</option>
        <option value="Dermatology">Dermatology</option>
        {/* 추가 진료과목 옵션 */}
      </select>
      <button onClick={handleSearch} style={buttonStyle}>
        Search
      </button>
    </div>
  );
}

export default SearchFilter;
