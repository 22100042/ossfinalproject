import React, { useState } from 'react';

function SearchFilter({ onSearch }) {
  const [query, setQuery] = useState('');
  const [department, setDepartment] = useState('');

  const handleSearch = () => {
    onSearch({ query, department });
  };

  return (
    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
      <input
        type="text"
        placeholder="Enter hospital name or location"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
      />
      <select
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
        style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
      >
        <option value="">All Departments</option>
        <option value="Cardiology">Cardiology</option>
        <option value="Dermatology">Dermatology</option>
      </select>
      <button
        onClick={handleSearch}
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Search
      </button>
    </div>
  );
}

export default SearchFilter;
