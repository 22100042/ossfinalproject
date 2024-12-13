import React, { useState } from 'react';
import SearchFilter from '../components/SearchFilter';
import HospitalList from '../components/HospitalList';

const SearchPage = () => {
  const [hospitals, setHospitals] = useState([]);

  const handleSearch = (filters) => {
    console.log('Search filters:', filters);
    // TODO: Fetch data using filters and update the hospitals state
    setHospitals([
      {
        id: 1,
        name: 'Pohang General Hospital',
        address: 'Pohang, South Korea',
        phone: '010-1234-5678',
        department: 'Cardiology',
        rating: 4.5,
      },
    ]);
  };

  return (
    <div>
      <h1>Search Hospitals</h1>
      <SearchFilter onSearch={handleSearch} />
      <HospitalList hospitals={hospitals} />
    </div>
  );
};

export default SearchPage;
