import React, { useState } from 'react';
import SearchFilter from '../components/SearchFilter';
import HospitalList from '../components/HospitalList';

const SearchPage = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mockApiUrl = 'https://675bf7eb9ce247eb19380b43.mockapi.io/Hospital';

  const handleSearch = async ({ query, department }) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(mockApiUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch hospital data.');
      }

      const data = await response.json();

      // 데이터 필터링
      const filteredHospitals = data.filter((hospital) => {
        const nameMatch = query
          ? hospital.name.toLowerCase().includes(query.toLowerCase())
          : true;
        const addressMatch = query
          ? hospital.address.toLowerCase().includes(query.toLowerCase())
          : true;
        const departmentMatch = department
          ? hospital.department.toLowerCase() === department.toLowerCase()
          : true;

        return (nameMatch || addressMatch) && departmentMatch;
      });

      setHospitals(filteredHospitals);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Search Hospitals</h1>
      <SearchFilter onSearch={handleSearch} />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <HospitalList hospitals={hospitals} />
    </div>
  );
};

export default SearchPage;
