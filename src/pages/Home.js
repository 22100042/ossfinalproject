import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [department, setDepartment] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?query=${searchQuery}&department=${department}`);
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ 
        height: '90vh', 
        backgroundImage: 'url(/hospital.jpg)', 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        backgroundRepeat: 'no-repeat', 
        padding: '20px'
      }}
    >
      <div className="text-center">
        <h1 className="display-3 mb-4">Welcome to Pohang Hospital Explorer</h1>
        <p className="lead mb-4">Find the best hospitals in Pohang for your needs.</p>
        
        <form onSubmit={handleSearch} className="d-flex justify-content-center">
          <div className="input-group" style={{ maxWidth: '800px', width: '100%' }}>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Search for hospitals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search for hospitals"
              style={{ flex: 7 }}
            />
            <select
              className="form-select form-select-lg"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              aria-label="Select Department"
              style={{ flex: 3 }}
            >
              <option value="">All Departments</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="General Medicine">General Medicine</option>
            </select>
            <button className="btn btn-primary btn-lg" type="submit">
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Home;