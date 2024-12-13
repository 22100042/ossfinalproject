import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';

const SearchPage = () => {
<<<<<<< HEAD
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
=======
  const [hospitals, setHospitals] = useState([
    {
      id: 1,
      name: 'Pohang General Hospital',
      address: 'Pohang, South Korea',
      department: 'Cardiology',
      rating: 4.5,
    },
  ]);

  return (
    <Container>
      <h1 className="my-4">Search Hospitals</h1>
      <Form className="mb-4">
        <Row>
          <Col md={6}>
            <Form.Control placeholder="Search by name or location" />
          </Col>
          <Col md={4}>
            <Form.Select>
              <option value="">All Departments</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Dermatology">Dermatology</option>
            </Form.Select>
          </Col>
          <Col md={2}>
            <Button variant="primary" block>
              Search
            </Button>
          </Col>
        </Row>
      </Form>

      <Row>
        {hospitals.map((hospital) => (
          <Col key={hospital.id} md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{hospital.name}</Card.Title>
                <Card.Text>{hospital.address}</Card.Text>
                <Card.Text>Department: {hospital.department}</Card.Text>
                <Card.Text>Rating: {hospital.rating}</Card.Text>
                <Button variant="secondary" href={`/detail/${hospital.id}`}>
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
>>>>>>> 7fbc123330835419ebdfc79a7ec07258c0af619f
  );
};

export default SearchPage;
